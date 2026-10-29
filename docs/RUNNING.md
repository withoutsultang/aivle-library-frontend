# 환경 설정과 실행

Node.js 22.12 이상을 설치합니다.

```bash
npm ci
npm run dev
```

로컬 API는 `/api/v1` → `http://localhost:8080`으로 연결합니다. 로그인과 도서 저장에는 백엔드 환경이 필요합니다.
API 주소를 분리할 때 `.env.example`을 참고해 `VITE_API_BASE_URL`을 설정합니다.

```bash
npm run lint
npm test
npm run build
npm run preview
```

`preview`도 로컬 백엔드 proxy를 지원합니다. S3/CloudFront 또는 다른 정적 호스팅에 배포할 때는 `/api/v1` origin과 SPA의 index.html fallback을 구성합니다. 프론트 배포용 CodeBuild 명세는 `buildspec.yml`에 있습니다.

표지 생성은 인증된 API를 통해 서버에서 처리합니다. `OPENAI_API_KEY`는 백엔드 환경변수로 설정하며 프론트엔드에 입력하거나 빌드에 포함하지 않습니다. 테스트에서는 실제 유료 API 요청을 실행하지 않습니다.
