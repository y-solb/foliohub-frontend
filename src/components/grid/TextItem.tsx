import { FiMinus } from 'react-icons/fi'
import { useState } from 'react'
import { DetailType } from '@/types'
import dynamic from 'next/dynamic' // Next.js에서 동적으로 컴포넌트를 가져오기 위해 필요한 모듈
import 'react-quill/dist/quill.snow.css'
import { RxLink2 } from 'react-icons/rx'
import useOutsideClick from '@/hooks/useOutsideClick'
import { modules, formats } from '../toolbar/EditorToolbar'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) // Next.js에서 ReactQuill을 동적으로 가져오도록 설정
const EditorToolbar = dynamic(() => import('../toolbar/EditorToolbar'), {
  ssr: false,
})

interface TextItemProps {
  detail: DetailType
  onUpdate: (updatedDetail: DetailType) => void
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

  const [isOpen, setIsOpen] = useState(false)
  const [content, setValue] = useState(value)

  const [isEditorToolbarOpen, setIsEditorToolbarOpen, outRef] = useOutsideClick(
    () => {
      onChangeEditMode()
      onUpdate({
        ...detail,
        value: content,
      })
    },
  )

  const handelChangeEdit = () => {
    setIsEditorToolbarOpen(!isEditorToolbarOpen)
    onChangeEditMode()
  }

  return (
    <div
      ref={outRef}
      className="relative flex flex-1 max-w-full"
      onMouseEnter={() => {
        setIsOpen(true)
      }}
      onMouseLeave={() => {
        setIsOpen(false)
      }}
    >
      <div
        className={`relative flex flex-1 rounded-2xl ${isEditorToolbarOpen ? '' : 'overflow-hidden'} border border-solid border-gray-100 shadow-md max-w-full`}
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
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </div>

      {isOpen && !isEditorToolbarOpen && (
        <div className="detail-toolbar z-10">
          <button
            type="button"
            aria-label="delete-grid-item"
            className="absolute -top-4 left-0 transform -translate-x-1/2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1"
            onClick={() => {
              onDelete(id)
            }}
          >
            <FiMinus size={20} />
          </button>
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex toolbar-wrapper">
            <button
              type="button"
              name="edit"
              aria-label="edit-text"
              className="p-1 rounded-lg hover:bg-gray-200"
              onClick={handelChangeEdit}
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
