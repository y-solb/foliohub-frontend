import Image from 'next/image'
import { AssetType } from '@/types'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useState } from 'react'
import { RxLink2 } from 'react-icons/rx'
import DeleteGridItemButton from '../DeleteGridItemButton'
import ImageUploadButton from '../common/ImageUploadButton'
import InputToolbar from '../toolbar/InputToolbar'

interface ImageAssetEditorProps {
  asset: AssetType
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string) => void
}

function ImageAssetEditor({
  asset,
  onUpdate,
  onDelete,
}: ImageAssetEditorProps) {
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [activeTab, setActive] = useState('')
  const [isOpenTool, setIsOpenTool, outRef] = useOutsideClick<HTMLDivElement>(
    () => {
      setIsOpenControl(false)
      setActive('')
    },
  )

  const { value, id } = asset

  const handleUpdateImageLink = (inputValue: string) => {
    onUpdate({
      ...asset,
      value: { ...asset.value, link: inputValue },
    })
    setIsOpenTool(false)
    setActive('')
  }

  const handleUploadImage = (imageUrl: string) => {
    onUpdate({
      ...asset,
      value: { ...asset.value, imageUrl },
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
        <Image
          src={value.imageUrl}
          alt={`image_${id}`}
          fill
          priority
          className="w-full"
        />
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
              <InputToolbar
                defaultValue={value.link}
                buttonLabel="add-image-link"
                onAdd={handleUpdateImageLink}
              />
            )}
            <ImageUploadButton onUpload={handleUploadImage} />
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageAssetEditor
