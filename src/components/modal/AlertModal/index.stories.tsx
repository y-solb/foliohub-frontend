import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RecoilRoot } from 'recoil'
import useOpenAlertModal from '@/hooks/useOpenAlertModal'
import AlertModal from '.'

const meta: Meta<typeof AlertModal> = {
  title: 'Modal/AlertModal',
  component: AlertModal,
  parameters: {
    docs: {
      subtitle: 'AlertModal는 Alert Modal 컴포넌트입니다.',
    },
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
        <AlertModal />
      </RecoilRoot>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AlertModal>

export const Default: Story = {
  render: () => {
    const { openAlert } = useOpenAlertModal()

    return (
      <button
        type="button"
        onClick={() => openAlert('제목', '내용을 작성해 주세요.')}
      >
        Open AlertModal
      </button>
    )
  },
}
