import type { Meta, StoryObj } from '@storybook/react'
import PortfolioLayout from '.'

const meta: Meta<typeof PortfolioLayout> = {
  title: 'Layout/PortfolioLayout',
  component: PortfolioLayout,
  parameters: {
    docs: {
      subtitle: 'PortfolioLayout는 Portfolio 상세페이지 Layout입니다.',
    },
  },
  argTypes: {
    children: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof PortfolioLayout>

function SampleContent() {
  return (
    <div>
      <h1>여긴 Content를 넣어주세요.</h1>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <PortfolioLayout>
      <SampleContent />
    </PortfolioLayout>
  ),
}
