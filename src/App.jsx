import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import BookList from "./pages/BookList";
import BookDetail from "./pages/BookDetail";
import BookReg from "./pages/BookReg";
import BookBody from "./pages/BookBody";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <BrowserRouter>
            {/*로그인 안 돼 있으면 로그인 페이지, 돼 있으면 도서 목록 페이지*/}
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <BookList />
                        ) : (
                            <LoginPage setIsLoggedIn={setIsLoggedIn} />
                        )
                    }
                />
                {/*보호된 라우트: 로그인한 사용자만 접근 가능*/}
                {/*상세페이지*/}
                <Route path="/detail/:id" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookDetail />
                    </ProtectedRoute>
                } />
                {/*등록페이지*/}
                <Route path="/bookreg" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookReg />
                    </ProtectedRoute>
                } />
                {/*수정페이지*/}
                {/*같은 폼이지만 여긴 기존 데이터를 넣어줘야 함*/}
                <Route path="/bookreg/:id" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookReg />
                    </ProtectedRoute>
                } />
                {/*본문 페이지*/}
                <Route path="/body" element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <BookBody />
                    </ProtectedRoute>
                } />
                {/*없는 주소로 갈 경우 /메인으로 다시 가게 하기*/}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App
