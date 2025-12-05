// components/Header.jsx
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();

    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{
                borderBottom: 1,
                borderColor: "divider",
                bgcolor: "rgba(255,255,255,0.9)",
                backdropFilter: "blur(8px)",
            }}
        >
            <Toolbar sx={{ maxWidth: 1200, mx: "auto", width: "100%" }}>
                <Box display="flex" alignItems="center" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                    <IconButton edge="start" color="primary" sx={{ mr: 1 }}>
                        <MenuBookIcon />
                    </IconButton>
                    <Typography variant="h6" fontWeight={700}>
                        BookShelf
                    </Typography>
                </Box>

                <Box sx={{ flexGrow: 1 }} />

                <Button color="inherit" onClick={() => navigate("/")}>
                    도서 목록
                </Button>
                <Button variant="contained" sx={{ ml: 1 }} onClick={() => navigate("/register")}>
                    신규 등록
                </Button>
                {isLoggedIn && (
                    <Button color="error" onClick={logout}>
                        로그아웃
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}