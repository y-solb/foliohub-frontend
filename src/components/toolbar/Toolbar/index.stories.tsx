import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import Toolbar from '.'

const meta: Meta<typeof Toolbar> = {
  title: 'Toolbar/Toolbar',
  component: Toolbar,
  parameters: {
    docs: {
      subtitle: 'Toolbar는 Asset의 종류를 선택해 추가하는 컴포넌트입니다.',
    },
  },
  argTypes: {
    onAdd: {
      description: 'Asset을 추가할때 호출되는 함수입니다.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Toolbar>

export const Default: Story = {
  args: { onAdd: fn() },
}
