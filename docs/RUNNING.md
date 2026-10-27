# 환경 설정·실행·테스트

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


## 테스트와 현재 제약

`npm run build`와 기존 화면 테스트 3개가 통과했습니다. 빌드 시 JS 번들 크기 경고가 있습니다. `npm run lint`에는 기존 오류 5개가 남아 있습니다: `App.jsx:91`, `BookBody.test.jsx:1`, `BookBody.test.jsx:3`, `BookDetail.jsx:87`의 미사용 변수 및 `UserContext.jsx:18`의 Fast Refresh 내보내기 규칙입니다. 로그인·저장·외부 이미지 생성의 실서비스 통합 흐름은 별도 확인이 필요합니다.
