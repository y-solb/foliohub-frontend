import { AssetType } from '@/types'
import { useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import DeleteGridItemButton from '../DeleteGridItemButton'

type Activity = {
  date: string
  count: number
  level: number
}

interface GithubItemProps {
  detail: AssetType
  width: number
  onDelete: (id: string) => void
}

function GithubItem({ detail, width, onDelete }: GithubItemProps) {
  const [isOpenControl, setIsOpenControl] = useState(false)

  const { value, id } = detail

  const calculateContributions = (contributions: Activity[]) => {
    const lastDate = new Date(contributions[contributions.length - 1].date)
    return contributions.slice(
      -(7 * 6 * width + (lastDate.getDay() + 1) + 7 * 2 * (width - 1)),
    )
  }

  return (
    <div
      className="relative flex flex-1"
      onMouseEnter={() => {
        setIsOpenControl(true)
      }}
      onMouseLeave={() => {
        setIsOpenControl(false)
      }}
    >
      <div className="github-calendar-wrapper relative flex flex-1 rounded-2xl overflow-hidden p-1 justify-center items-center">
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
      {isOpenControl && (
        <div className="control-wrapper">
          <DeleteGridItemButton
            onDelete={() => {
              onDelete(id)
            }}
          />
        </div>
      )}
    </div>
  )
}

export default GithubItem
