import PropTypes from 'prop-types';
import { COLORS } from "../config/constants.jsx";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

/**
 * 도서 읽기/뷰어 컴포넌트
 * - 페이지 단위로 도서 내용을 보여주는 뷰어입니다.
 * - 이전/다음 페이지 네비게이션을 제공합니다.
 * @param {string} title - 도서 제목
 * @param {string} paginatedContent - 현재 페이지의 본문 내용
 * @param {number} totalPages - 전체 페이지 수
 * @param {number} page - 현재 페이지 번호
 * @param {Function} onPageChange - 페이지 변경 핸들러
 * @param {Function} onBack - 뒤로가기(목록/요약으로) 핸들러
 */
export default function BookReader({ title, paginatedContent, totalPages, page, onPageChange, onBack }) {

    // 이전 페이지로 이동
    const handlePrevPage = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

    // 다음 페이지로 이동
    const handleNextPage = () => {
        if (page < totalPages) {
            onPageChange(page + 1);
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                position: 'relative',
                borderRadius: 0,
                px: { xs: 2, sm: 4, md: 10 },
                py: { xs: 4, md: 6 },
                bgcolor: "#faf7ef", // 종이 느낌 배경
                minHeight: { xs: 'auto', md: '70vh' },
                overflow: 'auto',
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Button
                    variant="text"
                    size="large"
                    onClick={onBack}
                    sx={{
                        color: COLORS.BTN_BEIGE,
                    }}
                >
                    ← 요약
                </Button>
            </Box>
            <Typography
                variant="h2"
                sx={{
                    fontWeight: 700,
                    mb: 4,
                    textAlign: "center",
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
                }}
            >
                {title ?? "제목 없음"}
            </Typography>

            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <IconButton
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    sx={{
                        position: 'absolute',
                        // 작은 화면에서는 좌우 버튼이 컨테이너 밖으로 튀어나오지 않도록 반응형으로 조정
                        left: { xs: '8px', md: '-40px' },
                    }}
                >
                    <ArrowBackIosNew fontSize="large" />
                </IconButton>

                <Typography
                    variant="body1"
                    sx={{
                        whiteSpace: "pre-line",
                        fontFamily: `"Noto Serif KR", serif`,
                        fontSize: "1.15rem",
                        lineHeight: 2,
                        color: "#333",
                        columnCount: { xs: 1, md: 2 },
                        columnGap: "60px",
                        textAlign: "justify",
                        // 본문 최소 높이도 낮춰서 전체 Paper 높이를 줄임
                        minHeight: { xs: 200, md: 400 },
                        flexGrow: 1,
                    }}
                >
                    {paginatedContent ?? "본문 내용이 아직 등록되지 않았습니다."}
                </Typography>

                <IconButton
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    sx={{
                        position: 'absolute',
                        right: { xs: '8px', md: '-40px' },
                    }}
                >
                    <ArrowForwardIos fontSize="large" />
                </IconButton>
            </Box>

            <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
                {page} / {totalPages}
            </Typography>
        </Paper>
    );
}

BookReader.propTypes = {
    title: PropTypes.string,
    paginatedContent: PropTypes.string,
    totalPages: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
};
