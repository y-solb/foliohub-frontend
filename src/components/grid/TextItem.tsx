import { useState } from 'react'
import { AssetType } from '@/types'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { RxLink2 } from 'react-icons/rx'
import useOutsideClick from '@/hooks/useOutsideClick'
import DeleteGridItemButton from '../DeleteGridItemButton'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
const EditorToolbar = dynamic(() => import('../toolbar/EditorToolbar'), {
  ssr: false,
})

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

interface TextItemProps {
  detail: AssetType
  onUpdate: (updatedDetail: AssetType) => void
  onDelete: (id: string) => void
  onChangeEditMode: () => void
}

function TextItem({
  detail,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: TextItemProps) {
  const { value, id } = detail

  const [isOpenControl, setIsOpenControl] = useState(false)
  const [content, setValue] = useState(value.content)

  const [isEditorToolbarOpen, setIsEditorToolbarOpen, outRef] =
    useOutsideClick<HTMLDivElement>(() => {
      onChangeEditMode()
      onUpdate({
        ...detail,
        value: { content },
      })
    })

  const handleChangeEdit = () => {
    setIsOpenControl(false)
    setIsEditorToolbarOpen(!isEditorToolbarOpen)
    onChangeEditMode()
  }

  return (
    <div
      ref={outRef}
      className="relative flex flex-1 max-w-full"
      onMouseEnter={() => {
        if (isEditorToolbarOpen) return
        setIsOpenControl(true)
      }}
      onMouseLeave={() => {
        setIsOpenControl(false)
      }}
    >
      <div
        className={`relative flex flex-1 ${isEditorToolbarOpen ? '' : 'overflow-hidden'} grid-item-wrapper max-w-full`}
      >
        {isEditorToolbarOpen ? (
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
            className="flex flex-col flex-1 p-4 bg-white"
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
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex toolbar-wrapper">
            <button
              type="button"
              name="edit"
              aria-label="edit-text"
              className="p-1 rounded-lg hover:bg-gray-200"
              onClick={handleChangeEdit}
            >
              <RxLink2 size={24} />
            </button>
          </div>
        </div>
      )}
      {isEditorToolbarOpen && <EditorToolbar />}
    </div>
  )
}

export default TextItem
