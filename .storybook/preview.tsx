import React from 'react'
import type { Preview } from '@storybook/react'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { handlers } from '../src/mocks/handlers'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../src/app/globals.css'

initialize()

const queryClient = new QueryClient()

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers: { ...handlers },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  loaders: [mswLoader],
  decorators: (Story) => (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>{Story()}</QueryClientProvider>{' '}
    </RecoilRoot>
  ),
}

export default preview
