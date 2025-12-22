import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useLocation, useNavigate } from 'react-router-dom';
import BookBody from './BookBody';
import { vi } from 'vitest';

// 1. react-router-dom 모킹
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

// 하위 컴포넌트인 BookReader가 복잡할 경우를 대비해 간단히 모킹 (선택 사항)
vi.mock('./BookReader', () => ({
  default: ({ title, paginatedContent, totalPages, page, onPageChange, onBack }) => (
    <div data-testid="book-reader">
      <h1>{title}</h1>
      <p>{paginatedContent}</p>
      <span>Page: {page} of {totalPages}</span>
      <button onClick={() => onPageChange(page + 1)}>Next</button>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

describe('BookBody 컴포넌트 테스트', () => {
  const mockNavigate = vi.fn();
  const mockContent = 'A'.repeat(1600); // 800자씩 2페이지 분량

  beforeEach(() => {
    vi.clearAllMocks();
    useNavigate.mockReturnValue(mockNavigate);
  });

  test('전달된 state 데이터를 기반으로 첫 페이지를 올바르게 렌더링한다', () => {
    useLocation.mockReturnValue({
      state: { title: '테스트 도서', content: mockContent }
    });

    render(
      <MemoryRouter>
        <BookBody />
      </MemoryRouter>
    );

    // 제목 확인
    expect(screen.getByText('테스트 도서')).toBeInTheDocument();
    // 첫 800자 페이징 확인
    expect(screen.getByText('Page: 1 of 2')).toBeInTheDocument();
  });

  test('페이지 변경 시 내용이 다음 섹션으로 업데이트된다', () => {
    useLocation.mockReturnValue({
      state: { title: '테스트 도서', content: mockContent }
    });

    render(
      <MemoryRouter>
        <BookBody />
      </MemoryRouter>
    );

    // 'Next' 버튼 클릭 (onPageChange 호출)
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // 페이지 번호 변경 확인
    expect(screen.getByText('Page: 2 of 2')).toBeInTheDocument();
  });

  test('뒤로 가기 버튼 클릭 시 navigate(-1)이 호출된다', () => {
    useLocation.mockReturnValue({
      state: { title: '테스트 도서', content: '내용' }
    });

    render(
      <MemoryRouter>
        <BookBody />
      </MemoryRouter>
    );

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test('state가 없을 경우 예외 처리 확인', () => {
    useLocation.mockReturnValue({ state: null });

    render(
      <MemoryRouter>
        <BookBody />
      </MemoryRouter>
    );

    expect(screen.getByText('Page: 1 of 1')).toBeInTheDocument();
  });
});