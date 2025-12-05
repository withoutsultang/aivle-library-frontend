import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Button, Typography, Box, ToggleButton, ToggleButtonGroup, Paper, Stack,
} from "@mui/material";
import mockBooksResponse from "../data/mockBooks";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";

export default function BookList() {
    const navigate = useNavigate();
    const [order, setOrder] = useState("popular");
    const [page, setPage] = useState(1);

    const ITEMS_PER_PAGE = 15;

    // 책 배열(나중에 axios로 받아올 데이터)
    const books = mockBooksResponse.data.books;

    // 데이터 잘라서 페이지네이션
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedBooks = books.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(books.length / ITEMS_PER_PAGE);

    //UI 렌더링
    return (
        <Box>
            {/* 타이틀과 아래 문구 */}
            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" mb={3}>
                <Box>
                    <Typography variant="h4" fontWeight={700}>
                        도서 목록
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mt={0.5}>
                        등록된 책들을 확인하고 관리할 수 있어요.
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/bookreg")}
                >
                    신규 도서 등록
                </Button>
            </Stack>

            <Paper
                variant="outlined"
                sx={{
                    mb: 3,
                    px: 2,
                    py: 1.5,
                    borderRadius: 3,
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <ToggleButtonGroup
                    size="small"
                    value={order}
                    exclusive
                    onChange={(e, val) => val && setOrder(val)}
                >
                    <ToggleButton value="popular">인기순</ToggleButton>
                    <ToggleButton value="latest">최신순</ToggleButton>
                </ToggleButtonGroup>

            </Paper>

            <Box
                display="grid"
                gridTemplateColumns="repeat(5, 1fr)"
                columnGap={2}
                rowGap={3}
            >
                {paginatedBooks.map((book) => (
                    <BookCard
                        key={book.bookId}
                        book={{
                            id: book.bookId,
                            title: book.title,
                            image: book.coverImageUrl,
                            createdAt: book.createdAt,
                        }}
                        onClick={() => navigate(`/detail/${book.bookId}`)}
                    />
                ))}
            </Box>
            <Pagination total={totalPages} page={page} onChange={setPage} />
        </Box>
    );
}
