import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Select,
    MenuItem,
    Box,
} from "@mui/material";
import { COLORS } from "../../../../../Downloads/FrontEnd-main (3)/FrontEnd-main/src/config/constants.jsx";

export default function Header({
                                   title,
                                   order,
                                   onOrderChange,
                                   showSort = false,
                                   showButton = false,
                                   onLogout,
                                   showLogout = false,
                                   showMyPage = false,
                               }) {
    const navigate = useNavigate();

    return (
        <AppBar
            position="static"
            color="transparent"
            elevation={0}
            sx={{
                mb: 2,
                backgroundColor: "#f1e5d3",
                color: "#3E2723",
            }}
        >
            <Toolbar
                sx={{
                    minHeight: 48,
                    px: { xs: 2 },
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ color: "#3E2723" }}
                >
                    {title}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    {showSort && (
                        <Select
                            size="small"
                            variant="outlined"
                            value={order}
                            onChange={(e) => onOrderChange(e.target.value)}
                            sx={{
                                minWidth: 100,
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: COLORS.BORDER_BEIGE,
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: COLORS.BORDER_BEIGE,
                                },
                                backgroundColor: "white",
                            }}
                        >
                            <MenuItem value="popular">인기순</MenuItem>
                            <MenuItem value="latest">최신순</MenuItem>
                        </Select>
                    )}

                    {showButton && (
                        <Button
                            variant="contained"
                            onClick={() => navigate("/bookreg")}
                            sx={{
                                backgroundColor: COLORS.BTN_BEIGE,
                                "&:hover": {
                                    backgroundColor: COLORS.BTN_BEIGE_HOVER,
                                },
                            }}
                        >
                            신규 도서 등록
                        </Button>
                    )}

                    {showMyPage && (
                        <Button
                            variant="text"
                            onClick={() => navigate("/mypage")}
                            sx={{
                                color: COLORS.TEXT_BROWN,
                                fontWeight: 500,
                                ml: 1,
                            }}
                        >
                            마이페이지
                        </Button>
                    )}

                    {showLogout && (
                        <Button
                            variant="text"
                            onClick={onLogout}
                            sx={{
                                color: COLORS.TEXT_BROWN,
                                fontWeight: 500,
                                ml: 1,
                            }}
                        >
                            로그아웃
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    order: PropTypes.string,
    onOrderChange: PropTypes.func,
    showSort: PropTypes.bool,
    showButton: PropTypes.bool,
    onLogout: PropTypes.func,
    showLogout: PropTypes.bool,
    showMyPage: PropTypes.bool,
};
