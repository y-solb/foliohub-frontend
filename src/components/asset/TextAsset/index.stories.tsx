import type { Meta, StoryObj } from '@storybook/react'
import { TextAssetType } from '@/types'
import TextAsset from '.'
import 'react-quill/dist/quill.snow.css'

const meta: Meta<typeof TextAsset> = {
  title: 'Asset/TextAsset',
  component: TextAsset,
  parameters: {
    docs: {
      subtitle: 'TextAsset은 텍스트를 보여주는 Asset입니다.',
    },
  },
  argTypes: {
    asset: {
      description: 'TextAsset에 들어갈 내용을 설정합니다.',
      table: {
        type: { summary: 'TextAssetType' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex w-40 h-40">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TextAsset>

const mockAsset: TextAssetType = {
  id: '123',
  layoutId: 'abc',
  type: 'content',
  value: {
    content: '<p>안녕하세요!</p>',
  },
}

export const Default: Story = {
  args: {
    asset: mockAsset,
  },
}
