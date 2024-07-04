import type { Meta, StoryObj } from '@storybook/react'
import Button from '.'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      subtitle: 'Button은 기본 Button 컴포넌트입니다.',
    },
  },
  argTypes: {
    variant: {
      description: '스타일을 설정합니다.',
      table: {
        type: { summary: "'contained' | 'outlined' | 'inactive' | 'selected'" },
      },
      options: ['contained', 'outlined', 'inactive', 'selected'],
      control: { type: 'radio' },
    },
    size: {
      description: '크기를 설정합니다.',
      table: {
        type: { summary: "'md' | 'lg'" },
      },
      options: ['md', 'lg'],
      control: { type: 'radio' },
    },
    className: {
      description: '추가적인 CSS 클래스를 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
      control: { type: 'text' },
    },
    children: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const ContainedButton: Story = {
  args: {
    variant: 'contained',
    size: 'lg',
    children: 'ContainedButton',
  },
}

export const OutlinedButton: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    children: 'OutlinedButton',
  },
}
