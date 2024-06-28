import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import ImageUploadButton from '.'

const meta: Meta<typeof ImageUploadButton> = {
  title: 'Components/ImageUploadButton',
  component: ImageUploadButton,
  args: { onClick: fn(), onUpload: fn() },
}

export default meta

type Story = StoryObj<typeof ImageUploadButton>

export const Default: Story = {}
