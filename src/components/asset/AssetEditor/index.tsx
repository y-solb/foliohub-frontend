import { AssetType, BreakpointType, CommandType } from '@/types'
import { Layout } from 'react-grid-layout'
import ImageAssetEditor from '../ImageAssetEditor'
import GithubAssetEditor from '../GithubAssetEditor'
import TextAssetEditor from '../TextAssetEditor'
import CardAssetEditor from '../CardAssetEditor'

interface AssetEditorProps {
  asset: AssetType
  breakpoint: BreakpointType
  layout?: Layout
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string, layoutId: string, command?: CommandType) => void
  onChangeEditMode: () => void
}

function AssetEditor({
  asset,
  breakpoint,
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
          w={layout?.w ?? 1}
          h={layout?.h ?? 1}
          breakpoint={breakpoint}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onChangeEditMode={onChangeEditMode}
        />
      )
    case 'card':
      return (
        <CardAssetEditor
          asset={asset}
          width={layout?.w ?? 1}
          height={layout?.h ?? 1}
          breakpoint={breakpoint}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onChangeEditMode={onChangeEditMode}
        />
      )
    default:
      return null
  }
}

export default AssetEditor
