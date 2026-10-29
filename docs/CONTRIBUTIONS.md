# 김건우 · 프론트엔드 기여

## 팀 프로젝트에서 맡은 일

아래는 김건우(`withoutsultang`)의 작성 커밋과 연결되는 기여입니다. 링크는 현재 공개 저장소에서 읽을 수 있는 대응 커밋을 사용합니다.

|주제|구현·변경 내용|작성 근거|
|---|---|---|
|API 연결 환경|proxy·API 기본 경로 설정 조정|[d29e94a](https://github.com/withoutsultang/aivle-library-frontend/commit/d2e3dbafeedaffe9075014ffa98f64ee8cea4eec)|
|이미지 API 연동|모델·응답 형식 변경 작업|[b1851e6](https://github.com/withoutsultang/aivle-library-frontend/commit/1e1c4187ab86844e8f4525a4e9ba9f234bed53ab)|
|생성 옵션|해상도 선택·응답 오류 처리 변경|[529ecdd](https://github.com/withoutsultang/aivle-library-frontend/commit/65779d9990ce282469859815e1d36645c9a5a4fb)|

## 협업 범위

도서·인증·UI·스토리지·조회수·인프라를 팀에서 나눠 구성했습니다. 김건우는 백엔드 API·데이터 계약·인증/인가 개선·배포 연동을 중심으로 참여했고, 프론트엔드 연결 환경과 이미지 요청 설정을 함께 다뤘습니다. S3 이미지 저장과 DynamoDB 조회수 확장, 초기 화면 컴포넌트·모니터링 구성은 팀 협업의 결과입니다.

## 2026년 10월 · 개인 공개본 고도화

이미지 저장 key·접근 URL 처리, 상태 검사·CORS, 원고 수정 흐름, 사용자 상태와 표지 fallback을 개선했습니다. 테스트·빌드·코드 검사와 CI를 함께 정리해 코드를 검토하고 다시 실행하기 쉬운 형태로 구성했습니다.

- 서비스 설계: [ARCHITECTURE.md](ARCHITECTURE.md)
- 검증 명령과 결과: [VERIFICATION.md](VERIFICATION.md)
- 팀 원본과 공개본의 이력 대응: [history-commit-map.tsv](history-commit-map.tsv)
