import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { baseUrl } from "./config/constants.jsx";

import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import BookReg from "./pages/BookReg";
import BookBody from "./pages/BookBody";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function AuthHandler({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const processed = useRef(false); // 처리 여부를 추적하기 위한 ref

    useEffect(() => {
        // 이미 처리했다면 다시 실행하지 않음
        if (processed.current) {
            return;
        }
        processed.current = true;

        // 네이버 로그인은 callbackUrl의 hash에 파라미터를 담아 리디렉션합니다.
        // 따라서 window.location.hash에서 값을 파싱해야 합니다.
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const code = params.get("code");
        const state = params.get("state");
        const accessToken = params.get("access_token");

        console.log("AuthHandler params:", { code, state, accessToken });

        const handleLoginSuccess = (token) => {
            localStorage.setItem("accessToken", token);
            setIsLoggedIn(true);
            navigate("/booklist", { replace: true });
        };

        const handleLoginFailure = (error) => {
            console.error("Login failed:", error);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
            navigate("/login", { replace: true });
        };

        if (accessToken) {
            handleLoginSuccess(accessToken);
            return;
        }

        if (code && state) {
            axios.get(`${baseUrl}/auth/naver/callback`, { params: { code, state } })
                .then(res => {
                    const { accessToken } = res.data.data;
                    if (accessToken) {
                        handleLoginSuccess(accessToken);
                    } else {
                        handleLoginFailure("Access token not found in response.");
                    }
                })
                .catch(err => {
                    console.error("An error occurred during login:", err.response ? err.response.data : err.message);
                    handleLoginFailure(err);
                });
        } else {
             handleLoginFailure("Code or state not found in callback URL.");
        }
    }, []); // 의존성 배열은 비워둠

    return <div>로그인 처리 중...</div>;
}


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('accessToken'));

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={isLoggedIn ? "/booklist" : "/login"} replace />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/api/v1/auth/naver/callback"
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
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
