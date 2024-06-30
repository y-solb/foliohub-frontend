import type { Meta, StoryObj } from '@storybook/react'
import Logo from '.'

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    docs: {
      subtitle: 'Logo는 기본 로고를 나타내는 컴포넌트입니다.',
    },
  },
  argTypes: {
    size: {
      description: '로고의 크기를 설정합니다.',
      table: {
        type: { summary: "'s' | 'l'" },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {
  args: {
    size: 'l',
  },
}

export const SmallLogo: Story = {
  args: {
    size: 's',
  },
}
