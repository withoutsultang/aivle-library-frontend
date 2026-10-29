import './App.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, lazy, Suspense } from "react";

const BookList = lazy(() => import("./pages/BookList.jsx"));
const BookDetail = lazy(() => import("./pages/BookDetail.jsx"));
const BookReg = lazy(() => import("./pages/BookReg.jsx"));
const BookBody = lazy(() => import("./pages/BookBody.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const MyPage = lazy(() => import("./pages/MyPage.jsx"));
import ProtectedRoute from "./components/ProtectedRoute";

/**
 * AuthHandler 컴포넌트
 * - OAuth 로그인 리다이렉트 처리 컴포넌트입니다.
 * - 백엔드에서 전달된 토큰을 파싱하여 세션 스토리지에 저장하고,
 * - 로그인 상태를 업데이트한 후 메인 페이지로 이동합니다.
 */

import api from "./config/api.js";
import { useUser } from "./store/useUser.js";

//로그인
function AuthHandler({ setIsLoggedIn }) {
    const navigate = useNavigate();
    const processed = useRef(false);

    const { setUser } = useUser();

    useEffect(() => {
        //한번 실행시 재진입 방지
        if (processed.current) return;
        processed.current = true;

        //URL에서 토큰 파싱
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        if (token) window.history.replaceState({}, "", window.location.pathname);

        //로그인 성공
        const handleLoginSuccess = async (token) => {
            try {
                //토큰 세션스토리지에 저장
                sessionStorage.setItem("accessToken", token);
                setIsLoggedIn(true);

                //사용자 정보 조회 및 저장
                const res = await api.get("/me");
                setUser(res.data.data); //

                //메인 페이지로 이동
                navigate("/booklist", { replace: true });
            } catch (e) {
                console.error("me 호출 실패:", e);
                setIsLoggedIn(false);
                sessionStorage.removeItem("accessToken");
                alert("로그인 처리 중 오류가 발생했습니다.");
                navigate("/login", { replace: true });
            }
        };

        //토큰이 있으면 handleLoginSuccess() 실행
        if (token) handleLoginSuccess(token);
        //없으면 로그인 페이지로 이동
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
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!sessionStorage.getItem("accessToken"));
    const { user, setUser, clearUser } = useUser();

    useEffect(() => {
        //세션스토리지에 저장된 토큰 가져오기
        const token = sessionStorage.getItem("accessToken");
        if (!token || user) return;

        //유저 정보 가져오기
        async function fetchUser() {
            try {
                const res = await api.get("/me");
                setUser(res.data.data);
            } catch {
                sessionStorage.removeItem("accessToken");
                clearUser();
                setIsLoggedIn(false);
            }
        }

        fetchUser();
    }, [user, setUser, clearUser]);

    return (
        <Suspense fallback={<div role="status">서재를 불러오는 중...</div>}>
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
                {/* 도서 목록 페이지 */}
                <Route path="/booklist" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookList />
                    </ProtectedRoute>
                } />
                {/* 도서 상세 페이지 */}
                <Route path="/detail/:id" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookDetail />
                    </ProtectedRoute>
                } />
                {/* 도서 등록 페이지 */}
                <Route path="/bookreg" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookReg />
                    </ProtectedRoute>
                } />
                {/* 도서 수정 페이지 (등록과 같은 페이지 활용) */}
                <Route path="/bookreg/:id" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookReg />
                    </ProtectedRoute>
                } />
                {/* 도서 본문 페이지 */}
                <Route path="/body" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookBody />
                    </ProtectedRoute>
                } />
                {/* 마이 페이지 */}
                <Route path="/mypage" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <MyPage />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
        </Suspense>
    );
}

export default App;
