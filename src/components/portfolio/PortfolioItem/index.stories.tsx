import type { Meta, StoryObj } from '@storybook/react'
import PortfolioItem from '.'

const meta: Meta<typeof PortfolioItem> = {
  title: 'Portfolio/PortfolioItem',
  component: PortfolioItem,
  parameters: {
    docs: {
      subtitle: 'PortfolioItem는 Portfolio의 Item 컴포넌트입니다.',
    },
  },
}

export default meta
type Story = StoryObj<typeof PortfolioItem>

export const Default: Story = {
  args: {
    portfolio: {
      id: '1',
      username: 'test',
      userJob: '프론트엔드 개발자',
      thumbnail:
        'https://i.pinimg.com/736x/53/7e/f5/537ef59499259ba707068742f91a10f8.jpg',
      displayName: '신짱구',
      shortBio: '코딩을 사랑하는 개발자입니다!',
      likeCount: 123,
      userId: 'abc123',
    },
  },
}
