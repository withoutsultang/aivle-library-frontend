import { useState } from "react";
import { Box, Typography, Button, Paper, Container, Stack } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function BookBody() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { title, content } = state || {};
    const [page, setPage] = useState(1);

    const CHARS_PER_PAGE = 800;
    const totalPages = content ? Math.ceil(content.length / CHARS_PER_PAGE) : 1;
    const paginatedContent = content?.slice(
        (page - 1) * CHARS_PER_PAGE,
        page * CHARS_PER_PAGE
    );

    return (
        <Box
            sx={{
                minHeight: "80",
                bgcolor: "#e5e5e5",
                py: 6,
            }}
        >
            <Container maxWidth="lg">
                <Paper
                    elevation={4}
                    sx={{
                        minHeight: "60",
                        borderRadius: 0,
                        px: 10,
                        py: 8,
                        bgcolor: "#faf7ef", // 종이 느낌 배경
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate("/booklist")}
                        >
                            도서 목록
                        </Button>
                        <Button variant="contained" size="large">
                            수정
                        </Button>
                    </Box>
                    <Typography
                        variant="h2"
                        sx={{ fontWeight: 700, mb: 4, textAlign: "center" }}
                    >
                        {title ?? "제목 없음"}
                    </Typography>

                    {/* 📌 책 양면 스타일 적용 */}
                    <Typography
                        variant="body1"
                        sx={{
                            whiteSpace: "pre-line",
                            fontFamily: `"Noto Serif KR", serif`,
                            fontSize: "1.15rem",
                            lineHeight: 2,
                            color: "#333",
                            columnCount: 2,
                            columnGap: "60px",
                            textAlign: "justify",
                            minHeight: 500, // 페이지 변경 시 높이 고정
                            mb: 6,
                        }}
                    >
                        {paginatedContent ?? "본문 내용이 아직 등록되지 않았습니다."}
                    </Typography>

                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Pagination
                            total={totalPages}
                            page={page}
                            onChange={setPage}
                        />
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
}
