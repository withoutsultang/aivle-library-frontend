# 검증 기록

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
