# 검증 기록

## 2026-11-03 · 로컬 데모와 실제 API·SQL 통합 검증

|검증|확인 결과|
|---|---|
|Playwright Chromium 브라우저 E2E|**6개 통과** · 등록·수정·본문·권한·입력 검증·삭제|
|Spring·Security·JPA·H2 통합 테스트|**3개 통과** · 관계형 행 생성·변경·삭제와 거부 요청의 원문 유지|
|기존 단위·컴포넌트 테스트|백엔드 **26개**, 프론트 **10개** 통과|
|데모 분리|운영 JAR의 데모·DB 관측·H2·Mockito 제외, 운영 프론트의 데모 세션·표지 UI 제외 검사|
|시연 실행|등록·수정 SQL 확인을 포함한 **1개 녹화 시나리오** 통과, 실제 화면 8장·WebM·MP4·GIF|

상세 실행과 범위는 [DEMO.md](DEMO.md)에서 확인합니다. 브라우저의 CRUD 응답은 가짜 응답으로 대체하지 않으며, 독립된 SQL 조회로 저장 결과를 확인합니다. 네이버·OpenAI·AWS는 로컬 어댑터로 분리하고 H2를 사용한 검증이며, 운영 클라우드 검증과 구분합니다.

---


## 2026-11-02 · AWS 인프라 연결

프론트 배포 경로·SPA 라우팅·API 캐시 분리를 포함한 [Terraform 검증](https://github.com/withoutsultang/aivle-library-backend/blob/dev/docs/VERIFICATION.md)을 추가했습니다. 프론트의 AWS CodeBuild 명세는 Node.js 22와 `npm ci`로 맞췄습니다. AWS 계정의 실제 배포 완료와 모의 테스트를 구분합니다.

---

2026-10-29 · 개인 공개본 고도화 검증

## 코드 검사·테스트·빌드

|명령|결과|
|---|---|
|`npm run lint`|ESLint 통과|
|`npm test`|4개 파일 · **10개 테스트 통과**|
|`npm run build`|Vite 프로덕션 빌드 성공|

본문 페이지 분할 3개, 직접 수정 URL·저장 후 이동 2개, 이미지 fallback·새 URL 재시도 2개, 표지 생성 서버 API 계약·오류 처리 3개를 검증했습니다. API는 테스트 대역으로 대체했으며 유료 이미지 생성 호출은 실행하지 않습니다.

## 번들 구성

페이지를 `React.lazy`로 나눠 메인 JavaScript 청크를 **509.22 kB → 269.04 kB(약 47.2% 감소)**로 분리했습니다. gzip 기준 메인 청크는 163.83 kB → 89.39 kB입니다. 동일한 로컬 의존성과 기본 빌드 설정에서 변경 전·후 Vite 출력으로 비교했습니다.

이 수치는 메인 청크 크기 비교입니다. 화면별 추가 청크는 각 경로에서 로드되며, 전체 전송량이나 사용자 체감 속도 측정값을 의미하지 않습니다.

## 자동 검사

[CI workflow](../.github/workflows/ci.yml)는 push·pull request에서 의존성 설치, ESLint, Vitest, 프로덕션 빌드를 실행합니다.
[실행 기록](https://github.com/withoutsultang/aivle-library-frontend/actions/workflows/ci.yml)
