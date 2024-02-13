import { DetailType } from '@/types'
import { FiMinus } from 'react-icons/fi'
import { useState } from 'react'
import GitHubCalendar from 'react-github-calendar'

type Activity = {
  date: string
  count: number
  level: number
}

interface GithubItemProps {
  detail: DetailType
  width: number
  onDelete: (id: string) => void
}

function GithubItem({ detail, width, onDelete }: GithubItemProps) {
  const [isOpen, setIsOpen] = useState(false)

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
        setIsOpen(true)
      }}
      onMouseLeave={() => {
        setIsOpen(false)
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
      {isOpen && (
        <div className="detail-toolbar z-10">
          <button
            type="button"
            aria-label="delete-grid-item"
            className="absolute -top-4 left-0 transform -translate-x-1/2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1"
            onClick={() => {
              onDelete(id)
            }}
          >
            <FiMinus size={20} />
          </button>
        </div>
      )}
    </div>
  )
}

export default GithubItem