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
    const [page, setPage] = useState(1); // 페이지는 1부터 시작
    const [sortOrder, setSortOrder] = useState("LATEST");
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(baseUrl + "/books", {
                    params: {
                        sort: sortOrder,
                        page: page - 1, // API는 페이지를 0부터 시작
                        size: 15
                    }
                });
                const { content, totalPages } = response.data.data;
                console.log(response)
                setBooks(content || []);
                setTotalPages(totalPages || 0);
            } catch (error) {
                console.error("Failed to fetch books:", error);
                setBooks([]); // 에러 발생 시 빈 배열로 초기화
            }
        };

        fetchBooks();
    }, [sortOrder, page]);

    const handleSortChange = (order) => {
        setSortOrder(order);
        setPage(1); // 정렬 순서 변경 시 1페이지로 리셋
    };

    const ITEMS_PER_ROW = 5; // 데스크톱 기준 한 줄에 표시할 아이템 수

    // 페이지네이션된 데이터를 행 단위로 그룹화
    const bookRows = [];
    for (let i = 0; i < books.length; i += ITEMS_PER_ROW) {
        bookRows.push(books.slice(i, i + ITEMS_PER_ROW));
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
                                        coverImageUrl: book.coverImageUrl, // image 대신 coverImageUrl을 전달
                                        createdAt: book.bookCreated,
                                        category: book.category,
                                    }}
                                    onClick={() => navigate(`/detail/${book.bookId}`, {
                                        state: {
                                            title: book.title,
                                            coverImageUrl: book.coverImageUrl,
                                            createdAt: book.bookCreated,
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
