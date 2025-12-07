import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // 사용자가 로그인하지 않았다면 로그인 페이지로 리디렉션합니다.
    return <Navigate to="/" replace />;
  }

  // 로그인했다면 요청된 컴포넌트를 렌더링합니다.
  return children;
};

export default ProtectedRoute;

