import { useState } from "react";
import { Box, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import BookReader from "../components/BookReader.jsx";

/**
 * 도서 본문 조회 페이지
 * - 전체 텍스트를 페이지 단위로 나누어 보여줍니다.
 */
export default function BookBody() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { title, content } = state || {};
    const [page, setPage] = useState(1);

    // 긴 텍스트를 페이지 단위로 분할 (800자 기준)
    const CHARS_PER_PAGE = 800;
    const totalPages = content ? Math.ceil(content.length / CHARS_PER_PAGE) : 1;
    const paginatedContent = content?.slice(
        (page - 1) * CHARS_PER_PAGE,
        page * CHARS_PER_PAGE
    );

    return (
        <Box
            sx={{
                height: "100vh",
                bgcolor: "#e5e5e5",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Container maxWidth="lg">
                {/* BookReader 컴포넌트에 필요한 props 전달 */}
                <BookReader
                    title={title}
                    paginatedContent={paginatedContent}
                    totalPages={totalPages}
                    page={page}
                    onPageChange={setPage}
                    onBack={() => navigate(-1)}
                />
            </Container>
        </Box>
    );
}
