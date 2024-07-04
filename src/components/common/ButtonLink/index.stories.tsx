import type { Meta, StoryObj } from '@storybook/react'
import ButtonLink from '.'

const meta: Meta<typeof ButtonLink> = {
  title: 'Components/ButtonLink',
  component: ButtonLink,
  parameters: {
    docs: {
      subtitle: 'ButtonLink은 버튼 형태의 Link 컴포넌트입니다.',
    },
  },
  argTypes: {
    variant: {
      description: '스타일을 설정합니다.',
      table: {
        type: { summary: "'contained' | 'outlined'" },
      },
      options: ['contained', 'outlined'],
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
    href: {
      description: '링크의 URL을 설정합니다.',
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
type Story = StoryObj<typeof ButtonLink>

export const ContainedButtonLink: Story = {
  args: {
    variant: 'contained',
    size: 'lg',
    href: '#',
    children: 'ContainedButtonLink',
  },
}

export const OutlinedButtonLink: Story = {
  args: {
    variant: 'outlined',
    size: 'md',
    href: '#',
    children: 'OutlinedButtonLink',
  },
}
