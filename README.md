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

### accessToken 만료 시 refreshToken으로 재발급

- axios interceptors를 활용하여 accessToken 만료 시 401 에러를 감지하고 refreshToken으로 accessToken을 재발급 받도록 구현했습니다.
- 여러 개의 요청이 401 에러를 받는 경우 accessToken을 재발급 받는 동안 다른 요청들이 대기하도록 처리했습니다. 새로운 요청이 들어올 때마다 해당 요청을 대기하는 콜백 함수를 배열에 추가하고, accessToken이 재발급되면 대기 중인 함수들을 호출하여 다시 요청을 보내도록 구현했습니다.

### metadata

- SEO 최적화를 위해 정적 메타 데이터와 동적 메타 데이터를 추가했습니다. 포트폴리오 상세 페이지에서 각 사용자의 정보를 fetch로 동적으로 가져와 메타 데이터에 적용했습니다.

### 전역상태관리(Recoil)

- 로그인 모달을 전역에서 관리하여 로그인이 필요한 경우 바로 모달을 띄울 수 있도록 구현했습니다.
- 로그인한 사용자 정보를 전역에서 관리하여 여러 컴포넌트에서 사용할 수 있도록 했습니다.
- 활성화된 Asset의 id를 저장해 한 Asset이 활성화된 경우 다른 Asset의 활성화를 방지했습니다.
- alert 모달을 전역에서 관리하여 제목과 내용을 입력받아 바로 alert를 표시할 수 있도록 구현했습니다.

### 기타

- 반응형으로 구현하여 다양한 화면 크기에서 좋은 사용자 경험을 제공하고자 했습니다.
- 로딩 시 스켈레톤 UI를 적용했습니다.
- useInfiniteQuery와 IntersectionObserver를 활용하여 무한 스크롤을 구현했습니다.
- [react-github-calendar 라이브러리를 수정하기 위해 patch-package 사용](https://sollogging.tistory.com/78)했습니다.
- Vercel로 배포했습니다.

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
