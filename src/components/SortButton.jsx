import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { COLORS } from '../config/constants.jsx';

/**
 * 정렬 옵션 정의
 */
const SORT_OPTIONS = {
    LATEST: '최신순',
    POPULAR: '인기순',
    TITLE_ASC: '오름차순',
    TITLE_DESC: '내림차순',
};

/**
 * 정렬 버튼 컴포넌트
 * - 드롭다운 메뉴를 통해 정렬 방식을 선택할 수 있습니다.
 * @param {string} sortOrder - 현재 정렬 상태 (키 값)
 * @param {Function} onSortChange - 정렬 변경 시 호출되는 핸들러
 */
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
                sx={{ color: COLORS.TEXT_BROWN }}
            >
                {SORT_OPTIONS[sortOrder]}
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
                <MenuItem onClick={() => handleSort('LATEST')}>최신순</MenuItem>
                <MenuItem onClick={() => handleSort('POPULAR')}>인기순</MenuItem>
                <MenuItem onClick={() => handleSort('TITLE_ASC')}>오름차순</MenuItem>
                <MenuItem onClick={() => handleSort('TITLE_DESC')}>내림차순</MenuItem>
            </Menu>
        </div>
    );
}

SortButton.propTypes = {
    sortOrder: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

