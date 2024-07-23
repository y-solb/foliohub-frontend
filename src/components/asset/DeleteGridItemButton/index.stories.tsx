import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import DeleteGridItemButton from '.'

const meta: Meta<typeof DeleteGridItemButton> = {
  title: 'Asset/DeleteGridItemButton',
  component: DeleteGridItemButton,
  parameters: {
    docs: {
      subtitle: 'DeleteGridItemButton은 Asset을 삭제하는 버튼입니다.',
    },
  },
  argTypes: {
    onDelete: {
      description: '해당 Asset을 삭제합니다.',
    },
  },
  decorators: [
    (Story) => (
      <div className="relative w-8 h-8 m-4">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof DeleteGridItemButton>

export const Default: Story = {
  args: {
    onDelete: fn(),
  },
}
