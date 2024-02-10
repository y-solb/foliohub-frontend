import { FiMinus } from 'react-icons/fi'
import { useState } from 'react'
import { DetailType } from '@/types'
import dynamic from 'next/dynamic' // Next.js에서 동적으로 컴포넌트를 가져오기 위해 필요한 모듈
import 'react-quill/dist/quill.snow.css'
import { RxLink2 } from 'react-icons/rx'
import useOutsideClick from '@/hooks/useOutsideClick'
import EditorToolbar, { modules, formats } from './EditorToolbar'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false }) // Next.js에서 ReactQuill을 동적으로 가져오도록 설정

interface TextItemProps {
  detail: DetailType
  onDelete: (id: string) => void
  onChangeEditMode: () => void
}

function TextItem({ detail, onDelete, onChangeEditMode }: TextItemProps) {
  const { value, id } = detail

  const [isOpen, setIsOpen] = useState(false)
  const [content, setValue] = useState(value)

  const [isEditorToolbarOpen, setIsEditorToolbarOpen, outRef] = useOutsideClick(
    () => {
      console.log('close')
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
            placeholder="write something^^"
            formats={formats}
          />
        ) : (
          <div>{value}</div>
        )}
      </div>

      {isOpen && !isEditorToolbarOpen && (
        <div className="detail-toolbar">
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
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex rounded-2xl border border-solid border-gray-100 bg-white shadow-md p-3">
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
      {isEditorToolbarOpen && (
        <div>
          <EditorToolbar />
        </div>
      )}
    </div>
  )
}

export default TextItem
