// BookList.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container } from "@mui/material";
import BookCard from "../components/BookCard.jsx";
import Pagination from "../components/Pagination.jsx";
import Header from "../components/Header.jsx";
import SortButton from "../components/SortButton.jsx";
import api from "../config/api.js";

/**
 * 도서 목록 페이지 (메인)
 * - 전체 도서 목록을 카드 형태로 보여줍니다.
 * - 페이지네이션, 정렬(최신/인기순) 기능을 포함합니다.
 */
export default function BookList() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("LATEST");
    const [books, setBooks] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    // 도서 목록 조회 (정렬 및 페이지 필터 적용)
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get("/books", {
                    params: {
                        sort: sortOrder, // 정렬 기준
                        page: page - 1,  // 페이지 (0부터 시작)
                        size: 15,        // 한 페이지당 항목 수
                    },
                });

                const { content, totalPages } = response.data.data;

                setBooks(content || []);
                setTotalPages(totalPages || 0);
            } catch (error) {
                console.error("Failed to fetch books:", error);

                alert(
                    error.response?.data?.message ??
                    "도서 목록을 불러오는 중 오류가 발생했습니다."
                );

                setBooks([]);
            }
        };

        fetchBooks();
    }, [sortOrder, page]);

    const handleSortChange = (order) => {
        setSortOrder(order);
        setPage(1);
    };

    // 🔥 헤더에 넘겨줄 로그아웃 함수
    const handleLogout = () => {
        sessionStorage.removeItem("accessToken");
        alert("로그아웃 되었습니다.");
        // 새로고침해서 App의 isLoggedIn 초기값도 false로 맞춰주기
        window.location.href = "/login";
        // 또는 navigate("/login", { replace: true }); + App에서 setIsLoggedIn(false) 쓰는 방식도 가능
    };

    const ITEMS_PER_ROW = 5;
    const bookRows = [];
    for (let i = 0; i < books.length; i += ITEMS_PER_ROW) {
        bookRows.push(books.slice(i, i + ITEMS_PER_ROW));
    }

    return (
        <Box>
            <Header
                title="모두의 서재"
                showButton={true}
                showLogout={true}
                showMyPage={true}
                onLogout={handleLogout}
            />

            <Container component="main" maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Typography variant="h5" color="black">
                        도서 목록
                    </Typography>
                    <SortButton
                        sortOrder={sortOrder}
                        onSortChange={handleSortChange}
                    />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {bookRows.map((row, rowIndex) => (
                        <Box
                            key={rowIndex}
                            sx={{
                                borderBottom: "1px solid #e0e0e0",
                                pb: 5,
                                display: "grid",
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
                                        coverImageUrl: book.coverImageUrl,
                                        createdAt: book.bookCreated,
                                        category: book.category,
                                        nickname: book.user.nickname,
                                    }}
                                    onClick={() =>
                                        navigate(`/detail/${book.bookId}`, {
                                            state: book,
                                        })
                                    }
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
