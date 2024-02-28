import { AssetType } from '@/types'
import 'react-quill/dist/quill.snow.css'

interface TextAssetProps {
  asset: AssetType
}

function TextAsset({ asset }: TextAssetProps) {
  const { value } = asset

  return (
    <div className="relative flex flex-1 max-w-full">
      <div className="relative flex flex-1 overflow-scroll grid-item-wrapper max-w-full">
        <div
          className="flex flex-col flex-1 p-4 bg-white"
          dangerouslySetInnerHTML={{ __html: value.content }}
        />
      </div>
    </div>
  )
}

export default TextAsset
