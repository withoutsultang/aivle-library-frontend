# 📚 모두의 서재 · Frontend

> 글을 쓰고, 표지를 고르고, 나의 도서를 공개하는 창작 공간

작품을 카드 형태로 탐색하고, 본문을 읽거나 직접 도서를 작성할 수 있는 React 웹 애플리케이션입니다. 도서 작성 화면에 AI 표지 생성·선택 기능을 연결해 창작 과정에서 필요한 작업을 한곳에 모았습니다.

**KT AIVLE 팀 프로젝트 · 개발 참여: 김건우 ([withoutsultang](https://github.com/withoutsultang))**

[Backend 저장소](https://github.com/withoutsultang/aivle-library-backend) · [원본 팀 저장소](https://github.com/KT-AIVLE-School-4th-Mini-Project/FrontEnd)

## 서비스 이용 흐름

```text
네이버 로그인 → 도서 목록 탐색 → 상세 정보·본문 읽기
                         ├─ 관심 도서 추가 → 마이페이지
                         └─ 도서 작성 → AI 표지 생성·선택 → 등록
```

## 주요 화면

| 화면 | 기능 |
| --- | --- |
| 도서 목록 | 카드형 도서 목록, 정렬, 페이지 이동 |
| 도서 상세·본문 | 작품 정보 확인, 본문 읽기, 수정·삭제 진입 |
| 도서 작성 | 제목·분류·소개·본문 입력, 표지 이미지 선택, 등록·수정 |
| AI 표지 생성 | 작품 설명에 따른 표지 생성 요청과 이미지 선택 |
| 마이페이지 | 작성한 도서와 관심 도서 확인 |
| 로그인 | 네이버 로그인 연결과 인증 후 화면 이동 |

화면과 서비스 기능은 팀이 함께 구현했습니다. 김건우의 프론트엔드 참여 범위는 아래 연동·설정 작업입니다.

## 담당 역할

- **API 연결 환경 조정:** Vite 개발 서버의 프록시와 백엔드 연결 설정을 수정했습니다.
- **표지 생성 옵션 검토:** 이미지 생성 모델과 해상도 옵션을 비교하고 적용·복원하며 표지 생성 요청 설정을 조정했습니다.

백엔드에서 맡은 도서 API·검증·연동 설정 작업은 [Backend 포트폴리오](https://github.com/withoutsultang/aivle-library-backend)에서 확인할 수 있습니다. 프론트엔드의 구체적인 변경 이력은 [기여 내역](docs/CONTRIBUTIONS.md)에 정리했습니다.

## 기술 스택

| 영역 | 기술 |
| --- | --- |
| UI | React 19, JavaScript, MUI 7, Emotion |
| 라우팅·상태 | React Router 7, Context API |
| API 통신 | Axios, Fetch |
| 개발·빌드 | Vite 7 |
| 테스트 | Vitest, Testing Library |

## 구현 구조

- **공통 UI:** 도서 카드·표지·리더·페이지네이션을 컴포넌트로 분리했습니다.
- **인증 흐름:** OAuth 응답의 토큰을 처리하고 사용자 정보를 조회하며, 보호된 페이지의 접근을 제어합니다.
- **도서 작성 흐름:** 작성·수정 화면을 함께 사용하고 표지 생성 다이얼로그와 이미지 선택 상태를 관리합니다.
- **API 연결:** API 클라이언트와 공통 경로를 별도 설정 파일에서 관리합니다.

### 코드에서 살펴볼 부분

- [BookReg](src/pages/BookReg.jsx): 도서 작성·수정과 AI 표지 생성·선택 흐름
- [App](src/App.jsx): 페이지 라우팅과 OAuth 로그인 이후 처리
- [API 클라이언트](src/config/api.js): 인증 토큰을 포함한 API 요청
- [Vite 설정](vite.config.js): 로컬 API 프록시와 테스트 환경

## 프로젝트 구조

```text
src/
├── pages/        목록·상세·본문·작성·로그인·마이페이지
├── components/   도서 카드·표지·리더·헤더·페이지네이션
├── config/       API 클라이언트·공통 상수
├── store/        사용자 상태
├── assets/       아이콘
└── App.jsx       라우팅·인증 흐름
```

## 실행 방법

Node.js 22.12 이상을 기준으로 합니다.

```sh
git clone https://github.com/withoutsultang/aivle-library-frontend.git
cd aivle-library-frontend
git switch dev
npm ci --ignore-scripts
npm run dev
```

개발 서버는 `/api/v1` 요청을 `http://localhost:8080`으로 전달합니다. 로그인과 도서 API를 사용하려면 백엔드를 함께 실행해야 합니다. 표지 생성에는 별도 외부 API 설정이 필요합니다.

환경 설정, 빌드·테스트 명령과 현재 제약은 [실행 가이드](docs/RUNNING.md)에 정리했습니다.

## 관련 문서

- [개인 기여와 변경 이력](docs/CONTRIBUTIONS.md)
- [환경 설정·실행·테스트](docs/RUNNING.md)
- [제3자 자료와 의존성 고지](docs/THIRD_PARTY.md)