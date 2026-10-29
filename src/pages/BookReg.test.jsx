import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, afterEach, describe, it, expect, vi } from "vitest";
import BookReg from "./BookReg.jsx";
import api from "../config/api.js";
vi.mock("../config/api.js", () => ({ default: { get: vi.fn(), put: vi.fn(), post: vi.fn() } }));
const book = { bookId: 7, title: "첫 원고", category: "소설", coverImageUrl: "" };
function show() {
    return render(<MemoryRouter initialEntries={["/bookreg/7"]}><Routes>
        <Route path="/bookreg/:id" element={<BookReg />} />
        <Route path="/detail/:id" element={<div>저장된 도서 상세</div>} />
    </Routes></MemoryRouter>);
}
describe("도서 수정", () => {
    beforeEach(() => {
        vi.clearAllMocks(); vi.spyOn(window, "alert").mockImplementation(() => {});
        api.get.mockImplementation(path => Promise.resolve({ data: { data: path.endsWith("/detail")
            ? { description: "작품 소개", content: "원고 본문" } : book } }));
    });
    afterEach(() => vi.restoreAllMocks());
    it("직접 수정 URL에 접근해도 저장된 원고를 불러온다", async () => {
        show();
        expect(await screen.findByDisplayValue("첫 원고")).toBeInTheDocument();
        expect(screen.getByDisplayValue("원고 본문")).toBeInTheDocument();
    });
    it("공통 API 클라이언트로 저장하고 실제 상세 경로로 이동한다", async () => {
        api.put.mockResolvedValue({ data: {} }); show();
        const title = await screen.findByDisplayValue("첫 원고");
        fireEvent.change(title, { target: { value: "수정한 원고" } });
        fireEvent.click(screen.getByRole("button", { name: "수정" }));
        await waitFor(() => expect(api.put).toHaveBeenCalledWith("/books/7", expect.objectContaining({ title: "수정한 원고", content: "원고 본문" })));
        expect(await screen.findByText("저장된 도서 상세")).toBeInTheDocument();
    });
});
