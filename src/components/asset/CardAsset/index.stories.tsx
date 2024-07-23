import type { Meta, StoryObj } from '@storybook/react'
import { CardAssetType } from '@/types'
import CardAsset from '.'

const meta: Meta<typeof CardAsset> = {
  title: 'Asset/CardAsset',
  component: CardAsset,
  parameters: {
    docs: {
      subtitle: 'CardAsset은 이미지, 제목, 내용을 보여주는 Asset입니다.',
    },
  },
  argTypes: {
    asset: {
      description: 'CardAsset에 들어갈 내용을 설정합니다.',
      table: {
        type: { summary: 'CardAssetType' },
      },
    },
    width: {
      description:
        'width를 설정합니다. width가 height보다 클 경우 가로로 정렬됩니다.',
    },
    height: {
      description:
        'height를 설정합니다. height가 width보다 클 경우 세로로 정렬됩니다.',
    },
    breakpoint: {
      description: '화면의 크기에 따른 breakpoint로 이미지 위치가 조절됩니다.',
      table: {
        type: { summary: "'md' | 'lg'" },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CardAsset>

const mockAsset: CardAssetType = {
  id: '123',
  layoutId: 'abc',
  type: 'card',
  value: {
    imageUrl:
      'https://cdn.pixabay.com/photo/2019/07/28/12/45/wave-4368685_1280.jpg',
    link: 'https://www.youtube.com/watch?v=IzLywgoyR4c',
    pos: { md: { x: 50, y: 50 }, lg: { x: 0, y: 0 } },
    title: 'Sample Title',
    description: 'Sample Description',
  },
}

export const Default: Story = {
  args: {
    asset: mockAsset,
    width: 4,
    height: 4,
    breakpoint: 'lg',
  },
}
