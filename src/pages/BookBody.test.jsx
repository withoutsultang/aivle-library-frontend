import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect } from "vitest";
import BookBody from "./BookBody";

// BookReader가 복잡할 경우를 대비해 간단하게 모킹하거나, 
// 실제 컴포넌트 내부의 텍스트가 잘 렌더링되는지 확인합니다.
describe("BookBody Component", () => {
  const mockContent = "A".repeat(800) + "B".repeat(800); // 총 1600자 (2페이지 분량)
  const mockState = {
    title: "테스트 도서",
    content: mockContent,
  };

  const renderWithRouter = (state = mockState) => {
    return render(
      <MemoryRouter initialEntries={[{ pathname: "/book", state }]}>
        <Routes>
          <Route path="/book" element={<BookBody />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("첫 페이지에 800자의 텍스트만 렌더링되어야 한다", () => {
    renderWithRouter();

    // 첫 번째 페이지 내용('A' 800자)은 존재해야 함
    expect(screen.getByText("A".repeat(800))).toBeInTheDocument();
    
    // 두 번째 페이지 내용('B' 800자)은 아직 보이지 않아야 함
    expect(screen.queryByText("B".repeat(800))).not.toBeInTheDocument();
  });

  it("전체 페이지 수가 올바르게 계산되어야 한다", () => {
    renderWithRouter();
    
    // 1600자 / 800자 = 2페이지
    // BookReader 내부에서 totalPages를 표시한다고 가정 (예: "1 / 2")
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

  it("데이터 없이 접근했을 때 오류 없이 렌더링되어야 한다 (예외 처리)", () => {
    renderWithRouter(null);
    expect(screen.queryByText("테스트 도서")).not.toBeInTheDocument();
  });
});
