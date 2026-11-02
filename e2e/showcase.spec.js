import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fillBook, databaseRow, localOnly } from './helpers.js';

const destination = path.resolve('docs/assets/demo');
const story = [
  '아침의 골목에는 아직 문을 열지 않은 가게들이 나란히 서 있었다. 나는 매일 지나치던 길에서 작은 화분 하나를 발견했다. 어제는 보지 못했던 잎이 햇빛을 향해 조금 더 몸을 기울이고 있었다.',
  '바쁘게 걷는 동안 놓친 것들이 얼마나 많았을까. 잠시 걸음을 멈추자 창문 너머의 음악과 빵 굽는 냄새, 누군가 건넨 인사가 차례로 다가왔다. 특별한 일이 없어도 하루는 충분히 풍성했다.',
  '점심 무렵에는 오래된 공책을 펼쳤다. 잘 쓰려는 마음을 내려놓고 오늘 본 풍경을 한 줄 적었다. 처음에는 어색하던 문장도 조금씩 내 속도를 찾아갔다. 기록은 정답보다 관찰에 가까웠다.',
  '친구에게 그 이야기를 들려주자 친구는 전혀 다른 장면을 떠올렸다. 같은 거리를 걸어도 우리는 서로 다른 것을 발견한다. 책을 만든다는 것은 그 차이를 오래 보관하고 다른 사람과 나누는 일인지도 모른다.',
  '저녁에는 낮에 적은 문장에 작은 제목을 붙였다. 제목을 정하고 표지를 골라 보니 평범한 메모가 한 권의 책처럼 느껴졌다. 거창한 시작을 기다리지 않아도 좋았다. 이미 내 하루에는 충분한 이야기가 있었다.',
  '다음 날에도 나는 같은 골목을 걸었다. 화분의 잎은 어제보다 조금 더 펼쳐져 있었다. 나는 공책을 꺼내 새로운 문장을 적었다. 작고 조용한 발견을 이어 가는 일이 내가 선택한 창작의 방식이었다.',
].join('\n\n');

test('로컬 데모 시연: 탐색·작성·예시 표지·공개·본문·수정', async ({ page, context, request }) => {
  await fs.mkdir(destination, { recursive: true });
  await localOnly(context);
  page.on('dialog', dialog => dialog.accept());
  const pause = () => page.waitForTimeout(1300); // Intentional viewing time in the recorded showcase.
  const capture = async name => {
    await pause(); // Let the new route and compositor paint before recording its still frame.
    await expect(page.getByText('로딩 중...', { exact: true })).toHaveCount(0);
    await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    await page.screenshot({ path: path.join(destination, name + '.png'), fullPage: name === '04-manuscript' });
    await page.waitForTimeout(400);
  };

  await test.step('01 데모 서재 시작', async () => {
    await page.goto('/login');
    await expect(page.getByRole('button', { name: '데모 서재 둘러보기' })).toBeVisible();
    await capture('01-login');
    await page.getByRole('button', { name: '데모 서재 둘러보기' }).click();
    await expect(page).toHaveURL(/\/booklist$/);
    await expect(page.getByRole('img', { name: '도시의 작은 숲' })).toBeVisible();
    await capture('02-library');
  });

  let id;
  await test.step('02 원고를 작성하고 예시 표지 선택', async () => {
    await page.getByRole('button', { name: '신규 도서 등록' }).click();
    await fillBook(page, '일상의 작은 발견', story);
    await page.getByRole('button', { name: '예시 표지 선택', exact: true }).click();
    for (let i = 0; i < 3; i++) {
      await page.getByRole('button', { name: '예시 표지 1장 추가' }).click();
      await expect(page.getByRole('img', { name: 'generated' })).toHaveCount(i + 1);
    }
    await capture('03-cover-selection');
    await page.getByRole('button', { name: '선택', exact: true }).nth(1).click();
    await capture('04-manuscript');
    const saved = page.waitForResponse(response => response.url().endsWith('/api/v1/books') && response.request().method() === 'POST');
    await page.getByRole('button', { name: '등록', exact: true }).click();
    const response = await saved;
    expect(response.status()).toBe(201);
    id = (await response.json()).data.bookId;
    expect((await databaseRow(request, id)).content).toBe(story);
  });

  await test.step('03 공개된 도서와 본문 확인', async () => {
    await expect(page).toHaveURL(/\/booklist$/);
    await page.getByText('일상의 작은 발견', { exact: true }).click();
    await expect(page.getByRole('heading', { name: '일상의 작은 발견' })).toBeVisible();
    await capture('05-book-detail');
    await page.getByRole('button', { name: '본문 읽기' }).click();
    await expect(page.getByRole('heading', { name: '일상의 작은 발견' })).toBeVisible();
    await capture('06-reader');
  });

  await test.step('04 원고 수정과 저장 결과 확인', async () => {
    await page.getByRole('button', { name: '← 요약', exact: true }).click();
    await page.getByRole('button', { name: /수정/ }).click();
    await expect(page.getByLabel('제목', { exact: true })).toHaveValue('일상의 작은 발견');
    await page.getByLabel('제목', { exact: true }).fill('일상의 작은 발견 · 개정판');
    await page.getByLabel('설명', { exact: true }).fill('골목과 공책, 평범한 하루에서 발견한 창작의 순간을 담았습니다.');
    await pause();
    await page.getByRole('button', { name: '수정', exact: true }).click();
    await expect(page.getByRole('heading', { name: '일상의 작은 발견 · 개정판' })).toBeVisible();
    expect((await databaseRow(request, id)).title).toBe('일상의 작은 발견 · 개정판');
    await capture('07-revised');
    await page.getByRole('button', { name: '← 도서 목록' }).click();
    await expect(page.getByText('일상의 작은 발견 · 개정판', { exact: true })).toBeVisible();
    await capture('08-published-library');
  });
});
