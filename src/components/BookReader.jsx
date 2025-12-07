import PropTypes from 'prop-types';
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';

export default function BookReader({ title, paginatedContent, totalPages, page, onPageChange, onBack }) {

    const handlePrevPage = () => {
        if (page > 1) {
            onPageChange(page - 1);
        }
    };

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
                minHeight: '100vh',
                overflow: 'auto',
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
                <Button
                    variant="text"
                    size="large"
                    onClick={onBack}
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
                        left: '-70px',
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
                        minHeight: { xs: 300, md: 600 },
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
                        right: '-70px',
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

