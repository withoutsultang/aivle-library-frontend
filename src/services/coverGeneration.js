import api from "../config/api.js";
export async function generateCover({ prompt, size }) {
    const response = await api.post("/covers/generate", { prompt, size });
    const image = response.data?.data?.imageUrl;
    if (!image?.startsWith("data:image/png;base64,")) throw new Error("표지 이미지 응답을 확인해 주세요.");
    return image;
}
