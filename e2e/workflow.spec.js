import { test, expect } from '@playwright/test';
import { login, createBook, databaseRow, token, localOnly } from './helpers.js';

test.beforeEach(async ({ page, context }) => {
  await localOnly(context);
  page.on('dialog', dialog => dialog.accept());
  await login(page);
});

test('등록: 브라우저 → 실제 API 201 → books·book_details SQL 행 → 새로고침 조회', async ({ page, request }) => {
  const title = '화면에서 완성한 첫 번째 책';
  const id = await createBook(page, title, { cover: true });
  const row = await databaseRow(request, id);
  expect(row.title).toBe(title);
  expect(row.description).toBe('작은 일상의 발견을 모아 한 권의 책으로 남겼습니다.');
  expect(row.content).toContain('실제 데이터베이스');
  expect(row.cover_image_url).toMatch(/^ai-images\/.+\.png$/);
  await page.getByText(title, { exact: true }).click();
  await page.reload();
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
  const cover = page.getByRole('img', { name: title });
  await expect(cover).toBeVisible();
  expect(await cover.evaluate(image => image.complete && image.naturalWidth > 0)).toBeTruthy();
});

test('수정: 직접 URL 접근·재로딩 → 저장 → SQL 본문 갱신·기존 표지 key 유지', async ({ page, request }) => {
  const id = await createBook(page, '수정 전 원고', { cover: true });
  const original = await databaseRow(request, id);
  await page.goto(`/bookreg/${id}`);
  await page.reload();
  await expect(page.getByLabel('제목', { exact: true })).toHaveValue('수정 전 원고');
  await page.getByLabel('제목', { exact: true }).fill('다시 다듬은 이야기');
  await page.getByLabel('본문', { exact: true }).fill('수정한 본문도 SQL 데이터베이스에서 다시 확인합니다.');
  const changed = page.waitForResponse(response => response.url().endsWith(`/api/v1/books/${id}`) && response.request().method() === 'PUT');
  await page.getByRole('button', { name: '수정', exact: true }).click();
  expect((await changed).status()).toBe(200);
  await expect(page).toHaveURL(new RegExp(`/detail/${id}$`));
  const row = await databaseRow(request, id);
  expect(row.title).toBe('다시 다듬은 이야기');
  expect(row.content).toContain('수정한 본문');
  expect(row.cover_image_url).toBe(original.cover_image_url);
  await page.reload();
  await expect(page.getByRole('heading', { name: row.title })).toBeVisible();
});

test('본문 읽기: 저장된 1600자 본문을 800자씩 두 페이지로 탐색', async ({ page }) => {
  const id = await createBook(page, '두 페이지의 기록', { content: '가'.repeat(800) + '나'.repeat(800) });
  await page.goto(`/detail/${id}`);
  await page.getByRole('button', { name: '본문 읽기' }).click();
  await expect(page.getByText('가'.repeat(800), { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '다음 페이지' }).click();
  await expect(page.getByText('나'.repeat(800), { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: '다음 페이지' })).toBeDisabled();
});

test('작성자 권한: 다른 사용자의 변경 요청은 403, SQL 원문은 유지', async ({ page, request }) => {
  const before = await databaseRow(request, 1);
  const reader = await token(request, 'reader');
  const response = await request.put('/api/v1/books/1', {
    headers: { Authorization: `Bearer ${reader}` },
    data: { title: '다른 사용자의 변경', category: '에세이', description: '권한 확인', content: '허용되지 않는 변경', coverImageUrl: '' },
  });
  expect(response.status()).toBe(403);
  expect((await databaseRow(request, 1)).title).toBe(before.title);
  await page.goto(`/oauth/success?token=${encodeURIComponent(reader)}`);
  await expect(page).toHaveURL(/\/booklist$/);
  await page.goto('/detail/1');
  await expect(page.getByRole('heading', { name: before.title })).toBeVisible();
  await expect(page.getByRole('button', { name: /수정/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: '삭제', exact: true })).toHaveCount(0);
});

test('실제 API 검증: 잘못된 Bearer 401·빈 제목 400·원문 유지', async ({ request }) => {
  const invalid = await request.post('/api/v1/books', { headers: { Authorization: 'Bearer invalid-fixture' }, data: {} });
  expect(invalid.status()).toBe(401);
  const author = await token(request);
  const before = await databaseRow(request, 1);
  const invalidTitle = await request.put('/api/v1/books/1', {
    headers: { Authorization: `Bearer ${author}` },
    data: { title: '', category: '에세이', description: '입력 검증', content: '원문이 변경되면 안 됩니다.' },
  });
  expect(invalidTitle.status()).toBe(400);
  expect((await databaseRow(request, 1)).content).toBe(before.content);
});

test('삭제: 화면 확인 → 실제 API → SQL 행 제거 → 목록에서 제외', async ({ page, request }) => {
  const title = '삭제 흐름을 확인하는 책';
  const id = await createBook(page, title);
  await page.goto(`/detail/${id}`);
  const removed = page.waitForResponse(response => response.url().endsWith(`/api/v1/books/${id}`) && response.request().method() === 'DELETE');
  await page.getByRole('button', { name: '삭제', exact: true }).click();
  expect((await removed).status()).toBe(200);
  expect((await databaseRow(request, id)).exists).toBe(false);
  await expect(page).toHaveURL(/\/booklist$/);
  await expect(page.getByText(title, { exact: true })).toHaveCount(0);
});
