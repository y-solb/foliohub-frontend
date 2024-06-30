import type { Meta, StoryObj } from '@storybook/react'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import progressBarState from '@/recoil/atoms/progressBarState'
import { useEffect } from 'react'
import ProgressBar from '.'

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    docs: {
      subtitle: 'ProgressBar는 로딩 컴포넌트입니다.',
    },
  },
  decorators: [
    (Story) => (
      <RecoilRoot>
        <Story />
      </RecoilRoot>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ProgressBar>

function ProgressBarWithLoading() {
  const setIsLoading = useSetRecoilState(progressBarState)

  useEffect(() => {
    setIsLoading(true)
  }, [])

  return <ProgressBar />
}

export const Default: Story = {
  render: () => <ProgressBarWithLoading />,
}
