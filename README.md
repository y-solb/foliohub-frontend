# <a href="https://www.foliohub.me"><img src="https://github.com/y-solb/foliohub-backend/assets/59462108/8f74737b-07b0-468e-aea3-acf56d8fb233" align="left" width="40" height="40"></a> Foliohub - Frontend

[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fy-solb%2Ffoliohub-backend&count_bg=%23607AE9&title_bg=%236A6A6A&icon=&icon_color=%23FF0202&title=hits&edge_flat=false)](https://hits.seeyoufarm.com)

나만의 포트폴리오를 만들고 다른 사람들과 공유할 수 있는 서비스

## 💁🏻‍♀️ 소개

![main](https://github.com/y-solb/foliohub-backend/assets/59462108/1c17f2c2-da2a-477d-b9a6-65960393bb04)
![list](https://github.com/y-solb/foliohub-backend/assets/59462108/99ca6a66-1e10-436f-87db-721045bbb44d)
![mypage](https://github.com/y-solb/foliohub-backend/assets/59462108/c5d767d8-8242-4c56-b9fb-57ab19bc45e2)
![asset1](https://github.com/y-solb/foliohub-backend/assets/59462108/d06a3055-d4b5-41b5-ba12-4afaf1ec6ac9)
![experience](https://github.com/y-solb/foliohub-backend/assets/59462108/1f2ff8a8-b5c8-4bb1-adce-7e4637ca072d)

### [🚀 서비스 보러가기](https://www.foliohub.me)

### [👩‍🎨 Storybook 보러가기](https://6682172b6c9ea6c19209ec95-zmixyhstdz.chromatic.com/?path=/docs/configure-your-project--docs)

로그인 없이 체험 코드를 입력하고 체험해 볼 수 있어요.

```
체험코드 : HelloWorld
```

## ⚒️ 기술 스택

- Language: `Typescript`
- Framework : `Next.js`
- Library: `Recoil`,` React-query`
- CSS: `Tailwind`
- Deploy: `Vercel`
- Tools: `Storybook`

## ✏️ 구현 사항

**accessToken 만료 시 refreshToken으로 재발급**

- `axios interceptors`를 활용하여 accessToken 만료 시 401 에러를 감지하고, refreshToken으로 accessToken을 재발급 받도록 구현했습니다.
- 여러 개의 요청이 401 에러를 받는 경우, accessToken을 재발급 받는 동안 다른 요청들이 대기하도록 처리했습니다. 새로운 요청이 들어올 때마다 해당 요청을 대기하는 콜백 함수를 배열에 추가하고, accessToken이 재발급되면 대기 중인 함수들을 호출하여 다시 요청을 보내도록 구현했습니다.

**React-query**

- [서버에서 데이터를 prefetch해서 SSR](https://sollogging.tistory.com/88)으로 구현했습니다. 기존 CSR 페이지를 SSR으로 리팩토링한 후, Lighthouse 결과를 비교했을 때 LCP가 6.3초에서 0.7초로 개선되어 Performance 점수가 향상되었습니다. LCP는 페이지의 주요 콘텐츠가 얼마나 빨리 표시되는지를 나타내는 지표로, SSR을 통해 사용자에게 초기 페이지 로드 시 완성된 HTML을 빠르게 전달해 사용자 경험을 개선할 수 있었습니다.

  왼쪽은 CSR, 오른쪽은 SSR의 Lighthouse 측정 결과입니다. ![SSR](https://github.com/y-solb/foliohub-frontend/assets/59462108/e319729f-dbf0-4817-acfa-f2eaf4dfd0b5)

- 로그인 된 사용자 정보를 관리할 때, `staleTime`을 `Infinity`로 설정하여 이전의 데이터를 재사용했습니다. 사용자 정보가 변경되거나 로그아웃 시에는 쿼리를 무효화하여 최신 데이터를 다시 받아오도록 구현했습니다.
- 낙관적인 업데이트를 통해 좋아요 클릭 시 UI에 바로 반영했습니다. 만약 에러 발생 시 이전 상태로 롤백 시킵니다. 서버 응답 후에는 쿼리를 무효화시켜 최신 데이터를 새로 받아왔습니다.
- `useInfiniteQuery`와 `Intersection Observer`를 이용하여 무한 스크롤을 구현했습니다.

**metadata**

- SEO를 위해 정적 메타 데이터와 동적 메타 데이터를 추가했습니다. 포트폴리오 상세 페이지에서 각 사용자의 정보를 `fetch`로 동적으로 가져와 메타 데이터에 적용했습니다.

**next/dynamic**

- react-quill 라이브러리를 `dynamic import`을 이용하여 필요시 동적으로 로드하도록 구현하였습니다. 이를 통해 텍스트 편집이 필요할 때만 리소스를 로드함으로써 초기 로딩 시간을 효과적으로 단축하였습니다.

**middleware**

- middleware를 통해 특정 페이지 접근 시 권한을 확인하고, 권한이 없는 경우 홈으로 리다이렉트 처리했습니다.

**next/image**

- [next/image를 활용하여 이미지 최적화](https://sollogging.tistory.com/86)를 진행했습니다. 이를 통해 이미지 형식을 webp로 변환하고 이미지를 캐싱 할 수 있었습니다. 또한, 리스트 등에서는 lazy loading을 적용하고, 페이지 로드 시 초기에 화면에 나타나야 하는 이미지에 대해서는 priority를 true로 설정하여 우선적으로 로딩시켰습니다. 이러한 작업으로 인해 Lighthouse의 Performance 점수가 향상되었습니다. (포트폴리오 상세페이지: 69점 -> 99점)

**NotFound와 Error 페이지 커스텀**

- [NotFound와 Error 페이지를 커스텀](https://sollogging.tistory.com/84)으로 구현하여 사용자의 이탈을 방지하고 올바른 경로를 안내하고자 했습니다.

**배포**

- [서버리스와 전통적인 서버 배포 방식을 비교](https://sollogging.tistory.com/93)하면서, 각 방식의 차이점을 공부했습니다. Vercel과 같은 서버리스는 개발과 배포가 간편하다는 장점이 있지만, 사용하지 않다가 다시 요청이 들어올 때 서비스를 활성화하는 데 시간이 걸리는 Cold Start(초기 지연 현상) 문제가 있을 수 있습니다. 반면, EC2 같은 전통적인 서버 방식은 인스턴스가 한 번 시작되면 계속 실행되므로 Cold Start 문제가 발생하지 않습니다. 그러나 EC2는 인스턴스 설정과 관리가 복잡하다는 단점이 있습니다.
- 개발과 배포의 간편함과 현재 Cold Start 현상이 크게 문제되지 않는 점을 고려해, Vercel에 배포하고 있습니다.

**기타**

- [react-github-calendar 라이브러리를 수정하기 위해 patch-package 사용](https://sollogging.tistory.com/78)했습니다.
- 이미지가 원본 비율을 유지하면서 틀 안에 맞추어 표시되다 보니 일부 부분이 잘리는 경우가 있었습니다. 이를 보완하기 위해 사용자가 이미지를 조절할 수 있는 크롭 기능을 추가했습니다.
- 반응형으로 구현하여 다양한 화면 크기에서 좋은 사용자 경험을 제공하고자 했습니다.

## ⛳️ 실행

### 환경변수 설정

```
# .env
# API
NEXT_PUBLIC_API_HOST=
```

### 설치 및 시작

```
npm i
npm run dev
```

## 🗂️ 관련 링크

- [Foliohub Backend Repository](https://github.com/y-solb/foliohub-backend)
- [1차 완성 회고](https://sollogging.tistory.com/83)
