import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../config/api.js";
import { generateCover } from "./coverGeneration.js";
vi.mock("../config/api.js", () => ({ default: { post: vi.fn() } }));
beforeEach(() => vi.clearAllMocks());
describe("표지 생성 API 계약", () => {
    it("GPT Image의 PNG Base64 응답을 선택 가능한 이미지로 변환한다", async () => {
        api.post.mockResolvedValue({ data: { data: { imageUrl: "data:image/png;base64,image-fixture" } } });
        const image = await generateCover({ prompt: "도서 표지", size: "1024x1536" });
        expect(image).toBe("data:image/png;base64,image-fixture");
        expect(api.post).toHaveBeenCalledWith("/covers/generate", { prompt: "도서 표지", size: "1024x1536" });
    });
    it("API 오류를 성공 후보로 등록하지 않고 호출자에게 전달한다", async () => {
        api.post.mockRejectedValue(new Error("generation unavailable"));
        await expect(generateCover({ prompt: "표지", size: "1024x1024" })).rejects.toThrow("generation unavailable");
    });
    it("이미지 없는 응답은 후보로 사용하지 않는다", async () => {
        api.post.mockResolvedValue({ data: { data: {} } });
        await expect(generateCover({ prompt: "표지", size: "1024x1024" })).rejects.toThrow("표지 이미지 응답");
    });
});
