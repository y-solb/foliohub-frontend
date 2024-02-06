import { DetailType } from '@/types'
import { useState } from 'react'
import GitHubCalendar from 'react-github-calendar'
import { FiMinus } from 'react-icons/fi'
import TextEditor from './TextEditor'

interface DetailRenderProps {
  detail: DetailType
}

interface GridItemProps {
  detail: DetailType
  onDelete: (id: string) => void
}

function DetailRender({ detail: { id, type, value } }: DetailRenderProps) {
  switch (type) {
    case 'github':
      return <GitHubCalendar username={value.githubId} colorScheme="light" />
    case 'content':
      return <TextEditor content={value} />
    case 'image':
      return (
        <div className="flex flex-1 rounded-2xl overflow-hidden">
          <img src={value.imageUrl} alt={`image_${id}`} />
        </div>
      )
    default:
      return null
  }
}

function GridItem({ detail, onDelete }: GridItemProps) {
  const [isOpen, setIsOpen] = useState(false)

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
      <DetailRender detail={detail} />
      {isOpen && (
        <>
          <button
            type="button"
            aria-label="delete-grid-item"
            className="absolute -top-4 left-0 transform -translate-x-1/2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1"
            onClick={() => {
              onDelete(detail.id)
            }}
          >
            <FiMinus size={20} />
          </button>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex rounded-2xl border border-solid border-gray-100 bg-white shadow-md p-3">
            <button
              type="button"
              aria-label="test"
              onClick={() => {
                console.log('test')
              }}
            >
              test
            </button>
          </div>
        </>
      )}
    </div>
  )
}
export default GridItem
