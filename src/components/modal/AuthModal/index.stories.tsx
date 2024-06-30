import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { RecoilRoot } from 'recoil'
import useOpenAuthModal from '@/hooks/useOpenAuthModal'
import AuthModal from '.'

const meta: Meta<typeof AuthModal> = {
  title: 'Modal/AuthModal',
  component: AuthModal,
  parameters: {
    docs: {
      subtitle: 'AuthModal는 로그인 Modal 컴포넌트입니다.',
    },
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
        <AuthModal />
      </RecoilRoot>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AuthModal>

export const Default: Story = {
  render: () => {
    const openModal = useOpenAuthModal()

    return (
      <button type="button" onClick={openModal}>
        Open AuthModal
      </button>
    )
  },
}
