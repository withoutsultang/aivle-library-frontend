import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { BUTTON_COLORS } from '../config/constants';

export default function SortButton({ sortOrder, onSortChange }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = (order) => {
        onSortChange(order);
        handleClose();
    };

    return (
        <div>
            <Button
                id="sort-button"
                aria-controls={open ? 'sort-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{ color: BUTTON_COLORS.TEXT_BROWN }}
            >
                {sortOrder}
            </Button>
            <Menu
                id="sort-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'sort-button',
                }}
            >
                <MenuItem onClick={() => handleSort('최신순')}>최신순</MenuItem>
                <MenuItem onClick={() => handleSort('인기순')}>인기순</MenuItem>
            </Menu>
        </div>
    );
}

SortButton.propTypes = {
    sortOrder: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

