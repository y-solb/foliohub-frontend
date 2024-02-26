import { AssetType } from '@/types'
import { Layout } from 'react-grid-layout'
import ImageItem from './ImageItem'
import GithubItem from './GithubItem'
import TextItem from './TextItem'
import LinkItem from './LinkItem'

interface GridItemProps {
  asset: AssetType
  layout: Layout | undefined
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string) => void
  onChangeEditMode: () => void
}

function GridItem({
  asset,
  layout,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: GridItemProps) {
  switch (asset.type) {
    case 'github':
      return (
        <GithubItem asset={asset} width={layout?.w ?? 1} onDelete={onDelete} />
      )
    case 'content':
      return (
        <TextItem
          asset={asset}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onChangeEditMode={onChangeEditMode}
        />
      )
    case 'image':
      return <ImageItem asset={asset} onUpdate={onUpdate} onDelete={onDelete} />
    case 'link':
      return (
        <LinkItem
          asset={asset}
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
