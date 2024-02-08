import { DetailType } from '@/types'
import { Layout } from 'react-grid-layout'
import ImageItem from './ImageItem'
import GithubItem from './GithubItem'

interface GridItemProps {
  detail: DetailType
  layout: Layout | undefined
  onUpdate: (updatedDetail: DetailType) => void
  onDelete: (id: string) => void
}

function GridItem({ detail, layout, onUpdate, onDelete }: GridItemProps) {
  switch (detail.type) {
    case 'github':
      return (
        <GithubItem
          detail={detail}
          width={layout?.w ?? 1}
          onDelete={onDelete}
        />
      )
    // case 'content':
    //   return <TextEditor content={value} />
    case 'image':
      return (
        <ImageItem detail={detail} onUpdate={onUpdate} onDelete={onDelete} />
      )
    default:
      return null
  }
}

export default GridItem
