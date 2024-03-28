import { AssetType } from '@/types'
import 'react-quill/dist/quill.snow.css'

interface TextAssetProps {
  asset: AssetType
}

function TextAsset({ asset }: TextAssetProps) {
  const { value } = asset

  return (
    <div className="relative flex flex-1 max-w-full">
      <div
        id="textEditor"
        className="relative flex flex-1 overflow-y-auto grid-item-wrapper max-w-full"
      >
        <div className="ql-container ql-snow">
          <div
            className="ql-editor w-full max-w-full flex flex-col flex-1 p-4 bg-white overflow-y-auto whitespace-pre-wrap break-words body1"
            dangerouslySetInnerHTML={{ __html: value.content }}
          />
        </div>
      </div>
    </div>
  )
}

export default TextAsset
