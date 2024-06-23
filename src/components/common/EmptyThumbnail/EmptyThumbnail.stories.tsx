import type { Meta } from '@storybook/react'
import EmptyThumbnail from '.'

const meta: Meta<typeof EmptyThumbnail> = {
  title: 'Components/EmptyThumbnail',
  component: EmptyThumbnail,
  decorators: [
    (Story) => (
      <div style={{ width: '48px', height: '48px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta

export function Default() {
  return <EmptyThumbnail />
}
