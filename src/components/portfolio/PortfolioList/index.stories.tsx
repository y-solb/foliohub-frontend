import type { Meta, StoryObj } from '@storybook/react'
import PortfolioList from '.'

const meta: Meta<typeof PortfolioList> = {
  title: 'Portfolio/PortfolioList',
  component: PortfolioList,
  parameters: {
    docs: {
      subtitle: 'PortfolioList는 PortfolioList 컴포넌트입니다.',
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  argTypes: {
    isLoading: {
      description: '로딩 상태를 설정합니다.',
    },
    isFetchingNextPage: {
      description: '다음 페이지 로딩 상태를 설정합니다.',
    },
    loaderRef: {
      description: '다음 페이지 로딩 상태를 설정합니다.',
    },
  },
}

export default meta
type Story = StoryObj<typeof PortfolioList>

export const Default: Story = {
  args: {
    isLoading: false,
    isFetchingNextPage: false,
    portfolios: [
      {
        id: '1',
        username: 'test1',
        userJob: '프론트엔드 개발자',
        thumbnail: 'https://i.pravatar.cc/300?img=1',
        displayName: '김프로',
        shortBio: 'React와 Vue.js를 사랑하는 프론트엔드 개발자입니다!',
        likeCount: 123,
        userId: 'abc1',
      },
      {
        id: '2',
        username: 'test2',
        userJob: '자바 개발자',
        thumbnail: '',
        displayName: '박자바',
        shortBio: 'Spring Boot와 JPA를 주로 사용합니다.',
        likeCount: 22,
        userId: 'abc2',
      },
      {
        id: '3',
        username: 'test3',
        userJob: '웹 개발자',
        thumbnail: 'https://i.pravatar.cc/300?img=9',
        displayName: '이웹',
        shortBio:
          '풀스택 웹 개발자입니다. 프론트엔드와 백엔드를 모두 다룹니다.',
        likeCount: 33,
        userId: 'abc3',
      },
      {
        id: '4',
        username: 'test4',
        userJob: '웹 디자이너',
        thumbnail: 'https://i.pravatar.cc/300?img=10',
        displayName: '최디자',
        shortBio: '사용자 경험을 최우선으로 생각하는 웹 디자이너입니다.',
        likeCount: 44,
        userId: 'abc4',
      },
      {
        id: '5',
        username: 'test5',
        userJob: '그래픽 디자이너',
        thumbnail: 'https://i.pravatar.cc/300?img=5',
        displayName: '정그래',
        shortBio: '포토샵과 일러스트레이터를 능숙하게 다룹니다.',
        likeCount: 5,
        userId: 'abc5',
      },
      {
        id: '6',
        username: 'test6',
        userJob: '머신러닝 엔지니어',
        thumbnail: 'https://i.pravatar.cc/300?img=12',
        displayName: '홍머신',
        shortBio:
          '데이터 과학과 인공지능에 열정을 가진 머신러닝 엔지니어입니다.',
        likeCount: 6,
        userId: 'abc6',
      },
      {
        id: '7',
        username: 'test7',
        userJob: 'iOS 개발자',
        thumbnail: 'https://i.pravatar.cc/300?img=7',
        displayName: '김스위',
        shortBio: 'Swift와 Objective-C로 iOS 앱을 개발합니다.',
        likeCount: 7,
        userId: 'abc7',
      },
      {
        id: '8',
        username: 'test8',
        userJob: '제품 디자이너',
        thumbnail: 'https://i.pravatar.cc/300?img=8',
        displayName: '조제품',
        shortBio: '창의적이고 혁신적인 제품 디자인을 추구합니다.',
        likeCount: 8,
        userId: 'abc8',
      },
    ],
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}
