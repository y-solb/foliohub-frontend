import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Header from '.'

const meta: Meta<typeof Header> = {
  title: 'Header/Header',
  component: Header,
  parameters: {
    docs: {
      subtitle: 'Header는 Header 컴포넌트입니다.',
    },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const LoggedInHeader: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient()
      queryClient.setQueryData(['authInfo'], {
        id: '1',
        username: '소르비',
        thumbnail:
          'https://i.pinimg.com/736x/53/7e/f5/537ef59499259ba707068742f91a10f8.jpg',
      })
      return (
        <QueryClientProvider client={queryClient}>
          <div style={{ position: 'relative' }}>
            <Story />
          </div>
        </QueryClientProvider>
      )
    },
  ],
}

export const LoggedOutHeader: Story = {
  decorators: [
    (Story) => {
      const queryClient = new QueryClient()
      queryClient.setQueryData(['authInfo'], null)

      return (
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      )
    },
  ],
}
