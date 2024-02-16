import { DetailType } from '@/types'
import { Layout } from 'react-grid-layout'
import ImageItem from './ImageItem'
import GithubItem from './GithubItem'
import TextItem from './TextItem'
import LinkItem from './LinkItem'

interface GridItemProps {
  detail: DetailType
  layout: Layout | undefined
  onUpdate: (updatedDetail: DetailType) => void
  onDelete: (id: string) => void
  onChangeEditMode: () => void
}

function GridItem({
  detail,
  layout,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: GridItemProps) {
  switch (detail.type) {
    case 'github':
      return (
        <GithubItem
          detail={detail}
          width={layout?.w ?? 1}
          onDelete={onDelete}
        />
      )
    case 'content':
      return (
        <TextItem
          detail={detail}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onChangeEditMode={onChangeEditMode}
        />
      )
    case 'image':
      return (
        <ImageItem detail={detail} onUpdate={onUpdate} onDelete={onDelete} />
      )
    case 'link':
      return (
        <LinkItem
          detail={detail}
          width={layout?.w ?? 1}
          height={layout?.h ?? 1}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )
    default:
      return null
  }
}

export default GridItem
