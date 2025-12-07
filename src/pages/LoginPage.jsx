import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Paper,
    Avatar,
    Container
} from '@mui/material';
import { MenuBook } from '@mui/icons-material';
import { BUTTON_COLORS } from '../config/constants';

export default function LoginPage({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        // 실제 애플리케이션에서는 여기에서 API 연동 및 성공 여부를 확인합니다.
        setIsLoggedIn(true);
        navigate('/');
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
                        onClick={handleLogin}
                        sx={{
                            backgroundColor: BUTTON_COLORS.BG_BEIGE,
                            '&:hover': {
                                backgroundColor: BUTTON_COLORS.BG_BEIGE_HOVER,
                            },
                            mt: 2,
                            width: '100%',
                        }}
                    >
                        임시 로그인 버튼
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}