# Negocio User Client Next.js

## 로컬에서 프로젝트 실행

```
yarn
yarn dev
```

yarn 으로 dependencies 설치후 yarn dev 로 로컬 실행

## 배포 개요

Docker-Containerize the build -> Upload to ECR -> Download Task Definition from ECS -> Update Task Definition with New Git Sha Number -> Deploy to ECS

## 테스트 배포

test branch 에 푸시후 GitHub Actions 에서 Test Build Workflow 로 Run

## 프로덕션 배포

1. test branch 를 main branch 로 merge
2. main branch 에서 tag & release 생성
3. Github Actions 자동으로 실행
