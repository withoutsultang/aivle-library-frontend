import { useState } from "react";
import axios from "axios";
import api from "../api.jsx";
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
    FormControl,
    CircularProgress
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useParams, useNavigate  } from "react-router-dom";

export default function BookReg() {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = !!id || location.state?.isEdit;

    const [book, setBook] = useState(location.state?.book || {
        title: "",
        category: "",
        description: "",
        content: "",
        coverImageUrl: "",
        userId: 1 // userid 추가해야함(임의의 user만들어서 테스트)
    });


    const [open, setOpen] = useState(false);
    const [apiKey, setApiKey] = useState("");

    const [loading, setLoading] = useState(false);

    // 모델 + 해상도 선택
    const [selectedModel, setSelectedModel] = useState("1024x1792");

    // 이미지 목록(최대 3개 유지)
    const [images, setImages] = useState([]);

    // 해상도 매핑 (DALL·E 3용)
    const resolutionMap = {
        "1024x1792": "1024x1792", // 세로형
        "1024x1024": "1024x1024", // 정사각형
        "1792x1024": "1792x1024", // 가로형
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

        setLoading(true);

        const size = resolutionMap[selectedModel];

        // 따옴표 안의 핵심 단어 추출
        const extractKeyword = (text) => {
            if (!text) return '';
            const match = text.match(/['']([^'']+)['']/);
            return match ? match[1] : text.substring(0, 40);
        };

        const mainSubject = extractKeyword(book.description);

        const prompt = `Book cover design in modern flat illustration style.
            Main subject: ${mainSubject}.
            Genre: ${book.category}.
            Visual style: minimalist geometric composition, symbolic cultural elements, sophisticated color harmony.
            Design quality: professional bookstore standard, clear title space.
            Avoid: photographs, 3D renders, realistic objects.`;

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
        } finally {
        setLoading(false);
    }
    };

    // ---------------------------------------------
    // ⭐ 도서 등록 API
    // ---------------------------------------------
    const handleSubmit = async () => {
        if (!book.title || !book.category || !book.description || !book.content) {
            alert("제목, 카테고리, 설명, 본문은 필수 입력 항목입니다.");
            return;
        }

        try {
            if (isEditMode) {
                await axios.put(
                    `http://localhost:8080/api/v1/books/${id}`,
                    book,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${sessionStorage.getItem("accessToken")}`
                        }
                    }
                );

                alert("도서 수정 완료!");
                navigate(`/bookdetail/${id}`);
            } else {
                // 등록 모드: POST 요청
                // await axios.post(
                //     "http://localhost:8080/api/v1/books",
                //     book,
                //     { headers: { "Content-Type": "application/json" } }
                // );
                await api.post(
                    "/books",    // baseURL이 이미 http://localhost:8080/api/v1 라고 가정
                    book
                );
                alert("도서 등록 성공!");
                navigate('/booklist');
            }
        } catch (error) {
            console.error(error);
            alert(isEditMode ? "도서 수정 실패!" : "도서 등록 실패!");
        }
    };

    // ---------------------------------------------
    // JSX 출력
    // ---------------------------------------------
    return (
        <Box sx={{ maxWidth: 600, mx: "auto" }}>

            <Typography variant="h4" sx={{ mb: 3, color : "black" }}>
                {isEditMode ? "📝 도서 수정" : "📘 도서 신규 등록"}
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
                {isEditMode ? "수정" : "등록"}
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
                            <MenuItem value="1024x1792">📖 세로형 (1024×1792) - 책 표지 추천</MenuItem>
                            <MenuItem value="1024x1024">⬛ 정사각형 (1024×1024)</MenuItem>
                            <MenuItem value="1792x1024">🖼️ 가로형 (1792×1024)</MenuItem>
                        </Select>
                    </FormControl>

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ mb: 3 }}
                        onClick={generateImage}
                        disabled={loading}
                    >
                        {loading ? "이미지 생성 중..." : "AI 표지 1장 생성"}
                    </Button>

                    {/* ⭐ 로딩 스피너 표시 */}
                    {loading && (
                        <Box sx={{ textAlign: "center", mb: 2 }}>
                            <CircularProgress />
                            <Typography sx={{ mt: 1 }}>AI가 이미지를 생성하고 있습니다...</Typography>
                        </Box>
                    )}

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
