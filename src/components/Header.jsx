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
import { COLORS } from "../config/constants.js";

/**
 * 공통 헤더 컴포넌트
 * - 페이지 상단에 위치하며 타이틀, 정렬, 버튼, 로그아웃 등의 기능을 제공합니다.
 * - props에 따라 노출되는 요소가 달라집니다.
 *
 * @param {string} title - 헤더 타이틀
 * @param {string} order - 정렬 순서 (popular / latest 등)
 * @param {Function} onOrderChange - 정렬 변경 핸들러
 * @param {boolean} showSort - 정렬 선택 박스 노출 여부
 * @param {boolean} showButton - 신규 도서 등록 버튼 노출 여부
 * @param {Function} onLogout - 로그아웃 핸들러
 * @param {boolean} showLogout - 로그아웃 버튼 노출 여부
 * @param {boolean} showMyPage - 마이페이지 버튼 노출 여부
 */
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
