import type { Meta, StoryObj } from '@storybook/react'
import HeaderSkeleton from '.'

const meta: Meta<typeof HeaderSkeleton> = {
  title: 'Header/HeaderSkeleton',
  component: HeaderSkeleton,
  parameters: {
    docs: {
      subtitle: 'HeaderSkeleton는 HeaderSkeleton 컴포넌트입니다.',
    },
  },
}

export default meta
type Story = StoryObj<typeof HeaderSkeleton>

export const Default: Story = {}
