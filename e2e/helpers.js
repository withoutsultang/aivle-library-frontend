import { expect } from '@playwright/test';

export async function localOnly(context) {
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return ['127.0.0.1', 'localhost'].includes(url.hostname) || ['data:', 'blob:'].includes(url.protocol)
      ? route.continue() : route.abort('blockedbyclient');
  });
}

export async function login(page) {
  await page.goto('/login');
  await page.getByRole('button', { name: '데모 서재 둘러보기' }).click();
  await expect(page).toHaveURL(/\/booklist$/);
  await expect(page.getByText('도서 목록', { exact: true })).toBeVisible();
}

export async function fillBook(page, title, content = '브라우저에서 입력한 본문이 실제 데이터베이스에 저장됩니다.') {
  await page.getByLabel('제목', { exact: true }).fill(title);
  await page.getByLabel('카테고리', { exact: true }).fill('에세이');
  await page.getByLabel('설명', { exact: true }).fill('작은 일상의 발견을 모아 한 권의 책으로 남겼습니다.');
  await page.getByLabel('본문', { exact: true }).fill(content);
}

export async function createBook(page, title, options = {}) {
  await page.getByRole('button', { name: '신규 도서 등록' }).click();
  await fillBook(page, title, options.content);
  if (options.cover) {
    await page.getByRole('button', { name: '예시 표지 선택', exact: true }).click();
    await page.getByRole('button', { name: '예시 표지 1장 추가' }).click();
    await page.getByRole('button', { name: '선택', exact: true }).click();
  }
  const saved = page.waitForResponse(response => response.url().endsWith('/api/v1/books') && response.request().method() === 'POST');
  await page.getByRole('button', { name: '등록', exact: true }).click();
  const response = await saved;
  expect(response.status()).toBe(201);
  const body = await response.json();
  await expect(page).toHaveURL(/\/booklist$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  return body.data.bookId;
}

export async function databaseRow(request, id) {
  const response = await request.get(`/api/v1/auth/demo/database/books/${id}`);
  expect(response.ok()).toBeTruthy();
  return response.json();
}

export async function token(request, persona = 'author') {
  const response = await request.post(`/api/v1/auth/demo/session?persona=${persona}`);
  expect(response.ok()).toBeTruthy();
  return (await response.json()).data.token;
}
