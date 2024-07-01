import type { Meta, StoryObj } from '@storybook/react'
import InputToolbar from '.'

const meta: Meta<typeof InputToolbar> = {
  title: 'Toolbar/InputToolbar',
  component: InputToolbar,
  parameters: {
    docs: {
      subtitle: 'InputToolbar는 Toolbar에서 사용되는 Input 컴포넌트입니다.',
    },
  },
  argTypes: {
    buttonLabel: {
      description: '버튼의 label을 설정합니다.',
    },
    placeholder: {
      description: 'input의 placeholder를 설정합니다.',
    },
    defaultValue: {
      description: 'input의 기본값을 설정합니다.',
    },
    onAdd: {
      description: '값을 추가할때 호출되는 함수입니다.',
    },
  },
}

export default meta
type Story = StoryObj<typeof InputToolbar>

export const Default: Story = {
  args: {
    buttonLabel: 'add',
    placeholder: '텍스트를 입력해주세요.',
    defaultValue: '',
  },
}
