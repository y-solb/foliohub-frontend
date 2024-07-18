import { Activity, CommandType, GithubAssetType } from '@/types'
import { useMemo, useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { useRecoilState } from 'recoil'
import activeAssetIdState from '@/recoil/atoms/activeAssetState'
import { TbLink } from 'react-icons/tb'
import { useLongPress } from '@/hooks/useLongPress'
import useOutsideClickRef from '@/hooks/useOutsideClickRef'
import DeleteGridItemButton from '../DeleteGridItemButton'
import InputToolbar from '../../toolbar/InputToolbar'

interface GithubAssetEditorProps {
  asset: GithubAssetType
  width: number
  onUpdate: (updatedAsset: GithubAssetType) => void
  onDelete: (id: string, layoutId: string, command?: CommandType) => void
}

function GithubAssetEditor({
  asset,
  width,
  onUpdate,
  onDelete,
}: GithubAssetEditorProps) {
  const { value, id, layoutId, command } = asset

  const [activeAssetId, setActiveAssetId] = useRecoilState(activeAssetIdState)
  const [activeTool, setActiveTool] = useState('')
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [isOpenInputToolbar, setIsOpenInputToolbar] = useState(false)

  const outRef = useOutsideClickRef<HTMLDivElement>(() => {
    if (isOpenControl) {
      setIsOpenControl(false)
    }
    if (isOpenInputToolbar) {
      setIsOpenInputToolbar(false)
      setActiveAssetId('')
      setActiveTool('')
    }
  })

  const handleOpenControl = () => {
    if (activeAssetId.length && activeAssetId !== id) return
    setIsOpenControl(true)
  }

  const longPressEvent = useLongPress({
    onLongPress: handleOpenControl,
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
    setActiveAssetId('')
    setActiveTool('')
  }

  const handleActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenInputToolbar(true)
    setActiveAssetId(id)
    setActiveTool((e.currentTarget as HTMLButtonElement).name)
  }

  const handleMouseLeave = () => {
    if (isOpenInputToolbar) return
    setIsOpenControl(false)
    setIsOpenInputToolbar(false)
    setActiveTool('')
  }

  return (
    <div
      ref={outRef}
      className="relative flex flex-1 max-w-full"
      onMouseEnter={handleOpenControl}
      onMouseLeave={handleMouseLeave}
      {...longPressEvent}
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
              onDelete(id, layoutId, command)
            }}
          />
          <div className="asset-toolbar-wrapper">
            <button
              type="button"
              name="githubId"
              aria-label="edit-githubId"
              className={`p-1 rounded-lg hover:bg-gray-200 ${activeTool === 'githubId' ? 'bg-gray-200' : ''}`}
              onClick={handleActiveTab}
            >
              <TbLink size={24} />
            </button>
            {isOpenInputToolbar && (
              <InputToolbar
                buttonLabel="edit-githubId"
                placeholder="github id"
                defaultValue={value.githubId}
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
