// components/BookCard.jsx
import { Card, CardContent, Typography, Stack } from "@mui/material";
import BookCover from "./BookCover";

/**
 * 도서 카드 컴포넌트
 * - 목록에서 개별 도서 정보를 카드 형태로 보여줍니다.
 * @param {Object} book - 도서 정보 객체 (title, coverImageUrl, category 등 포함)
 * @param {Function} onClick - 카드 클릭 시 실행될 핸들러
 */
export default function BookCard({ book, onClick }) {
    return (
        <Card
            onClick={onClick}
            sx={{
                cursor: "pointer",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(15,23,42,0.08)",
                transition: "all 0.25s ease",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(15,23,42,0.18)",
                },
            }}
        >
            {/* 이미지 여부에 따라 다른 UI 렌더링 */}
            <BookCover
                src={book.coverImageUrl}
                alt={book.title}
                sx={{ height: 220, width: '100%', objectFit: 'cover' }}
                imgProps={{ style: { height: 220 } }}
            />

            <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                    >
                        {book.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {book.nickname}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}