import { Pagination as MuiPagination, Box } from "@mui/material";
import { COLORS } from "../config/constants";

export default function Pagination({ total, page, onChange }) {
    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <MuiPagination
                count={total}
                page={page}
                onChange={(e, value) => onChange(value)}
                sx={{
                    '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: COLORS.BTN_BEIGE,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: COLORS.BTN_BEIGE_HOVER,
                        },
                    },
                }}
            />
        </Box>
    );
}

// note: Box의 mt (marginTop)은 pagination을 위로 띄우는 역할을 하며, 페이지 하단의 검은 띠와는 관련이 없습니다. 하단 띠는 전역 배경색 또는 고정된 footer에 의해 생길 가능성이 큽니다.
