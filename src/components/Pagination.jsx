import { Pagination as MuiPagination, Box } from "@mui/material";
import { COLORS } from "../config/constants.jsx";

/**
 * 페이지네이션 컴포넌트
 * - 목록의 페이지 이동을 처리하는 UI입니다.
 * @param {number} total - 전체 페이지 수
 * @param {number} page - 현재 페이지 번호
 * @param {Function} onChange - 페이지 변경 시 호출되는 핸들러
 */
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