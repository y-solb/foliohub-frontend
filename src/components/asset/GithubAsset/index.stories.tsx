import type { Meta, StoryObj } from '@storybook/react'
import { GithubAssetType } from '@/types'
import GithubAsset from '.'

const meta: Meta<typeof GithubAsset> = {
  title: 'Asset/GithubAsset',
  component: GithubAsset,
  parameters: {
    docs: {
      subtitle:
        'GithubAsset은 github 잔디를 보여주는 Asset입니다. 클릭 시 해당 계정 github로 이동합니다.',
    },
  },
  argTypes: {
    asset: {
      description: 'GithubAsset에 들어갈 내용을 설정합니다.',
      table: {
        type: { summary: 'GithubAssetType' },
      },
    },
    width: {
      description: 'width를 설정합니다.',
      control: {
        min: 1,
        max: 6,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof GithubAsset>

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
  },
}
