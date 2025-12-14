import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * 보호된 라우트 컴포넌트
 * - 로그인 여부(isLoggedIn)를 확인하여,
 * - 로그인 안 된 경우 로그인 페이지(/)로 리다이렉트합니다.
 * - 로그인 된 경우 자식 컴포넌트(children)를 렌더링합니다.
 *
 * 프로젝트가 커지면 routes 폴더를 만드는 것도 괜찮을듯
 */
const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // 사용자가 로그인하지 않았다면 로그인 페이지로 리디렉션합니다.
    return <Navigate to="/" replace />;
  }

  // 로그인했다면 요청된 컴포넌트를 렌더링합니다.
  return children;
};

export default ProtectedRoute;

