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

/**
 * AuthHandler 컴포넌트
 * - OAuth 로그인 리다이렉트 처리 컴포넌트입니다.
 * - 백엔드에서 전달된 토큰을 파싱하여 세션 스토리지에 저장하고,
 * - 로그인 상태를 업데이트한 후 메인 페이지로 이동합니다.
 */

import api from "./config/api.js";
import { useUser } from "./store/UserContext";

function AuthHandler({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const processed = useRef(false);

    const { setUser } = useUser(); // ✅ 전역 store

    useEffect(() => {
        if (processed.current) return;
        processed.current = true;

        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");

        const handleLoginSuccess = async (token) => {
            try {
                sessionStorage.setItem("accessToken", token);
                setIsLoggedIn(true);

                const res = await api.get("/me");
                setUser(res.data.data); // ✅ 전역 user 저장

                navigate("/booklist", { replace: true });
            } catch (e) {
                console.error("me 호출 실패:", e);
                sessionStorage.removeItem("accessToken");
                alert("로그인 처리 중 오류가 발생했습니다.");
                navigate("/login", { replace: true });
            }
        };

        if (token) handleLoginSuccess(token);
        else navigate("/login", { replace: true });
    }, [navigate, setIsLoggedIn, setUser]);

    return <div>로그인 처리 중...</div>;
}



/**
 * App 컴포넌트
 * - 애플리케이션의 메인 진입점입니다.
 * - 라우팅 설정 및 전역 로그인 상태 관리를 담당합니다.
 */

function App() {
    // 🔥 로그인 상태 체크 sessionStorage로 변경
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem("accessToken"));
    const { user, setUser, clearUser } = useUser();

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken");
        if (!token || user) return;

        (async () => {
            try {
                const res = await api.get("/me");
                setUser(res.data.data);
            } catch (e) {
                sessionStorage.removeItem("accessToken");
                clearUser();
                setIsLoggedIn(false);
            }
        })();
    }, [user, setUser, clearUser]);

    return (
        <BrowserRouter>
            <Routes>
                {/* 기본 경로: 로그인 상태에 따라 리다이렉트 */}
                <Route path="/" element={<Navigate to={isLoggedIn ? "/booklist" : "/login"} replace />} />
                {/* 로그인 페이지 */}
                <Route path="/login" element={<LoginPage />} />

                {/* OAuth 성공 핸들러 경로 */}
                <Route
                    path="/oauth/success"
                    element={<AuthHandler setIsLoggedIn={setIsLoggedIn} />}
                />

                {/* 보호된 라우트: 로그인한 사용자만 접근 가능 */}
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
