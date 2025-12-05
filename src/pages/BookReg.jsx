import { useState } from "react";
import axios from "axios";
import {
    Box,
    TextField,
    Button,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    Select,
    MenuItem,
    FormControl
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function BookReg() {
    const [book, setBook] = useState({
        title: "",
        category: "",
        description: "",
        content: "",
        coverImageUrl: "",
    });

    const [open, setOpen] = useState(false);
    const [apiKey, setApiKey] = useState("");

    // 모델 + 해상도 선택
    const [selectedModel, setSelectedModel] = useState("1024");

    // 이미지 목록(최대 3개 유지)
    const [images, setImages] = useState([]);

    // 해상도 매핑 (DALL·E 3용)
    const resolutionMap = {
        "256": "256x256",
        "512": "512x512",
        "1024": "1024x1024",
    };

    // 입력 변경
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const openPopup = () => setOpen(true);
    const closePopup = () => setOpen(false);

    // 모델 선택
    const handleModelChange = (e) => {
        setSelectedModel(e.target.value);
    };

    // ---------------------------------------------
    // ⭐ 이미지 선택 함수 — 반드시 컴포넌트 상단에 있어야 함
    // ---------------------------------------------
    const selectImage = (url) => {
        setBook(prev => ({ ...prev, coverImageUrl: url }));
        setOpen(false);
    };

    // ---------------------------------------------
    // ⭐ AI 이미지 생성 (DALL·E 3)
    // ---------------------------------------------
    const generateImage = async () => {
        if (!apiKey) {
            alert("OpenAI API Key를 입력해주세요.");
            return;
        }

        const size = resolutionMap[selectedModel];

        const prompt = `
책 제목: ${book.title}
장르: ${book.category}

'${book.title}' 책 표지 일러스트 디자인.

[디자인 규칙]
- 절대 사진처럼 보이면 안 됨
- 절대 풍경, 도시 사진 금지
- 절대 실사 느낌 금지
- 책 표지처럼 시각 요소를 중앙에 배치
- 단순하고 세련된 배경 그래픽
- 텍스트 포함 금지

[스타일]
- 고급 일러스트 스타일
- 파스텔톤 또는 부드러운 색감
- 예술적인 그림
- 그래픽 아트워크 스타일

설명: ${book.description}

위 내용을 기반으로 책의 분위기를 시각적으로 상징하는 일러스트 생성.
        `;

        console.log("📢 최종 Prompt 전송:", prompt);

        try {
            const response = await fetch("https://api.openai.com/v1/images/generations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "dall-e-3", // DALL·E 3 API 공식 모델명
                    prompt,
                    size,
                    n: 1
                })
            });

            const data = await response.json();

            if (!data.data || !data.data[0]?.url) {
                alert("이미지 생성 실패");
                return;
            }

            const newUrl = data.data[0].url;

            setImages(prev => {
                const updated = [...prev, newUrl];
                return updated.slice(-3); // 마지막 3개만 유지
            });

        } catch (error) {
            console.error("이미지 생성 오류:", error);
            alert("이미지 생성 중 문제가 발생했습니다.");
        }
    };

    // ---------------------------------------------
    // ⭐ 도서 등록 API
    // ---------------------------------------------
    const handleSubmit = async () => {
        try {
            await axios.post(
                "http://localhost:8080/api/v1/books",
                book,
                { headers: { "Content-Type": "application/json" } }
            );

            alert("도서 등록 성공!");

        } catch (error) {
            console.error(error);
            alert("도서 등록 실패!");
        }
    };

    // ---------------------------------------------
    // JSX 출력
    // ---------------------------------------------
    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                📘 도서 신규 등록
            </Typography>

            <TextField fullWidth sx={{ mb: 2 }} label="제목" name="title" value={book.title} onChange={handleChange} />
            <TextField fullWidth sx={{ mb: 2 }} label="카테고리" name="category" value={book.category} onChange={handleChange} />
            <TextField fullWidth sx={{ mb: 2 }} multiline rows={3} label="설명" name="description" value={book.description} onChange={handleChange} />
            <TextField fullWidth sx={{ mb: 2 }} multiline rows={6} label="본문" name="content" value={book.content} onChange={handleChange} />
            <TextField fullWidth sx={{ mb: 2 }} label="이미지 URL" name="coverImageUrl" value={book.coverImageUrl} onChange={handleChange} />

            <Button fullWidth variant="outlined" sx={{ mb: 2 }} onClick={openPopup}>
                AI 이미지 선택
            </Button>

            <Button fullWidth variant="contained" onClick={handleSubmit}>
                등록
            </Button>

            {/* --------------------------------------------- */}
            {/* 📌 AI 이미지 생성 팝업 */}
            {/* --------------------------------------------- */}
            <Dialog open={open} onClose={closePopup} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
                    AI 표지 생성
                    <IconButton onClick={closePopup}><CloseIcon /></IconButton>
                </DialogTitle>

                <DialogContent>

                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                        OpenAI API Key:
                    </Typography>
                    <TextField
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        fullWidth
                        sx={{ mb: 3 }}
                    />

                    <Typography sx={{ fontWeight: 600, mb: 1 }}>
                        생성 모델 선택:
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <Select value={selectedModel} onChange={handleModelChange}>
                            <MenuItem value="256">DALL·E 3 — HD (256×256)</MenuItem>
                            <MenuItem value="512">DALL·E 3 — FHD (512×512)</MenuItem>
                            <MenuItem value="1024">DALL·E 3 — 기본 (1024×1024)</MenuItem>
                        </Select>
                    </FormControl>

                    <Button variant="contained" fullWidth sx={{ mb: 3 }} onClick={generateImage}>
                        AI 표지 1장 생성
                    </Button>

                    {images.length > 0 && (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            gap: 3,
                            mt: 2,
                            p: 1
                        }}>
                            {images.map((url, i) => (
                                <Box key={i} sx={{ textAlign: "center", width: 160 }}>
                                    <img
                                        src={url}
                                        alt="generated"
                                        style={{
                                            width: 140,
                                            height: 180,
                                            objectFit: "cover",
                                            borderRadius: 4,
                                            border: "1px solid #ddd",
                                        }}
                                    />
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mt: 1 }}
                                        onClick={() => selectImage(url)}
                                    >
                                        선택
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    )}

                </DialogContent>
            </Dialog>
        </Box>
    );
}
