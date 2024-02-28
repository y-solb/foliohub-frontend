import { AssetType } from '@/types'
import { Layout } from 'react-grid-layout'
import ImageAssetEditor from './ImageAssetEditor'
import GithubAssetEditor from './GithubAssetEditor'
import TextAssetEditor from './TextAssetEditor'
import LinkAssetEditor from './LinkAssetEditor'

interface AssetEditorProps {
  asset: AssetType
  layout: Layout | undefined
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string) => void
  onChangeEditMode: () => void
}

function AssetEditor({
  asset,
  layout,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: AssetEditorProps) {
  switch (asset.type) {
    case 'github':
      return (
        <GithubAssetEditor
          asset={asset}
          width={layout?.w ?? 1}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )
    case 'content':
      return (
        <TextAssetEditor
          asset={asset}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onChangeEditMode={onChangeEditMode}
        />
      )
    case 'image':
      return (
        <ImageAssetEditor
          asset={asset}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      )
    case 'link':
      return (
        <LinkAssetEditor
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

export default AssetEditor
