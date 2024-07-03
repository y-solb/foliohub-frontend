import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RecoilRoot } from 'recoil'
import useOpenConfirmModal from '@/hooks/useOpenConfirmModal'
import ConfirmModal from '.'

const meta: Meta<typeof ConfirmModal> = {
  title: 'Modal/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    docs: {
      subtitle: 'ConfirmModal는 Confirm Modal 컴포넌트입니다.',
    },
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
        <ConfirmModal />
      </RecoilRoot>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ConfirmModal>

export const Default: Story = {
  render: () => {
    const { openConfirm } = useOpenConfirmModal()

    return (
      <button
        type="button"
        onClick={() =>
          openConfirm({
            title: '정말 탈퇴하실 건가요?',
            content:
              '탈퇴와 동시에 모든 데이터는 삭제되어 복구할 수 없어요. 🥲',
            onConfirm: () => alert('탈퇴가 완료되었어요!'),
          })
        }
      >
        Open ConfirmModal
      </button>
    )
  },
}
