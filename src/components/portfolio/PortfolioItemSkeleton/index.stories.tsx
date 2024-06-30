import type { Meta, StoryObj } from '@storybook/react'
import PortfolioItemSkeleton from '.'

const meta: Meta<typeof PortfolioItemSkeleton> = {
  title: 'Portfolio/PortfolioItemSkeleton',
  component: PortfolioItemSkeleton,
  parameters: {
    docs: {
      subtitle: 'PortfolioItemSkeleton는 PortfolioItemSkeleton 컴포넌트입니다.',
    },
  },
}

export default meta
type Story = StoryObj<typeof PortfolioItemSkeleton>

export const Default: Story = {}
