import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {Typography, Box, Container} from "@mui/material";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import SortButton from "../components/SortButton";
import axios from "axios";
import { baseUrl } from "../config/constants";

export default function BookList() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("최신순");
    const [sortedBooks, setSortedBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(baseUrl + "/books");
                const books = response.data.data || [];
                console.log(response)
                console.log(books)

                if (sortOrder === '최신순') {
                    books.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                } else if (sortOrder === '인기순') {
                    books.sort((a, b) => b.viewCount - a.viewCount);
                }
                setSortedBooks(books);
                setPage(1); // 데이터 로드 및 정렬 후 1페이지로 리셋
            } catch (error) {
                console.error("Failed to fetch books:", error);
                setSortedBooks([]); // 에러 발생 시 빈 배열로 초기화
            }
        };

        fetchBooks();
    }, [sortOrder]);

    const handleSortChange = (order) => {
        setSortOrder(order);
    };

    const ITEMS_PER_PAGE = 15;

    // 데이터 잘라서 페이지네이션
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedBooks = sortedBooks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // 전체 페이지 수 계산
    const totalPages = Math.ceil(sortedBooks.length / ITEMS_PER_PAGE);

    const ITEMS_PER_ROW = 5; // 데스크톱 기준 한 줄에 표시할 아이템 수

    // 페이지네이션된 데이터를 행 단위로 그룹화
    const bookRows = [];
    for (let i = 0; i < paginatedBooks.length; i += ITEMS_PER_ROW) {
        bookRows.push(paginatedBooks.slice(i, i + ITEMS_PER_ROW));
    }

    //UI 렌더링
    return (
        <Box>
            <Header title="모두의 서재" showButton={true} />
            <Container component="main" maxWidth="lg"  sx={{ mt: 0, mb: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h5" component="h2" color="black">
                        도서 목록
                    </Typography>
                    <SortButton sortOrder={sortOrder} onSortChange={handleSortChange} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {bookRows.map((row, rowIndex) => (
                        <Box
                            key={rowIndex}
                            sx={{
                                borderBottom: '1px solid #e0e0e0', // 책장 선반
                                pb: 5, // 선반과 책 사이의 간격
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: "repeat(2, 1fr)",
                                    sm: "repeat(3, 1fr)",
                                    md: "repeat(4, 1fr)",
                                    lg: `repeat(${ITEMS_PER_ROW}, 1fr)`,
                                },
                                columnGap: 4,
                            }}
                        >
                            {row.map((book) => (
                                <BookCard
                                    key={book.bookId}
                                    book={{
                                        id: book.bookId,
                                        title: book.title,
                                        image: book.coverImageUrl,
                                        createdAt: book.createdAt,
                                        category: book.category,
                                    }}
                                    onClick={() => navigate(`/detail/${book.bookId}`, {
                                        state: {
                                            title: book.title,
                                            image: book.coverImageUrl,
                                            createdAt: book.createdAt,
                                            category: book.category,
                                        }
                                    })}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>
                <Pagination total={totalPages} page={page} onChange={setPage} />
            </Container>
        </Box>
    );
}
