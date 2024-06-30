import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Modal from '.'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    docs: {
      subtitle: 'Modal는 바깥 영역을 클릭하면 닫히는 Modal 컴포넌트입니다.',
    },
  },
  argTypes: {
    isOpen: {
      description: '모달의 열림/닫힘 상태를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
      },
      control: { disable: true },
    },
    isBorder: {
      description: '테두리 여부를 설정합니다.',
    },
    children: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    onClose: {
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    isBorder: true,
  },
}

export default meta
type Story = StoryObj<typeof Modal>

function Content({ onClose }: { onClose: () => void }) {
  return (
    <div style={{ padding: '24px' }}>
      <h2>Modal입니다.</h2>
      <button type="button" onClick={onClose} style={{ marginTop: '12px' }}>
        Close Modal
      </button>
    </div>
  )
}

const Template: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => {
      setIsOpen(false)
      args.onClose()
    }

    return (
      <>
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          Open Modal
        </button>
        <Modal {...args} isOpen={isOpen} onClose={handleClose}>
          <Content onClose={handleClose} />
        </Modal>
      </>
    )
  },
}

export const Default: Story = {
  ...Template,
  args: {
    isBorder: true,
  },
}
