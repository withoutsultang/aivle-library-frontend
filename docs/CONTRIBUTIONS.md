# 김건우 · 프론트 연결과 5차 AWS 기여

**4차의 플랫폼 개발 경험을 바탕으로, 5차에는 프론트·백엔드의 AWS 구축·환경 설정·배포 전반을 담당했습니다.** 일부 AWS 항목은 팀원과 공동 수행했습니다.

## 4차 · 로컬 플랫폼 개발에서의 역할

프로젝트의 백엔드 도서 API·DTO·Validation·JWT/작성자 인가 개선을 맡아 클라이언트가 사용할 API 계약을 구성했습니다. 초기 화면 컴포넌트와 프론트 전체는 팀이 함께 만든 결과물입니다.

## 프론트 연결·이미지 요청 설정의 작성 근거

다음은 5차 배포·연동 기간에 프론트 저장소에 남긴 변경입니다.

|작업|직접 변경한 내용|공개 커밋|
|---|---|---|
|API 연결 환경|Vite proxy·API 기본 경로 조정|[d2e3dba](https://github.com/withoutsultang/aivle-library-frontend/commit/d2e3dbafeedaffe9075014ffa98f64ee8cea4eec)|
|이미지 API 요청|모델·응답 형식 변경 작업|[1e1c418](https://github.com/withoutsultang/aivle-library-frontend/commit/1e1c4187ab86844e8f4525a4e9ba9f234bed53ab)|
|이미지 생성 옵션|해상도 선택·응답 오류 처리 변경|[65779d9](https://github.com/withoutsultang/aivle-library-frontend/commit/65779d9990ce282469859815e1d36645c9a5a4fb)|

## 5차 · AWS 인프라·환경 설정·배포 전반

**담당 범위: AWS 전반의 구축·환경 설정·배포. 수행 방식: 주요 구성을 직접 작업하고 일부 항목은 팀원과 공동 수행.**

- **웹 전달·실행 환경:** S3·CloudFront 프론트 배포와 ALB·EC2·ASG API 실행 환경 연결
- **네트워크·권한:** VPC 기반 네트워크와 배포·실행에 필요한 AWS 권한 구성
- **데이터·설정:** RDS MySQL 연결 전환, S3·DynamoDB 팀 구현 연동, Parameter Store 설정 주입
- **CI/CD:** CodePipeline·CodeBuild·CodeDeploy, 프론트/백엔드 산출물, 수동 승인·SNS 연결
- **배포 후 연결·관측:** OAuth redirect·CORS·API 경로·health 검사 조정, CloudWatch 운영 환경을 팀원과 함께 구성

**개발 코드가 AWS에서 실행되기 위한 설정·라우팅·저장·배포 경로를 함께 연결한 역할**입니다. 전체 담당 범위와 코드상 대표 작업을 함께 정리했습니다.

|대표 작업|구현·변경 내용|공개 커밋|
|---|---|---|
|빌드·테스트 명세|Java corretto17, `clean test build`, JAR artifact와 테스트 환경 설정 작성|[36d9432](https://github.com/withoutsultang/aivle-library-backend/commit/36d943279d91b985d3ac33a847e8fda39c8be102)|
|배포 상태 검사|health Controller·검사 URL·Spring Security 허용 경로 정렬|[b9d18af](https://github.com/withoutsultang/aivle-library-backend/commit/b9d18af415e7e684267a11e6a26de54f930a6c56)|
|OAuth 배포 주소|로그인 callback의 frontend URL 외부화|[b20b668](https://github.com/withoutsultang/aivle-library-backend/commit/b20b6682331931aebd735e4ad1b52ad02d69adcd)|
|CloudFront CORS|CloudFront 배포 origin에 맞춰 허용 출처 조정|[f575a70](https://github.com/withoutsultang/aivle-library-backend/commit/f575a70f1144b77dd2e7d237cd419fffa06b56e3)|
|ALB CORS|ALB 연결 환경에 맞춰 허용 출처 조정|[95f1713](https://github.com/withoutsultang/aivle-library-backend/commit/95f1713436579409db2febf65f614315de8c9d2a)|
|RDS 연결 전환|H2 runtime에서 MySQL connector·환경변수 datasource로 전환|[81c352b](https://github.com/withoutsultang/aivle-library-backend/commit/81c352b6fcb1131564b09a3c56183a558fafc666)|
|SSM·실행 파일|Parameter Store 읽기·필수 변수 검사·Java 설정 주입, `app.jar` 고정|[13d078c](https://github.com/withoutsultang/aivle-library-backend/commit/13d078cf8be52d26e08877b44cb2c43547e67a89)|

상세 구성은 [AWS_DEPLOYMENT.md](AWS_DEPLOYMENT.md), 전체 구조는 [ARCHITECTURE.md](ARCHITECTURE.md)에서 볼 수 있습니다.

## 프로젝트를 연결한 역할

정적 프론트 배포, API 라우팅, OAuth redirect·CORS, 백엔드 실행·설정 주입을 함께 다루며 **사용자 화면에서 AWS 실행 환경까지 이어지는 연결 작업**을 수행했습니다. 화면 전체와 S3·DynamoDB 기능 코드·모니터링에는 팀원의 구현과 공동 작업이 포함됩니다.

## 개인 공개본 고도화 · 2026년 10월

수정 URL 직접 접근·새로고침, 공통 인증 API, 사용자 Context, 요청 취소, 표지 fallback과 서버 기반 표지 생성을 개선했습니다. 페이지별 지연 로딩으로 메인 JS 청크를 약 47.2% 축소했고 화면·API 계약 테스트 10개와 ESLint·빌드 CI를 구성했습니다. 4·5차 프로젝트 당시 작업과 구분한 후속 개선입니다.

- [검증 기록](VERIFICATION.md)
- [팀 원본·공개본의 커밋 대응](history-commit-map.tsv)
