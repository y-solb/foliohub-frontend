import type { Meta, StoryObj } from '@storybook/react'
import SkeletonText from '.'

const meta: Meta<typeof SkeletonText> = {
  title: 'Components/SkeletonText',
  component: SkeletonText,
  parameters: {
    docs: {
      subtitle: 'SkeletonText는 텍스트 로딩 컴포넌트입니다.',
    },
  },
  argTypes: {
    variant: {
      description: '텍스트의 스타일을 설정합니다.',
      control: { type: 'select' },
      options: [
        'h1',
        'h2',
        'h3',
        'title',
        'subtitle1',
        'subtitle2',
        'body1',
        'body2',
        'body3',
      ],
      table: {
        type: {
          summary:
            "'h1' | 'h2' | 'h3' | 'title' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2'  | 'body3'",
        },
      },
    },
    width: {
      description: '기본값은 100%로 width를 설정합니다.',
    },
  },
  args: {
    variant: 'body1',
    width: '100%',
  },
}

export default meta
type Story = StoryObj<typeof SkeletonText>

export const Default: Story = {}
