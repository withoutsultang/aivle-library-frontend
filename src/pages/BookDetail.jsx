import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
    Divider,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { COLORS } from "../config/constants.js";
import { useEffect, useState } from "react";
import api from "../config/api.js";
import { useUser } from "../store/useUser.js";
import BookCover from "../components/BookCover";


/**
 * 도서 상세 페이지
 * - 도서의 상세 정보(제목, 저자, 내용 등)를 조회하고 표시합니다.
 * - 본문 읽기, 수정, 삭제 기능을 제공합니다.
 */
export default function BookDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const [book, setBook] = useState(location.state || null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useUser();

    //글 작성자인지 확인 하기
    const isOwner =
        !!user?.userId &&
        String(user.userId) === String(book?.user?.userId);

    // 도서 삭제 핸들러
    const handleDelete = async () => {
        if (!window.confirm("정말로 이 책을 삭제하시겠습니까?")) return;

        try {
            await api.delete(`/books/${id}`);
            alert("도서가 삭제되었습니다.");
            navigate("/");
        } catch (err) {
            console.error(err);
            alert(
                err.response?.data?.message ??
                "도서 삭제에 실패했습니다."
            );
            setError("도서 삭제에 실패했습니다.");
        }
    };

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        (async () => {
            try {
                setLoading(true);
                const [detail, info] = await Promise.all([
                    api.get(`/books/${id}/detail`, { signal: controller.signal }),
                    api.get(`/books/${id}`, { signal: controller.signal }),
                ]);
                if (!controller.signal.aborted) {
                    setBook({ ...info.data.data, ...detail.data.data });
                    setError(null);
                }
            } catch (error) {
                if (!controller.signal.aborted) setError(error.response?.data?.message ?? "도서 정보를 불러오지 못했습니다.");
            } finally {
                if (!controller.signal.aborted) setLoading(false);
            }
        })();
        return () => controller.abort();
    }, [id]);

    const formatDate = (iso) =>
        iso ? new Date(iso).toLocaleDateString("ko-KR") : "-";

    if (loading) {
        return (
            <Container sx={{ p: 4 }}>
                <Typography>로딩 중...</Typography>
            </Container>
        );
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

    const createdAt = book.createdAt ?? book.bookCreated;
    const modifiedAt = book.modifiedAt ?? book.bookUpdated;
    const coverImageUrl = book.coverImageUrl ?? book.cover_image_url;

    return (
        <Box sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
            <Container maxWidth="lg">
                <Box sx={{ mb: 2, display: "flex" }}>
                    <Button
                        onClick={() => navigate("/booklist")}
                        sx={{
                            color: COLORS.TEXT_BROWN,
                            textTransform: "none",
                            fontSize: 14,
                            p: 0,
                        }}
                    >
                        ← 도서 목록
                    </Button>
                </Box>

                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        borderRadius: 3,
                        position: "relative",
                        overflow: "visible",
                    }}
                >
                    {isOwner && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                display: "flex",
                                gap: 1,
                            }}
                        >
                            <Button
                                color="inherit"
                                onClick={() =>
                                    navigate(`/bookreg/${book.bookId}`, {
                                        state: { book },
                                    })
                                }
                                sx={{
                                    borderColor: COLORS.BORDER_BEIGE,
                                    color: COLORS.TEXT_BROWN,
                                    textTransform: "none",
                                    "&:hover": {
                                        borderColor: COLORS.BORDER_BEIGE_HOVER,
                                    },
                                }}
                            >
                                ✎ 수정
                            </Button>

                            <Button
                                color="error"
                                onClick={handleDelete}
                                sx={{ textTransform: "none" }}
                            >
                                삭제
                            </Button>
                        </Box>
                    )}


                    <Box display="flex" gap={6} alignItems="flex-start">
                        <Box minWidth={260}>
                            <BookCover
                                src={coverImageUrl}
                                alt={book.title}
                                sx={{
                                    width: 260,
                                    height: 360,
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    mb: 3,
                                }}
                            />
                        </Box>

                        <Box flex={1}>
                            <Box
                                display="flex"
                                alignItems="center"
                                gap={2}
                                mb={1}
                            >
                                <Box
                                    sx={{
                                        bgcolor: "#f4e4d6",
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 10,
                                        fontSize: 12,
                                        color: "#8a5f3b",
                                    }}
                                >
                                    {book.category}
                                </Box>
                            </Box>

                            <Typography
                                variant="h4"
                                fontWeight={700}
                                sx={{ mb: 1 }}
                            >
                                {book.title}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                color="text.secondary"
                                sx={{ mb: 2 }}
                            >
                                작성자: {book.user?.nickname ?? "정보 없음"}
                            </Typography>

                            <Divider sx={{ mb: 3 }} />

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 1.5,
                                    mb: 3,
                                }}
                            >
                                <Typography sx={{ color: "black" }}>
                                    작성일: {formatDate(createdAt)}
                                </Typography>

                                <Typography sx={{ color: "black" }}>
                                    수정일: {formatDate(modifiedAt)}
                                </Typography>
                            </Box>

                            <Divider sx={{ mb: 2 }} />

                            <Typography
                                variant="h6"
                                fontWeight={600}
                                sx={{ mb: 1 }}
                            >
                                책 소개
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: "#4b3828",
                                    lineHeight: 1.8,
                                    whiteSpace: "pre-line",
                                    mb: 3,
                                }}
                            >
                                {book.description ?? "책 소개 정보가 없습니다."}
                            </Typography>

                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        navigate(`/body`, {
                                            state: {
                                                title: book.title,
                                                content: book.content,
                                            },
                                        })
                                    }
                                    sx={{
                                        backgroundColor: COLORS.BTN_BEIGE,
                                        color: "#fff",
                                        textTransform: "none",
                                        px: 6,
                                        py: 1.5,
                                        borderRadius: 1,
                                        "&:hover": {
                                            backgroundColor:
                                                COLORS.BTN_BEIGE_HOVER,
                                        },
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
