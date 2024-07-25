import type { Meta, StoryObj } from '@storybook/react'
import { ImageAssetType } from '@/types'
import { useState } from 'react'
import { fn } from '@storybook/test'
import ImageAssetEditor from '.'

const meta: Meta<typeof ImageAssetEditor> = {
  title: 'Asset/ImageAssetEditor',
  component: ImageAssetEditor,
  parameters: {
    docs: {
      subtitle:
        'ImageAssetEditor은 이미지, 제목, 내용을 편집할 수 있는 Asset입니다. pc에서는 hover, mobile에서는 길게 눌러 편집 모드를 사용할 수 있습니다.',
    },
  },
  argTypes: {
    asset: {
      description: 'ImageAssetEditor에 들어갈 내용을 설정합니다.',
      table: {
        type: { summary: 'ImageAssetType' },
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
    onUpdate: {
      description: '변경된 내용을 업데이트합니다.',
      control: false,
    },
    onDelete: {
      description: '해당 Asset을 삭제합니다.',
    },
    onChangeEditMode: {
      description: '편집 모드로 변경 시 요소가 움직이지 않도록 고정합니다.',
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
type Story = StoryObj<typeof ImageAssetEditor>

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
    width: 4,
    height: 4,
    breakpoint: 'lg',
    onDelete: fn(),
    onChangeEditMode: fn(),
  },
  render: (args) => {
    const [asset, setAsset] = useState<ImageAssetType>(args.asset)

    const handleUpdate = (updatedAsset: ImageAssetType) => {
      setAsset(updatedAsset)
    }

    return <ImageAssetEditor {...args} asset={asset} onUpdate={handleUpdate} />
  },
}
