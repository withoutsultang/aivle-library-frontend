import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import BookReg from "./pages/BookReg";
import BookBody from "./pages/BookBody";
import LoginPage from "./pages/LoginPage";
import MyPage from "./pages/MyPage";
import ProtectedRoute from "./components/ProtectedRoute";

function AuthHandler({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const processed = useRef(false);

    useEffect(() => {
        if (processed.current) return;
        processed.current = true;

        const urlParams = new URLSearchParams(window.location.search);

        // 백엔드에서 쿼리 파라미터로 넘겨준 'token'을 읽어옵니다.
        const token = urlParams.get("token");

        const handleLoginSuccess = (token) => {
            sessionStorage.setItem("accessToken", token);
            setIsLoggedIn(true);
            navigate("/booklist", { replace: true });
        };

        const handleLoginFailure = (error) => {
            console.error("Login failed:", error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
            navigate("/login", { replace: true });
        };

        if (token) {
            // 토큰이 있으면 바로 성공 처리
            handleLoginSuccess(token);
        } else {
            // 토큰이 없거나, 다른 로그인 에러가 발생한 경우 (예: code/state가 남아있는 경우)
            const errorParam = urlParams.get("error");
            if (errorParam) {
                handleLoginFailure(`Authentication error: ${errorParam}`);
            } else {
                handleLoginFailure("로그인 정보(토큰)를 찾을 수 없습니다.");
            }
        }
    }, [navigate, setIsLoggedIn]);

    return <div>로그인 처리 중...</div>;
}

function App() {
    // 🔥 로그인 상태 체크 sessionStorage로 변경
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem("accessToken"));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={isLoggedIn ? "/booklist" : "/login"} replace />} />
                <Route path="/login" element={<LoginPage />} />

                <Route
                    path="/oauth/success"
                    element={<AuthHandler setIsLoggedIn={setIsLoggedIn} />}
                />

                <Route path="/booklist" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookList />
                    </ProtectedRoute>
                } />
                <Route path="/detail/:id" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookDetail />
                    </ProtectedRoute>
                } />
                <Route path="/bookreg" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookReg />
                    </ProtectedRoute>
                } />
                <Route path="/bookreg/:id" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookReg />
                    </ProtectedRoute>
                } />
                <Route path="/body" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookBody />
                    </ProtectedRoute>
                } />
                <Route path="/mypage" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <MyPage />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
