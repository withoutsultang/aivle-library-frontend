import { Pagination as MuiPagination, Box } from "@mui/material";
import { BUTTON_COLORS } from "../config/constants";

export default function Pagination({ total, page, onChange }) {
    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <MuiPagination
                count={total}
                page={page}
n                onChange={(e, value) => onChange(value)}
                sx={{
                    '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: BUTTON_COLORS.b,
                        color: 'white',
                        '&:hover': {
                            backgroundColor: BUTTON_COLORS.brown,
                        },
                    },
                    // 포커스 시 파란색 테두리(outline) 제거
                    '& .MuiPaginationItem-root:focus': {
                        outline: 'none',
                    },
                }}
            />
        </Box>
    );
}
