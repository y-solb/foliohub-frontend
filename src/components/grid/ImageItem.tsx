import { DetailType } from '@/types'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useRef, useState } from 'react'
import { RxLink2 } from 'react-icons/rx'
import { FaCirclePlus } from 'react-icons/fa6'
import DeleteGridItemButton from '../DeleteGridItemButton'
import ImageUploadButton from '../common/ImageUploadButton'

interface ImageItemProps {
  detail: DetailType
  onUpdate: (updatedDetail: DetailType) => void
  onDelete: (id: string) => void
}

function ImageItem({ detail, onUpdate, onDelete }: ImageItemProps) {
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [activeTab, setActive] = useState('')
  const linkRef = useRef<HTMLInputElement | null>(null)
  const [isOpenTool, setIsOpenTool, outRef] = useOutsideClick(() => {
    setIsOpenControl(false)
    setActive('')
  })

  const { value, id } = detail

  const handleUpdateImageLink = () => {
    if (!linkRef.current) {
      return
    }
    if (!linkRef.current.value) {
      console.log('please press your --') // TODO: need modal
      return
    }
    onUpdate({
      ...detail,
      value: { ...detail.value, link: linkRef.current.value },
    })
    setIsOpenTool(false)
    setActive('')
  }

  const handleUploadImage = (imageUrl: string) => {
    onUpdate({
      ...detail,
      value: { ...detail.value, imageUrl },
    })
  }

  return (
    <div
      ref={outRef}
      className="relative flex flex-1"
      onMouseEnter={() => {
        setIsOpenControl(true)
      }}
      onMouseLeave={() => {
        if (isOpenTool) return
        setIsOpenControl(false)
        setIsOpenTool(false)
        setActive('')
      }}
    >
      <div className="relative flex flex-1 rounded-2xl overflow-hidden">
        <img src={value.imageUrl} alt={`image_${id}`} className="w-full" />
        {value.link && (
          <a
            href={value.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="related-image-link"
            className="image-link absolute bottom-2 left-2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1"
          >
            <RxLink2 size={20} />
          </a>
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
              name="link"
              aria-label="edit-link-image"
              className={`p-1 rounded-lg hover:bg-gray-200 ${activeTab === 'link' ? 'bg-gray-200' : ''}`}
              onClick={(e) => {
                setIsOpenTool(true)
                setActive((e.currentTarget as HTMLButtonElement).name)
              }}
            >
              <RxLink2 size={24} />
            </button>
            {isOpenTool && (
              <div className="absolute -bottom-16 left-0 toolbar-wrapper flex">
                <input
                  type="text"
                  ref={linkRef}
                  defaultValue={value.link}
                  onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateImageLink()
                    }
                  }}
                />
                <button
                  type="button"
                  aria-label="add-image-link"
                  onClick={handleUpdateImageLink}
                >
                  <FaCirclePlus size={24} />
                </button>
              </div>
            )}
            <ImageUploadButton onUpload={handleUploadImage} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageItem
