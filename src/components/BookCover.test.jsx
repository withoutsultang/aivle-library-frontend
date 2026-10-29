import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BookCover from "./BookCover.jsx";
describe("표지 표시", () => {
    it("이미지 요청이 실패하면 대체 표지를 보여준다", () => {
        render(<BookCover src="https://images.example.com/expired.png" alt="책 표지" />);
        fireEvent.error(screen.getByAltText("책 표지"));
        expect(screen.getByAltText("no image")).toBeInTheDocument();
    });
    it("새 URL을 받으면 새 표지를 표시한다", () => {
        const { rerender } = render(<BookCover src="old.png" alt="책 표지" />);
        fireEvent.error(screen.getByAltText("책 표지"));
        rerender(<BookCover src="new.png" alt="책 표지" />);
        expect(screen.getByAltText("책 표지")).toHaveAttribute("src", "new.png");
    });
});
