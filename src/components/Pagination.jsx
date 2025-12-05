import { Pagination as MuiPagination, Box } from "@mui/material";

export default function Pagination({ total, page, onChange }) {
    return (
        <Box display="flex" justifyContent="center" mt={4}>
            <MuiPagination
                count={total}
                page={page}
                color="primary"
                onChange={(e, value) => onChange(value)}
            />
        </Box>
    );
}
