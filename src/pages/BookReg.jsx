import { useEffect, useState } from "react";
import api from "../config/api.js";
import { generateCover } from "../services/coverGeneration.js";
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
import { useLocation, useParams, useNavigate } from "react-router-dom";

/**
 * 도서 등록/수정 페이지
 * - 새로운 도서를 등록하거나 기존 도서를 수정합니다.
 * - GPT Image를 이용한 표지 생성 기능을 제공합니다.
 */
export default function BookReg() {
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    const isEditMode = !!id;

    const [book, setBook] = useState(location.state?.book || {
        title: "",
        category: "",
        description: "",
        content: "",
        coverImageUrl: ""
    });


    const [submitting, setSubmitting] = useState(false);
    const [formLoading, setFormLoading] = useState(!!id);
    const [formError, setFormError] = useState("");
    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        Promise.all([
            api.get(`/books/${id}`, { signal: controller.signal }),
            api.get(`/books/${id}/detail`, { signal: controller.signal }),
        ]).then(([info, detail]) => {
            if (!controller.signal.aborted) setBook({ ...info.data.data, ...detail.data.data });
        }).catch(error => {
            if (!controller.signal.aborted) setFormError(error.response?.data?.message ?? "도서를 불러오지 못했습니다.");
        }).finally(() => {
            if (!controller.signal.aborted) setFormLoading(false);
        });
        return () => controller.abort();
    }, [id]);

    const [open, setOpen] = useState(false);


    const [loading, setLoading] = useState(false);

    // 모델 + 해상도 선택
    const [selectedSize, setSelectedSize] = useState("1024x1536");

    // 이미지 목록(최대 3개 유지)
    const [images, setImages] = useState([]);

    // 해상도 매핑 (GPT Image용)
    const resolutionMap = {
        "1024x1536": "1024x1536", // 세로형
        "1024x1024": "1024x1024", // 정사각형
        "1536x1024": "1536x1024", // 가로형
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
        setSelectedSize(e.target.value);
    };

    // ---------------------------------------------
    // ⭐ 이미지 선택 함수 — 반드시 컴포넌트 상단에 있어야 함
    // ---------------------------------------------
    const selectImage = (url) => {
        setBook(prev => ({ ...prev, coverImageUrl: url }));
        setOpen(false);
    };

    // ---------------------------------------------
    // ⭐ AI 이미지 생성 (GPT Image)
    // - 사용자가 입력한 설명(description)이나 제목을 바탕으로
    // - 표지 이미지를 생성하여 제안합니다.
    // ---------------------------------------------
    const generateImage = async () => {
        setLoading(true);

        const size = resolutionMap[selectedSize];

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



        try {
            const newUrl = await generateCover({ prompt, size });

            setImages(prev => {
                const updated = [...prev, newUrl];
                return updated.slice(-3); // 마지막 3개만 유지
            });

        } catch (error) {
            console.error("이미지 생성 오류:", error);
            alert(error.response?.data?.message || error.message || "이미지 생성 중 문제가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // ---------------------------------------------
    // ⭐ 도서 등록 API
    // - 작성된 폼 데이터를 서버로 전송합니다.
    // - 수정 Мо드(isEditMode)일 경우 PUT, 신규일 경우 POST 요청을 보냅니다.
    // ---------------------------------------------
    const handleSubmit = async () => {
        if (submitting || formLoading || formError) return;
        if (!book.title || !book.category || !book.description || !book.content) {
            alert("제목, 카테고리, 설명, 본문은 필수 입력 항목입니다.");
            return;
        }

        setSubmitting(true);
        try {
            if (isEditMode) {
                await api.put(`/books/${id}`, book);

                alert("도서 수정 완료!");
                navigate(`/detail/${id}`);
            } else {
                await api.post(
                    "/books",
                    book
                );
                alert("도서 등록 성공!");
                navigate('/booklist');
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message ?? (isEditMode ? "도서 수정 실패!" : "도서 등록 실패!"));
        } finally { setSubmitting(false); }
    };

    // ---------------------------------------------
    // JSX 출력
    // ---------------------------------------------
    if (formLoading) return <Typography role="status">도서를 불러오는 중...</Typography>;
    if (formError) return <Typography role="alert">{formError}</Typography>;

    return (
        <Box sx={{ maxWidth: 600, mx: "auto" }}>

            <Typography variant="h4" sx={{ mb: 3, color: "black" }}>
                {isEditMode ? "📝 도서 수정" : "📘 도서 신규 등록"}
            </Typography>

            <TextField fullWidth sx={{ mb: 2 }} label="제목" name="title" value={book.title} onChange={handleChange} />
            <TextField fullWidth sx={{ mb: 2 }} label="카테고리" name="category" value={book.category} onChange={handleChange} />
            <TextField fullWidth sx={{ mb: 2 }} multiline rows={3} label="설명" name="description" value={book.description} onChange={handleChange} />
            <TextField fullWidth sx={{ mb: 2 }} multiline rows={6} label="본문" name="content" value={book.content} onChange={handleChange} />
            {book.coverImageUrl && (
                <Box sx={{ mb: 2, textAlign: "center" }}>
                    <Box component="img" src={book.coverImageUrl} alt="선택한 도서 표지" sx={{ width: 140, height: 180, objectFit: "cover", borderRadius: 1 }} />
                    <Typography variant="body2">선택한 표지</Typography>
                </Box>
            )}

            <Button fullWidth variant="outlined" sx={{ mb: 2 }} onClick={openPopup}>
                AI 이미지 선택
            </Button>

            <Button fullWidth variant="contained" disabled={submitting} onClick={handleSubmit}>
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
                        표지 비율 선택:
                    </Typography>

                    <FormControl fullWidth sx={{ mb: 3 }}>
                        <Select value={selectedSize} onChange={handleModelChange}>
                            <MenuItem value="1024x1536">📖 세로형 (1024×1536) - 책 표지 추천</MenuItem>
                            <MenuItem value="1024x1024">⬛ 정사각형 (1024×1024)</MenuItem>
                            <MenuItem value="1536x1024">🖼️ 가로형 (1536×1024)</MenuItem>
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
