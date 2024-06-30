import type { Meta, StoryObj } from '@storybook/react'
import UserMenu from '.'

const meta: Meta<typeof UserMenu> = {
  title: 'Header/UserMenu',
  component: UserMenu,
  parameters: {
    docs: {
      subtitle: 'UserMenu는 Header의 사용자 메뉴 컴포넌트입니다.',
    },
  },
  argTypes: {
    authInfo: {
      description: '로그인한 사용자 정보',
      control: 'object',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof UserMenu>

export const Default: Story = {
  args: {
    authInfo: {
      id: '1',
      username: '소르비',
      thumbnail:
        'https://i.pinimg.com/736x/53/7e/f5/537ef59499259ba707068742f91a10f8.jpg',
    },
  },
}
