// components/BookCard.jsx
import { Card, CardMedia, CardContent, Typography, Chip, Stack } from "@mui/material";

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
            <CardMedia component="img" height="220" image={book.image} alt={book.title} />

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
                        {book.category}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}