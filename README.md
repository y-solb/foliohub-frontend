# <a href="https://www.foliohub.me"><img src="https://github.com/y-solb/foliohub-backend/assets/59462108/8f74737b-07b0-468e-aea3-acf56d8fb233" align="left" width="40" height="40"></a> Foliohub - Frontend

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fy-solb%2Ffoliohub-backend&count_bg=%23607AE9&title_bg=%236A6A6A&icon=&icon_color=%23FF0202&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

나만의 포트폴리오 만드는 서비스

### [🚀 서비스 보러가기](https://www.foliohub.me)

## 💁🏻‍♀️ 소개

![main](https://github.com/y-solb/foliohub-backend/assets/59462108/1c17f2c2-da2a-477d-b9a6-65960393bb04)
![list](https://github.com/y-solb/foliohub-backend/assets/59462108/99ca6a66-1e10-436f-87db-721045bbb44d)
![mypage](https://github.com/y-solb/foliohub-backend/assets/59462108/c5d767d8-8242-4c56-b9fb-57ab19bc45e2)
![asset](https://github.com/y-solb/foliohub-backend/assets/59462108/8be2aaf6-9b8b-4269-967b-c9393aa1a2fa)

## ⚒️ 기술 스택

- Language: Typescript
- Framework : Next.js
- Library: Recoil, React-query
- CSS: Tailwind
- Deploy: Vercel

## ✏️ 구현 사항

- 쿠키에 저장된 토큰 값을 활용하여 로그인 상태를 유지
- AccessToken 만료 시 axios interceptors에서 401 에러를 확인하고 RefreshToken으로 AccessToken 재발급
- useInfiniteQuery와 IntersectionObserver를 이용하여 무한 스크롤을 구현
- react-github-calendar 라이브러리를 수정하기 위해 patch-package 사용

## ⛳️ 실행

### 환경변수 설정

```
# .env
# DB
NEXT_PUBLIC_API_HOST=
```

### 설치 및 시작

```
npm i
npm run dev
```

## 🗂️ Repository

- [Foliohub Backend Repository](https://github.com/y-solb/foliohub-backend)
