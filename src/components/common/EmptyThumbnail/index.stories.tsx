import type { Meta, StoryObj } from '@storybook/react'
import EmptyThumbnail from '.'

const meta: Meta<typeof EmptyThumbnail> = {
  title: 'Components/EmptyThumbnail',
  component: EmptyThumbnail,
  parameters: {
    componentSubtitle:
      'EmptyThumbnail는 빈 프로필 썸네일을 나타내는 컴포넌트입니다.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '48px', height: '48px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof EmptyThumbnail>

export const Default: Story = {}
