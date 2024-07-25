import type { Meta, StoryObj } from '@storybook/react'
import { ImageAssetType } from '@/types'
import ImageAsset from '.'

const meta: Meta<typeof ImageAsset> = {
  title: 'Asset/ImageAsset',
  component: ImageAsset,
  parameters: {
    docs: {
      subtitle: 'ImageAsset은 이미지를 보여주는 Asset입니다.',
    },
  },
  argTypes: {
    asset: {
      description: 'ImageAsset에 들어갈 내용을 설정합니다.',
      table: {
        type: { summary: 'ImageAssetType' },
      },
    },
    breakpoint: {
      description: '화면의 크기에 따른 breakpoint로 이미지 위치가 조절됩니다.',
      table: {
        type: { summary: "'md' | 'lg'" },
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
type Story = StoryObj<typeof ImageAsset>

const mockAsset: ImageAssetType = {
  id: '123',
  layoutId: 'abc',
  type: 'image',
  value: {
    imageUrl:
      'https://cdn.pixabay.com/photo/2019/07/28/12/45/wave-4368685_1280.jpg',
    link: 'https://www.youtube.com/watch?v=IzLywgoyR4c',
    pos: { md: { x: 50, y: 50 }, lg: { x: 0, y: 0 } },
  },
}

export const Default: Story = {
  args: {
    asset: mockAsset,
    breakpoint: 'lg',
  },
}
