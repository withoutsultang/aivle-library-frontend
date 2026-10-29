![모두의 서재](docs/assets/banner.svg)

# 모두의 서재 · Frontend

**4차의 로컬 창작 플랫폼에서 5차의 AWS 배포 환경으로 이어지는 React 서비스**

독자는 작품을 탐색하고 본문을 읽으며, 작가는 원고·소개를 작성하고 AI 표지를 선택해 도서를 공개합니다.
김건우는 백엔드 개발과 프론트 API 연결에 참여하고, **5차에는 프론트·백엔드를 아우르는 AWS 인프라 구성·환경 설정·배포 전반**을 담당했습니다. 일부 AWS 작업은 팀원과 공동 수행했습니다.

[Backend](https://github.com/withoutsultang/aivle-library-backend) · [개인 기여](docs/CONTRIBUTIONS.md) · [AWS 구성](docs/AWS_DEPLOYMENT.md) · [화면 설계](docs/ARCHITECTURE.md) · [실행](docs/RUNNING.md) · [검증](docs/VERIFICATION.md)

## 두 단계로 확장한 프로젝트

|단계|서비스와 실행 환경|김건우의 역할|
|---|---|---|
|**4차 · 로컬 플랫폼 개발**|React UI · Spring Boot API · H2 · Naver OAuth · AI 표지|백엔드 API·인증/인가 개선, 클라이언트와 API를 연결하는 개발|
|**5차 · AWS 배포·환경 구성**|S3·CloudFront 정적 배포, ALB·EC2 API 연결, AWS CI/CD|AWS 구축·배포 전반, 프론트 API 경로와 OAuth·CORS 환경 조정|

## 4차 · 로컬 창작 플랫폼의 사용자 흐름

![4차 로컬 플랫폼 구조](docs/assets/phase-04-local.png)

|화면 기능|사용자 경험|코드|
|---|---|---|
|도서 탐색|카드 목록·정렬·페이지 이동|[BookList](src/pages/BookList.jsx)|
|작품 읽기|도서 정보·소개·본문, 800자 단위 본문 탐색|[BookDetail](src/pages/BookDetail.jsx) · [BookBody](src/pages/BookBody.jsx)|
|원고 작성|제목·분류·소개·본문 작성과 등록·수정|[BookReg](src/pages/BookReg.jsx)|
|AI 표지 선택|설명·카테고리 기반 요청과 최근 3개 후보 선택|[BookReg](src/pages/BookReg.jsx)|
|로그인·작성자 흐름|네이버 로그인, 사용자 조회, 보호 경로·작성자 메뉴|[App](src/App.jsx) · [사용자 상태](src/store/UserContext.jsx)|

초기 화면과 서비스 전체는 팀의 공동 결과물입니다. 김건우의 API 연결·이미지 요청 설정 변경과 프로젝트 공통 AWS 역할은 [기여 문서](docs/CONTRIBUTIONS.md)에 나눠 정리했습니다.

## 5차 · AWS 배포와 환경 구성

4차의 로컬 서비스를 AWS에서 배포·실행하는 환경으로 확장했습니다. **김건우는 AWS 인프라 구성·환경 설정·배포 전반을 담당했고, 일부 작업은 팀원과 공동 수행했습니다.** 프론트엔드와 백엔드를 각각 배포하면서 네트워크·권한·데이터·실행 설정·배포 파이프라인을 함께 연결했습니다.

![5차 AWS 서비스 아키텍처](docs/assets/phase-05-aws.png)

|구성 영역|AWS 구성과 연결|프로젝트에서 만든 결과|
|---|---|---|
|웹 전달·API 라우팅|CloudFront · S3 · ALB|정적 화면과 `/api/v1/*` 요청을 각 origin으로 분리|
|애플리케이션 실행|VPC · EC2 · Auto Scaling Group · Target Group|여러 인스턴스로 Spring Boot를 실행하고 ALB health 경로와 연결|
|데이터 저장|RDS MySQL · S3 · DynamoDB|사용자·도서 데이터, 표지 객체, 조회수 저장을 외부 서비스로 분리|
|실행 설정·권한|SSM Parameter Store · IAM 역할|배포 서비스와 실행 환경을 연결하고 DB·JWT·OAuth 설정을 앱에 주입|
|배포·운영 관측|CodePipeline · CodeBuild · CodeDeploy · SNS · CloudWatch|테스트·빌드·승인·배포 단계와 지표·로그 관측 환경 구성|

### CI/CD 구성

![5차 프론트·백엔드 AWS CI/CD](docs/assets/phase-05-pipeline.png)

프론트엔드는 테스트·빌드 후 정적 산출물을 S3에 배포하고, 백엔드는 JAR를 생성해 CodeDeploy로 EC2 배포 그룹에 전달합니다. 수동 승인과 SNS를 연결하고 CloudWatch 지표·로그로 실행 환경을 확인하는 흐름을 구성했습니다.

자세한 구성과 기여 근거는 [AWS 배포·환경 구성](docs/AWS_DEPLOYMENT.md), [개인 기여](docs/CONTRIBUTIONS.md)에서 확인할 수 있습니다. 이미지는 5차 팀 코드·콘솔 자료를 재구성한 설명도이며, 인스턴스 개수는 구조를 보여주기 위한 예시입니다.

## 개인 공개본 고도화 · 2026년 10월

- 직접 수정 URL·새로고침에서 원고 복원, 저장 후 상세 경로 이동
- 등록·수정에 공통 인증 API 적용, 사용자 ID 기반 작성자 메뉴 표시
- 안정적인 사용자 Context·요청 취소·표지 fallback·새 URL 재시도
- 서버 API 기반 표지 생성과 세로·정사각·가로 비율 선택
- 페이지별 지연 로딩으로 메인 JavaScript 청크 **약 47.2% 축소** — [빌드 비교](docs/VERIFICATION.md)
- **화면·API 계약 테스트 10개 통과**, ESLint·테스트·빌드 GitHub Actions CI

## 기술 스택

**React 19 · JavaScript · React Router 7 · MUI 7 · Emotion · Axios · Vite 7 · Vitest · Testing Library · ESLint**

프론트 배포는 **S3 · CloudFront · CodePipeline · CodeBuild · SNS**, API 연결은 **ALB · EC2 · Spring Boot**를 사용한 5차 구성을 설명합니다.

## 빠른 시작

Node.js 22.12 이상을 사용합니다.

```bash
git clone https://github.com/withoutsultang/aivle-library-frontend.git
cd aivle-library-frontend
npm ci
npm run dev
```

개발 서버는 `/api/v1`을 `http://localhost:8080`의 백엔드로 전달합니다. 5차 AWS 구성에서는 CloudFront behavior가 API 요청을 ALB origin으로 연결합니다.
로그인·도서 저장에는 [백엔드 환경](https://github.com/withoutsultang/aivle-library-backend)이 필요하며, 현재 표지 생성은 서버에 설정된 API 키로 요청합니다.

```bash
npm run lint
npm test
npm run build
```

## 더 살펴보기

- [단계별 개인 기여와 커밋 근거](docs/CONTRIBUTIONS.md)
- [AWS 배포·프론트 API 연결](docs/AWS_DEPLOYMENT.md)
- [라우팅·상태·API 설계](docs/ARCHITECTURE.md) · [실행 가이드](docs/RUNNING.md)
- [검증 기록](docs/VERIFICATION.md) · [제3자 자료와 출처](docs/THIRD_PARTY.md)

**김건우 · [GitHub](https://github.com/withoutsultang)** | KT AIVLE 팀 프로젝트 기반 개인 포트폴리오
