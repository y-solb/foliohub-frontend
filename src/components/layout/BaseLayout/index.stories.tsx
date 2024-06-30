import type { Meta, StoryObj } from '@storybook/react'
import BaseLayout from '.'

const meta: Meta<typeof BaseLayout> = {
  title: 'Layout/BaseLayout',
  component: BaseLayout,
  parameters: {
    docs: {
      subtitle: 'BaseLayout는 기본 Layout 컴포넌트입니다.',
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
type Story = StoryObj<typeof BaseLayout>

function SampleContent() {
  return (
    <div>
      <h1>여긴 Content를 넣어주세요.</h1>
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <BaseLayout>
      <SampleContent />
    </BaseLayout>
  ),
}
