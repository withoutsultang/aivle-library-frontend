import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
    Divider,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { COLORS } from "../config/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config/constants";

export default function BookDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    // 목록에서 전달받은 state가 있다면 초기 데이터로 사용
    const [book, setBook] = useState(location.state || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(baseUrl + `/books/${id}/detail`);
                // 기존 상태에 API로부터 받은 전체 데이터를 병합/덮어쓰기
                setBook(prevBook => ({ ...prevBook, ...response.data.data }));
                setError(null);
            } catch (err) {
                setError("도서 정보를 불러오는데 실패했습니다.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBookDetail();
        }
    }, [id]);

    const formatDate = (iso) =>
        iso ? new Date(iso).toLocaleDateString("ko-KR") : "-";

    if (loading) {
        return <Container sx={{ p: 4 }}><Typography>로딩 중...</Typography></Container>;
    }

    if (error) {
        return (
            <Box p={4}>
                <Typography>{error}</Typography>
                <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
                    뒤로가기
                </Button>
            </Box>
        );
    }

    if (!book) {
        return (
            <Box p={4}>
                <Typography>존재하지 않는 도서입니다.</Typography>
                <Button sx={{ mt: 2 }} onClick={() => navigate(-1)}>
                    뒤로가기
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Container maxWidth="lg">
                {/* 상단: 뒤로(목록으로) 링크 */}
                <Box sx={{ mb: 2, display: 'flex' }}>
                    <Button
                        onClick={() => navigate('/booklist')}
                        sx={{ color: COLORS.TEXT_BROWN, textTransform: 'none', fontSize: 14, p: 0 }}
                    >
                        ← 목록으로
                    </Button>
                </Box>

                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, position: 'relative', overflow: 'visible' }}>
                    {/* 우측 상단 수정 버튼 */}
                    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                        <Button
                            color="inherit"
                            onClick={() => navigate(`/bookreg/${book.id}`)}
                            sx={{
                                borderColor: COLORS.BORDER_BEIGE,
                                color: COLORS.TEXT_BROWN,
                                textTransform: 'none',
                                '&:hover': { borderColor: COLORS.BORDER_BEIGE_HOVER }
                            }}
                        >
                            ✎ 수정
                        </Button>
                    </Box>

                    <Box display="flex" gap={6} alignItems="flex-start">
                        {/* 왼쪽 : 표지 */}
                        <Box minWidth={260}>
                            <Box
                                component="img"
                                src={book.image}
                                alt={book.title}
                                sx={{
                                    width: 260,
                                    height: 360,
                                    objectFit: 'cover',
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    mb: 3,
                                }}
                            />
                        </Box>

                        <Box flex={1}>
                            <Box display="flex" alignItems="center" gap={2} mb={1}>
                                <Box sx={{ bgcolor: '#f4e4d6', px: 1.5, py: 0.5, borderRadius: 10, fontSize: 12, color: '#8a5f3b' }}>
                                    {book.category}
                                </Box>
                            </Box>

                            <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                                {book.title}
                            </Typography>

                            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
                                {book.description}
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', rowGap: 1.5, columnGap: 2, alignItems: 'center', mb: 3 }}>
                                <Typography sx={{ color: '#8a5f3b' }}>작성일:</Typography>
                                <Typography>{formatDate(book.createdAt)}</Typography>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                                책 소개
                            </Typography>

                            <Typography variant="body1" sx={{ color: '#4b3828', lineHeight: 1.8, whiteSpace: 'pre-line', mb: 3 }}>
                                {book.content ?? '책 소개 정보가 없습니다.'}
                            </Typography>

                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate(`/bookbody/${book.id}`, { state: { title: book.title, content: book.content } })}
                                    sx={{
                                        backgroundColor: COLORS.BTN_BEIGE,
                                        color: '#fff',
                                        textTransform: 'none',
                                        px: 6,
                                        py: 1.5,
                                        borderRadius: 1,
                                        '&:hover': { backgroundColor: COLORS.BTN_BEIGE_HOVER }
                                    }}
                                >
                                    본문 읽기
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
