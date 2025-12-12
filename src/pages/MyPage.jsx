// BookList.jsx (마이페이지 용)
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Container } from "@mui/material";
import BookCard from "../components/BookCard.jsx";
import Header from "../components/Header.jsx";
import api from "../config/api.jsx";

/**
 * 마이 페이지
 * - 로그인한 사용자가 등록한 도서 목록을 보여줍니다.
 */
export default function BookList() {
    const navigate = useNavigate();

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchMyBooks = async () => {
            try {
                const res = await api.get("/mypage/mybooks");

                console.log(res.data.data); // 👉 여기 찍으면 [ { bookId: 6, ... } ]

                setBooks(res.data.data ?? []);  // ⭐ 배열 그대로 넣기
            } catch (error) {
                console.error("Failed to fetch my books:", error);
                alert(
                    error.response?.data?.message ??
                    "도서 목록을 불러오는 중 오류가 발생했습니다."
                );
                setBooks([]);
            }
        };

        fetchMyBooks();
    }, []);

    const handleLogout = () => {
        sessionStorage.removeItem("accessToken");
        alert("로그아웃 되었습니다.");
        window.location.href = "/login";
    };

    return (
        <Box>
            <Header
                title="마이페이지"
                showButton={true}
                showLogout={true}
                onLogout={handleLogout}
            />

            <Container component="main" maxWidth="lg">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                    }}
                >
                    <Typography variant="h5" color="black">
                        내가 등록한 도서
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "repeat(2, 1fr)",
                            sm: "repeat(3, 1fr)",
                            md: "repeat(4, 1fr)",
                            lg: "repeat(5, 1fr)",
                        },
                        gap: 4,
                        pb: 6,
                    }}
                >
                    {books.map((book) => (
                        <BookCard
                            key={book.bookId}
                            book={{
                                id: book.bookId,
                                title: book.title,
                                coverImageUrl: book.coverImageUrl,
                                createdAt: book.bookCreated,
                                category: book.category,
                            }}
                            onClick={() =>
                                navigate(`/detail/${book.bookId}`, {
                                    state: book,
                                })
                            }
                        />
                    ))}
                </Box>
            </Container>
        </Box>
    );
}
