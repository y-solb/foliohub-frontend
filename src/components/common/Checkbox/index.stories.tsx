import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Checkbox from '.'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      subtitle: 'Checkbox은 Checkbox 컴포넌트입니다.',
    },
  },
  argTypes: {
    id: {
      description: 'id을 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    name: {
      description: '이름을 설정합니다.',
      table: {
        type: { summary: 'string' },
      },
    },
    value: {
      description: '체크 여부를 설정합니다.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      table: {
        type: { summary: '(e: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    onBlur: {
      table: {
        type: { summary: '(e: React.ChangeEvent<HTMLInputElement>) => void' },
      },
    },
    children: {
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Checkbox>

const Template: Story = {
  render: (args) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleChange = () => {
      setIsChecked(!isChecked)
    }

    return (
      <Checkbox {...args} value={isChecked} onChange={handleChange}>
        <p>자식 요소</p>
      </Checkbox>
    )
  },
}

export const Default: Story = {
  ...Template,
  args: {
    id: 'agreement',
    name: 'isAgreement',
  },
}
