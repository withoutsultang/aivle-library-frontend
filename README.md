# 📚 모두의 서재

> 누구나 작가가 되어 자유롭게 글을 집필하고 공개할 수 있는 창작 플랫폼, 
'모두의 서재'의 프론트엔드 리포지토리입니다.
> 

본 프로젝트는 직관적인 글쓰기 경험과 AI 표지 생성 기능을 통해 창작자가 자신의 이야기에 가장 어울리는 이미지를 쉽게 찾을 수 있도록 돕는 UI를 제공합니다.

## 🛠 Tech Stack

| Category        | Technology        |
| --------------- | ----------------- |
| **Framework**   | React · Vite      |
| **Language**    | JavaScript        |
| **Styling**     | MUI (Material UI) |
| **HTTP Client** | Axios             |

🏗 System Architecture & Component Structure

<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/9443225b-ed36-44bb-a53c-c22de7b3e46b" />

> 사용자 경험(UX) 중심의 페이지 구성과 컴포넌트 재사용성을 고려한 구조입니다.

```
src
├─ App.jsx              # 라우팅 및 전역 레이아웃
├─ pages
│   ├─ MainPage         # 도서 목록, 검색, 페이지네이션
│   ├─ NewBookPage      # 도서 등록 폼 & AI 표지 생성기
│   └─ BookDetailPage   # 도서 상세 보기, 수정/삭제 액션
├─ components
│   ├─ common           # Button, Input, Modal 등 공통 컴포넌트
│   ├─ book             # BookCard, BookForm
│   └─ auth             # LoginButton (Naver)
└─ api                  # Axios 인스턴스 및 API 호출 함수 모음
```

## ✨ Key Features (UI/UX)

### 1. AI 표지 생성 (AI Cover Generator)

- **생성 플로우**: 도서 등록 화면에서 버튼 클릭 시 AI가 책의 분위기에 맞는 표지 이미지를 생성합니다.
- **선택 및 저장**: 사용자는 생성된 이미지 중 마음에 드는 1장을 선택하며, 최종 등록 시 해당 이미지가 서버에 저장됩니다.

### 2. 사용자 경험 (UX)

- **도서 목록 탐색**: 카드 형태의 UI(`BookCard`)로 도서를 시각적으로 탐색하며, 최신순/조회수순 등 다양한 정렬을 지원합니다.
- **반응형 디자인**: 다양한 디바이스 환경을 고려한 MUI 기반 레이아웃을 제공합니다.
- **관심 도서**: 마음에 드는 책을 보관함에 담아 언제든 다시 볼 수 있습니다.

### 3. 인증 및 보안

- **소셜 로그인**: 네이버 아이디로 간편하게 로그인하며, JWT 토큰을 로컬 스토리지/쿠키에 안전하게 관리합니다.
- **접근 제어**: 글 작성, 수정, 삭제 페이지 접근 시 로그인 상태를 확인하고 비인가 사용자를 리다이렉트합니다.

## 🚀 Getting Started

### Prerequisites

- Node.js
- NPM

### Installation & Run

*참고 **12/09일 기준으로 프런트는 env 파일이 필요 없습니다.**

1. **Clone the repository**
    
    ```
    git clone https://github.com/KT-AIVLE-School-4th-Mini-Project/FrontEnd.git
    ```
    
2. **Install Dependencies**
    
    ```
    npm install
    ```
    
3. **Run Development Server**
    
    ```
    npm run dev
    ```
    

## 📂 Documentation

더 자세한 문서는 /docs 폴더를 참고해주세요.
