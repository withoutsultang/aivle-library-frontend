import { Box, Typography, Button, Paper, Avatar, Container } from '@mui/material';
import { MenuBook } from '@mui/icons-material';
import { useState } from 'react';
import {baseUrl} from "../config/constants";
import axios from 'axios';

//const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

/**
 * 로그인 페이지
 * - 네이버 OAuth 로그인을 시작하는 진입점입니다.
 * - 백엔드로부터 로그인 URL을 받아 리다이렉트합니다.
 */
export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    // 네이버 로그인 핸들러
    const handleNaverLogin = async () => {
        try {
            setLoading(true);
            // 백엔드에서 네이버 로그인 인증 URL 요청
            const response = await axios.get(`${baseUrl}/auth/naver/login-url`);
            const { loginUrl } = response.data.data;

            // 해당 URL로 이동 (네이버 로그인 페이지)
            window.location.href = loginUrl;
        } catch (error) {
            console.error('Failed to get Naver login URL:', error);
            alert('로그인 URL을 가져오는데 실패했습니다.');
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        borderRadius: 3,
                        backgroundColor: 'white',
                        boxShadow: '0 8px 32px rgba(139, 111, 71, 0.15)',
                        width: 400,
                        height: 350,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 2 }}>
                        <Avatar sx={{ m: 1, bgcolor: '#8B6F47', width: 64, height: 64 }}>
                            <MenuBook sx={{ fontSize: 32 }} />
                        </Avatar>
                        <Typography component="h1" variant="h4" sx={{ margin: 0, color: '#3E2723', fontWeight: 'bold' }}>
                            모두의 서재
                        </Typography>
                        <Typography sx={{ margin: '8px 0 0 0', color: '#6D4C41' }}>
                            로그인이 필요합니다.
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        onClick={handleNaverLogin}
                        disabled={loading}
                        sx={{
                            backgroundColor: '#03C75A',
                            '&:hover': {
                                backgroundColor: '#02b351',
                            },
                            mt: 2,
                            width: '100%',
                            fontWeight: 'bold'
                        }}
                    >
                        {loading ? (
                            <CircularProgress size={24} sx={{ color: 'white' }} />
                        ) : (
                            '네이버 아이디로 로그인'
                        )}
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}