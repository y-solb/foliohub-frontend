import { useState } from 'react'
import { AssetType } from '@/types'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { PiNotePencil } from 'react-icons/pi'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useRecoilState } from 'recoil'
import activeAssetIdState from '@/recoil/atoms/activeAssetState'
import DeleteGridItemButton from '../DeleteGridItemButton'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const TextEditorToolbar = dynamic(
  () => import('../toolbar/TextEditorToolbar'),
  {
    ssr: false,
  },
)

const modules = {
  toolbar: {
    container: '#toolbar',
  },
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'align',
  'strike',
  'background',
  'list',
  'bullet',
  'link',
  'color',
]

interface TextAssetEditorProps {
  asset: AssetType
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string) => void
  onChangeEditMode: () => void
}

function TextAssetEditor({
  asset,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: TextAssetEditorProps) {
  const { value, id } = asset

  const [activeAssetId, setActiveAssetId] = useRecoilState(activeAssetIdState)
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [content, setValue] = useState(value.content)
  const [isOpenTextEditorToolbar, setIsOpenTextEditorToolbar, outRef] =
    useOutsideClick<HTMLDivElement>(() => {
      setActiveAssetId('')
      onChangeEditMode()
      onUpdate({
        ...asset,
        value: { content },
      })
    })

  const handleChangeEdit = () => {
    setIsOpenControl(false)
    setIsOpenTextEditorToolbar(!isOpenTextEditorToolbar)
    setActiveAssetId(id)
    onChangeEditMode()
  }

  return (
    <div
      ref={outRef}
      className="relative flex flex-1 max-w-full"
      onMouseEnter={() => {
        if (
          isOpenTextEditorToolbar ||
          (activeAssetId.length && activeAssetId !== id)
        )
          return
        setIsOpenControl(true)
      }}
      onMouseLeave={() => {
        setIsOpenControl(false)
      }}
    >
      <div className="relative flex flex-1 overflow-y-auto grid-item-wrapper max-w-full">
        {isOpenTextEditorToolbar ? (
          <ReactQuill
            id="textEditor"
            modules={modules}
            theme="snow"
            value={content}
            onChange={setValue}
            placeholder="내용을 입력해 주세요."
            formats={formats}
          />
        ) : (
          <div
            className="w-full max-w-full flex flex-col flex-1 p-4 bg-white overflow-y-auto whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: value.content }}
          />
        )}
      </div>
      {isOpenControl && (
        <div className="control-wrapper">
          <DeleteGridItemButton
            onDelete={() => {
              onDelete(id)
            }}
          />
          <div className="asset-toolbar-wrapper">
            <button
              type="button"
              name="edit"
              aria-label="edit-text"
              className="p-1 rounded-lg hover:bg-gray-200"
              onClick={handleChangeEdit}
            >
              <PiNotePencil size={24} />
            </button>
          </div>
        </div>
      )}
      {isOpenTextEditorToolbar && <TextEditorToolbar />}
    </div>
  )
}

export default TextAssetEditor
