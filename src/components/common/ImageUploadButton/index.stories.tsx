import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import ImageUploadButton from '.'

const meta: Meta<typeof ImageUploadButton> = {
  title: 'Components/ImageUploadButton',
  component: ImageUploadButton,
  parameters: {
    componentSubtitle:
      'ImageUploadButton은 이미지를 업로드하는 버튼 컴포넌트입니다.',
  },
  args: { onClick: fn(), onUpload: fn() },
}

export default meta

type Story = StoryObj<typeof ImageUploadButton>

export const Default: Story = {}
