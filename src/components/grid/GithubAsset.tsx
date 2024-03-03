import { AssetType } from '@/types'
import GitHubCalendar from 'react-github-calendar'

type Activity = {
  date: string
  count: number
  level: number
}

interface GithubAssetProps {
  asset: AssetType
  width: number
}

function GithubAsset({ asset, width }: GithubAssetProps) {
  const { value } = asset

  const calculateContributions = (contributions: Activity[]) => {
    const lastDate = new Date(contributions[contributions.length - 1].date)
    return contributions.slice(
      -(
        7 * 6 * width +
        (lastDate.getDay() + 1) +
        7 * 2 * (width - 1) +
        (width > 2 ? 7 * 2 : 0)
      ),
    )
  }

  return (
    <div className="relative flex flex-1">
      <div className="github-calendar-wrapper relative flex flex-1 grid-item-wrapper overflow-hidden p-4 justify-center items-center">
        <GitHubCalendar
          username={value.githubId}
          transformData={calculateContributions}
          colorScheme="light"
          throwOnError={false}
          errorMessage="GitHub를 불러오는 도중 문제가 발생했습니다. 문제가 지속되는 경우 GitHub 계정을 올바르게 입력했는지 확인해 주세요."
          blockRadius={2}
          blockMargin={2}
          blockSize={6}
          hideColorLegend
          hideMonthLabels
          hideTotalCount
        />
      </div>
    </div>
  )
}

export default GithubAsset