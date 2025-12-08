import {Box,Typography,Button,Paper,Avatar,Container} from '@mui/material';
import { MenuBook } from '@mui/icons-material';

export default function LoginPage() {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID;
    const callbackUrl = import.meta.env.VITE_NAVER_CALLBACK_URL;

    const handleNaverLogin = () => {
        const naverLogin = new window.naver.LoginWithNaverId({
            clientId: clientId, // 네이버 클라이언트 ID
            callbackUrl: callbackUrl, // 콜백 URL
            isPopup: false, // 팝업 여부
            loginButton: { color: "green", type: 3, height: 60 },
        });
        naverLogin.init();

        // 네이버 로그인 버튼을 직접 클릭하는 효과를 줍니다.
        // 실제 버튼은 숨겨져 있을 수 있습니다.
        const naverLoginButton = document.getElementById("naverIdLogin").firstChild;
        if (naverLoginButton) {
            naverLoginButton.click();
        } else {
            // 버튼을 찾지 못한 경우에 대한 폴백 처리
            naverLogin.getLoginStatus((status) => {
                if (!status) {
                    // 로그인 창을 직접 띄웁니다.
                    // 이 방법은 팝업 차단에 의해 막힐 수 있습니다.
                    // getLoginStatus 콜백 내에서가 아니면 동작하지 않을 수 있습니다.
                    console.error("Naver login button not found.");
                }
            });
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
                        sx={{
                            backgroundColor: '#03C75A', // 네이버 그린
                            '&:hover': {
                                backgroundColor: '#02b351',
                            },
                            mt: 2,
                            width: '100%',
                            fontWeight: 'bold'
                        }}
                    >
                        네이버 아이디로 로그인
                    </Button>
                </Paper>
            </Container>
        </Box>
    );
}

