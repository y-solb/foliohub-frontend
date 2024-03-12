import { AssetType } from '@/types'
import { useMemo, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import useOutsideClick from '@/hooks/useOutsideClick'
import { RxLink2 } from 'react-icons/rx'
import DeleteGridItemButton from '../DeleteGridItemButton'
import InputToolbar from '../toolbar/InputToolbar'

type Activity = {
  date: string
  count: number
  level: number
}

interface GithubAssetEditorProps {
  asset: AssetType
  width: number
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string) => void
}

function GithubAssetEditor({
  asset,
  width,
  onUpdate,
  onDelete,
}: GithubAssetEditorProps) {
  const { value, id } = asset

  const [isOpenControl, setIsOpenControl] = useState(false)
  const [activeTool, setActiveTool] = useState('')
  const [isOpenInputToolbar, setIsOpenInputToolbar, outRef] =
    useOutsideClick<HTMLDivElement>(() => {
      setIsOpenControl(false)
      setActiveTool('')
    })

  const calculateContributions = useMemo(() => {
    return (contributions: Activity[]) => {
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
  }, [width])

  const handleUpdateGithubId = (inputValue: string) => {
    onUpdate({
      ...asset,
      value: { ...asset.value, githubId: inputValue },
    })
    setIsOpenInputToolbar(false)
    setActiveTool('')
  }

  const handleClickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenInputToolbar(true)
    setActiveTool((e.currentTarget as HTMLButtonElement).name)
  }

  return (
    <div
      ref={outRef}
      className="relative flex flex-1"
      onMouseEnter={() => {
        setIsOpenControl(true)
      }}
      onMouseLeave={() => {
        if (isOpenInputToolbar) return
        setIsOpenControl(false)
        setIsOpenInputToolbar(false)
        setActiveTool('')
      }}
    >
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
      {isOpenControl && (
        <div className="control-wrapper">
          <DeleteGridItemButton
            onDelete={() => {
              onDelete(id)
            }}
          />
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex toolbar-wrapper">
            <button
              type="button"
              name="githubId"
              aria-label="edit-githubId"
              className={`p-1 rounded-lg hover:bg-gray-200 ${activeTool === 'githubId' ? 'bg-gray-200' : ''}`}
              onClick={handleClickTab}
            >
              <RxLink2 size={24} />
            </button>
            {isOpenInputToolbar && (
              <InputToolbar
                defaultValue={value.githubId}
                buttonLabel="edit-githubId"
                onAdd={handleUpdateGithubId}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default GithubAssetEditor
