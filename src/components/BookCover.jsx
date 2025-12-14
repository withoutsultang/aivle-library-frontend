import React from "react";
import { Box } from "@mui/material";
import noImageIcon from "../assets/icons/noImage.svg";

/**
 * BookCover
 * - 이미지(src)가 있으면 이미지를 렌더링합니다.
 * - 없으면 중앙에 placeholder svg를 보여줍니다.
 *
 * Props:
 * - src: 이미지 URL
 * - alt: alt 텍스트
 * - sx: MUI sx 스타일 객체 (이미지 또는 placeholder 컨테이너에 적용)
 * - imgProps: 추가로 img 엘리먼트에 전달할 props
 * - placeholderSize: placeholder svg 크기 (px)
 * 현재 이미지가 없을 때만 noImage.svg 출력중인데, 이외에도 URL이 잘못되었거나 하는 문제의 경우에는 수정이 필요해 보임,
 * 입력을 할 때 파일 업로드 방식을 사용하는 것도 방법인듯, 일단은 여기서 마무리
 */
export default function BookCover({ src, alt = "cover", sx = {}, imgProps = {}, placeholderSize = 64 }) {
    const hasImage = !!src;

    if (hasImage) {
        return (
            <Box
                component="img"
                src={src}
                alt={alt}
                sx={sx}
                {...imgProps}
            />
        );
    }

    const defaultPlaceholderSx = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
    };

    return (
        <Box sx={{ ...defaultPlaceholderSx, ...sx }}>
            <img
                src={noImageIcon}
                alt="no image"
                width={placeholderSize}
                height={placeholderSize}
                style={{ opacity: 0.6 }}
            />
        </Box>
    );
}

