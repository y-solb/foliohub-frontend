import type { Meta, StoryObj } from '@storybook/react'
import { GithubAssetType } from '@/types'
import { fn } from '@storybook/test'
import { useState } from 'react'
import GithubAssetEditor from '.'

const meta: Meta<typeof GithubAssetEditor> = {
  title: 'Asset/GithubAssetEditor',
  component: GithubAssetEditor,
  parameters: {
    docs: {
      subtitle:
        'GithubAssetEditor은 github 잔디를 보여주는 Asset입니다. 클릭 시 해당 계정 github로 이동합니다.',
    },
  },
  argTypes: {
    asset: {
      description: 'GithubAssetEditor에 들어갈 내용을 설정합니다.',
      table: {
        type: { summary: 'GithubAssetEditorType' },
      },
    },
    width: {
      description: 'width를 설정합니다.',
      control: {
        min: 1,
        max: 6,
      },
    },
    onUpdate: {
      description: '변경된 내용을 업데이트합니다.',
      control: false,
    },
    onDelete: {
      description: '해당 Asset을 삭제합니다.',
    },
  },
}

export default meta
type Story = StoryObj<typeof GithubAssetEditor>

const mockAsset: GithubAssetType = {
  id: '123',
  layoutId: 'abc',
  type: 'github',
  value: {
    githubId: 'y-solb',
  },
}

export const Default: Story = {
  args: {
    asset: mockAsset,
    width: 3,
    onDelete: fn(),
  },
  render: (args) => {
    const [asset, setAsset] = useState(args.asset)

    const handleUpdate = (updatedAsset: GithubAssetType) => {
      setAsset(updatedAsset)
    }

    return <GithubAssetEditor {...args} asset={asset} onUpdate={handleUpdate} />
  },
}
