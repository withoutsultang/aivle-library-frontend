import { Pagination as MuiPagination, Box } from "@mui/material";
import { COLORS } from "../../../../../Downloads/FrontEnd-main (3)/FrontEnd-main/src/config/constants.jsx";

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