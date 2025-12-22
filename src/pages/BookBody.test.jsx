import { describe, it, expect } from 'vitest';

describe('환경 설정 테스트', () => {
  it('기본 산술 연산이 성공해야 한다 (1 + 1 = 2)', () => {
    expect(1 + 1).toBe(2);
  });

  it('불리언 값이 정상이어야 한다', () => {
    expect(true).toBe(true);
  });
});