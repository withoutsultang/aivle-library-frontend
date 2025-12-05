import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
    Divider,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import mockBookDetails from "../data/mockBookDetails";

export default function BookDetail() {
    const navigate = useNavigate();
    const { id } = useParams();

    const bookItem = mockBookDetails.find((item) => item.id === Number(id));
    const book = bookItem?.data;

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

    const formatDate = (iso) =>
        iso ? new Date(iso).toLocaleDateString("ko-KR") : "-";

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
                <Box display="flex" gap={6}>
                    {/* 왼쪽 : 표지 + 메타 정보 */}
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        minWidth={260}
                    >
                        <Box
                            component="img"
                            src={book.coverImageUrl}
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

                        <Box width="100%">
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <Typography component="span" fontWeight="bold">
                                    저자:&nbsp;
                                </Typography>
                                {book.author ?? "미상"}
                                {" / "}
                                <Typography component="span" fontWeight="bold">
                                    장르:&nbsp;
                                </Typography>
                                {book.category}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                작성일 : {formatDate(book.bookCreated)}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                수정일 : {formatDate(book.bookUpdated)}
                            </Typography>
                        </Box>

                        <Box
                            display="flex"
                            gap={2}
                            mt={4}
                            width="100%"
                            justifyContent="space-between"
                        >
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                            >
                                삭제
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="warning"
                                onClick={() =>
                                    navigate(`/bookreg/${book.bookId}`)
                                }
                            >
                                수정
                            </Button>
                        </Box>
                    </Box>

                    {/* 오른쪽 : 제목 + 요약 + 본문 버튼 */}
                    <Box flex={1}>
                        <Typography
                            variant="h3"
                            fontWeight={700}
                            gutterBottom
                        >
                            {book.title}
                        </Typography>

                        <Divider sx={{ mb: 3 }} />

                        <Typography
                            variant="h5"
                            fontWeight={600}
                            sx={{ mb: 2 }}
                        >
                            도서 요약
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{ lineHeight: 1.8, whiteSpace: "pre-line" }}
                        >
                            {book.description ?? "요약 정보가 없습니다."}
                        </Typography>

                        <Box mt={4}>
                            <Button
                                variant="outlined"
                                size="large"
                                onClick={() =>
                                    navigate("/body", {
                                        state: {
                                            title: book.title,
                                            content: book.content,
                                        },
                                    })
                                }
                            >
                                본문 보러가기
                            </Button>
                        </Box>
                    </Box>
                </Box>

                {/* 맨 아래 오른쪽 : 도서 목록 버튼 */}
                <Box
                    mt={5}
                    display="flex"
                    justifyContent="flex-end"
                >
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/booklist")}
                    >
                        도서 목록
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}
