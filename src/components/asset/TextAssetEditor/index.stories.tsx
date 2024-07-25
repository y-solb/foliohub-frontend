import type { Meta, StoryObj } from '@storybook/react'
import { TextAssetType } from '@/types'
import { useState } from 'react'
import { fn } from '@storybook/test'
import ReactQuill from 'react-quill'
import TextEditorToolbar from '@/components/toolbar/TextEditorToolbar'
import TextAssetEditor from '.'
import 'react-quill/dist/quill.snow.css'

const meta: Meta<typeof TextAssetEditor> = {
  title: 'Asset/TextAssetEditor',
  component: TextAssetEditor,
  parameters: {
    docs: {
      subtitle:
        'TextAssetEditor은 내용을 편집할 수 있는 Asset입니다. pc에서는 hover, mobile에서는 길게 눌러 편집 모드를 사용할 수 있습니다.',
    },
  },
  argTypes: {
    asset: {
      description: 'TextAssetEditor에 들어갈 내용을 설정합니다.',
      table: {
        type: { summary: 'TextAssetType' },
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
      <div className="flex w-40 h-40 m-40">
        <Story />
        <div className="hidden">
          <ReactQuill />
          <TextEditorToolbar />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TextAssetEditor>

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
    onDelete: fn(),
    onChangeEditMode: fn(),
  },
  render: (args) => {
    const [asset, setAsset] = useState<TextAssetType>(args.asset)

    const handleUpdate = (updatedAsset: TextAssetType) => {
      setAsset(updatedAsset)
    }

    return <TextAssetEditor {...args} asset={asset} onUpdate={handleUpdate} />
  },
}
