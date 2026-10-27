# 모두의 서재 — Frontend

글을 집필하고 도서 형태로 공개하는 창작 플랫폼의 프론트엔드입니다. **KT AIVLE 팀 프로젝트**의 결과물을 개인 포트폴리오 검토용 독립 저장소로 정리했습니다. 화면과 기능 전체를 개인 단독 성과로 표현하지 않습니다.

- 원본: [KT-AIVLE-School-4th-Mini-Project/FrontEnd](https://github.com/KT-AIVLE-School-4th-Mini-Project/FrontEnd)
- 백엔드: [aivle-library-backend](https://github.com/withoutsultang/aivle-library-backend)
- 기준 브랜치: `dev`

## 목적과 기능

도서 목록·상세·본문 읽기·등록·수정, 관심 도서와 마이페이지, 네이버 로그인 연결을 제공합니다. 도서 등록 화면에는 설명을 바탕으로 표지를 생성하고 선택하는 UI가 있습니다. 외부 서비스의 현재 지원 여부나 실동작을 이번 작업에서 확인한 것은 아닙니다.

## 기술 스택

React 19, Vite 7, JavaScript, React Router 7, MUI 7, Emotion, Axios, Vitest·Testing Library, ESLint를 사용합니다. 정확한 설치 버전은 `package-lock.json`, 실행 명령은 `package.json`을 기준으로 합니다.

## 구조

```text
src/
  App.jsx             라우팅
  pages/              BookList·BookDetail·BookBody·BookReg·LoginPage·MyPage
  components/         도서 카드·표지·리더·헤더·페이지네이션·접근 제어
  config/             API 클라이언트·상수
  store/              사용자 컨텍스트
  assets/             아이콘
vite.config.js        로컬 API 프록시·테스트 설정
```

## 실행

Node.js 22.12 이상을 기준으로 다음 명령을 사용합니다. 검증 환경은 Node.js 24.14.0입니다.

```sh
git clone https://github.com/withoutsultang/aivle-library-frontend.git
cd aivle-library-frontend
git switch dev
npm ci --ignore-scripts
npm run dev
```

기본 브랜치의 프론트엔드는 `.env`를 요구하지 않습니다. API 기준 경로는 `/api/v1`이며 Vite 개발 서버가 이를 `http://localhost:8080`으로 전달합니다. 정상 API 기능에는 백엔드와 DB·OAuth·AWS 설정이 필요합니다.

```sh
npm run build
npm test
npm run lint
npm run preview
```

`preview`는 빌드 결과 확인용입니다. 개발 서버의 API 프록시가 배포 환경에도 자동으로 제공된다고 가정하면 안 됩니다. 운영 환경에는 `/api/v1` 연결과 SPA 라우팅 설정을 별도로 준비해야 합니다.

표지 생성 화면은 사용자가 입력한 API 키로 브라우저에서 외부 이미지 API를 직접 호출하는 원본 구현입니다. 키를 README·소스·스크린샷에 넣지 마세요. 이 경로는 유료 API를 사용할 수 있으며, 이번 검증에서는 호출하지 않았습니다. 공개 데모 제공 여부와 키 취급 방식은 별도 검토 항목입니다. 코드 기능은 변경하지 않았습니다.

## 개인 기여의 근거

원본의 `withoutsultang` 작성 커밋에는 프록시 설정 변경(`d29e94a`), 표지 생성 모델·크기 선택 관련 변경(`529ecdd`, `b1851e6`) 및 일부 변경을 되돌린 기록(`77ba70b`, `b20171d`)이 있습니다. 따라서 이 이력만으로 현재 화면 전체나 AI 표지 기능 전체를 개인 성과로 주장하지 않습니다. 본인 담당 업무와 최종 반영 범위는 추가 확인 후 보완할 수 있습니다.

## 검증과 공개 상태

2026-10-27 기준 빌드 성공, 기존 테스트 3개 통과. 번들 크기 경고가 있으며 `lint`는 기존 오류 5개로 실패했습니다: `App.jsx`·`BookDetail.jsx`·테스트의 미사용 변수, `UserContext.jsx`의 Fast Refresh 내보내기 규칙입니다. 이 정리 작업에서는 기능 코드와 기존 오류를 수정하지 않았습니다.

원본 브랜치 6개와 커밋 100개의 작성자·커미터·날짜·메시지·부모 순서를 보존했습니다. 과거 배포 서버 주소를 예시값으로 바꾸고 기록을 재작성하여 과거 파일 객체 2개와 커밋 해시 95개가 바뀌었습니다. 기존 커밋 서명 40개는 제거됐습니다. 대응표는 `docs/history-commit-map.tsv`에 있습니다. 원본 태그는 없습니다. 전체 Git 객체와 메타데이터에 대한 별도 패턴 검사 및 Gitleaks 검사를 수행했으며 고정 API 비밀키는 발견되지 않았습니다. 과거 로그인 코드에는 네이버 클라이언트 ID가 포함돼 있습니다. 이는 클라이언트 비밀키와 구분되는 식별자입니다. 외부 인증 앱 소유권·리디렉션 설정은 공개 전 확인 대상입니다.

교육기관·팀 및 이미지·샘플 데이터·작성자 정보의 공개 허용 여부는 저장소 소유자의 확인을 근거로 기록했습니다. 원본에는 프로젝트 LICENSE가 없어 임의의 라이선스를 추가하지 않았습니다. 제3자 의존성과 외부 자료에는 각각의 조건이 적용됩니다.

이 저장소는 비공개 검토본으로 준비됐으며 Public 전환에는 별도 검토·승인이 필요합니다. Issues, PR 대화·리뷰, Actions 실행 기록·비밀값·설정, 배포 리소스는 Git 기록 복사로 이전되지 않습니다. 로그인·도서 저장·관심 도서·유료 이미지 생성의 실서비스 통합 검증은 수행하지 않았습니다.
