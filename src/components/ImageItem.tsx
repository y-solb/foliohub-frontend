import { DetailType } from '@/types'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useRef, useState } from 'react'
import uploadImage from '@/lib/uploadImage'
import { FiMinus } from 'react-icons/fi'
import { RxLink2 } from 'react-icons/rx'
import { LuImagePlus } from 'react-icons/lu'
import { FaCirclePlus } from 'react-icons/fa6'

interface ImageItemProps {
  detail: DetailType
  onUpdate: (updatedDetail: DetailType) => void
  onDelete: (id: string) => void
}

function ImageItem({ detail, onUpdate, onDelete }: ImageItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActive] = useState('')
  const linkRef = useRef<HTMLInputElement | null>(null)
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [isOpenTool, setIsOpenTool, outRef] = useOutsideClick(() => {
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

  const handleClickInputRef = () => {
    if (!imageRef.current) {
      return
    }
    imageRef.current.click()
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]

    if (file) {
      const imageUrl = await uploadImage(file)
      onUpdate({
        ...detail,
        value: { imageUrl, link: '' },
      })
    }
  }

  return (
    <div
      className="relative flex flex-1"
      onMouseEnter={() => {
        setIsOpen(true)
      }}
      onMouseLeave={() => {
        setIsOpen(false)
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
      {isOpen && (
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
              <div
                ref={outRef}
                className="flex rounded-2xl border border-solid border-gray-100 shadow-md p-3 bg-white absolute -bottom-16 left-0"
              >
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
            <button
              type="button"
              aria-label="change-image"
              className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
              onClick={handleClickInputRef}
            >
              <LuImagePlus size={24} />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={imageRef}
              className="hidden"
              onChange={handleUploadImage}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageItem
