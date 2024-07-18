import { useState } from 'react'
import { CommandType, TextAssetType } from '@/types'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { useRecoilState } from 'recoil'
import activeAssetIdState from '@/recoil/atoms/activeAssetState'
import { TbEdit } from 'react-icons/tb'
import { useLongPress } from '@/hooks/useLongPress'
import useOutsideClickRef from '@/hooks/useOutsideClickRef'
import DeleteGridItemButton from '../DeleteGridItemButton'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const TextEditorToolbar = dynamic(
  () => import('../../toolbar/TextEditorToolbar'),
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
  asset: TextAssetType
  onUpdate: (updatedAsset: TextAssetType) => void
  onDelete: (id: string, layoutId: string, command?: CommandType) => void
  onChangeEditMode: () => void
}

function TextAssetEditor({
  asset,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: TextAssetEditorProps) {
  const { value, id, layoutId, command } = asset

  const [activeAssetId, setActiveAssetId] = useRecoilState(activeAssetIdState)
  const [content, setValue] = useState(value.content)
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [isOpenTextEditorToolbar, setIsOpenTextEditorToolbar] = useState(false)
  const outRef = useOutsideClickRef<HTMLDivElement>(() => {
    if (isOpenControl) {
      setIsOpenControl(false)
    }
    if (isOpenTextEditorToolbar) {
      setIsOpenTextEditorToolbar(false)
      setActiveAssetId('')
      onChangeEditMode()
      onUpdate({
        ...asset,
        value: { content },
      })
    }
  })

  const handleOpenControl = () => {
    if (
      isOpenTextEditorToolbar ||
      (activeAssetId.length && activeAssetId !== id)
    )
      return
    setIsOpenControl(true)
  }

  const longPressEvent = useLongPress({
    onLongPress: handleOpenControl,
  })

  const handleChangeEdit = () => {
    setIsOpenControl(false)
    setIsOpenTextEditorToolbar(!isOpenTextEditorToolbar)
    setActiveAssetId(id)
    onChangeEditMode()
  }

  const handleMouseLeave = () => {
    setIsOpenControl(false)
  }

  return (
    <div
      ref={outRef}
      className="relative flex flex-1 max-w-full"
      onMouseEnter={handleOpenControl}
      onMouseLeave={handleMouseLeave}
      {...longPressEvent}
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
          <div id="textEditor" className="w-full pr-1 pointer-events-none">
            <div className="ql-container ql-snow w-full">
              <div
                className="ql-editor w-full max-w-full flex flex-col flex-1 p-4 bg-white overflow-y-auto whitespace-pre-wrap break-words body1"
                dangerouslySetInnerHTML={{ __html: value.content }}
              />
            </div>
          </div>
        )}
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
              name="edit"
              aria-label="edit-text"
              className="p-1 rounded-lg hover:bg-gray-200"
              onClick={handleChangeEdit}
            >
              <TbEdit size={24} />
            </button>
          </div>
        </div>
      )}
      {isOpenTextEditorToolbar && <TextEditorToolbar />}
    </div>
  )
}

export default TextAssetEditor
