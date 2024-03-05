/* eslint-disable @next/next/no-img-element */
import { AssetType } from '@/types'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useState } from 'react'
import { RxLink2 } from 'react-icons/rx'
import useToggle from '@/hooks/useToggle'
import ReactCrop, {
  Crop,
  PercentCrop,
  centerCrop,
  makeAspectCrop,
} from 'react-image-crop'
import DeleteGridItemButton from '../DeleteGridItemButton'
import ImageUploadButton from '../common/ImageUploadButton'
import InputToolbar from '../toolbar/InputToolbar'
import Modal from '../common/Modal'

interface ImageAssetEditorProps {
  asset: AssetType
  w: number
  h: number
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string) => void
  onChangeEditMode: () => void
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

function ImageAssetEditor({
  asset,
  w,
  h,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: ImageAssetEditorProps) {
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [activeTab, setActive] = useState('')
  const [isOpenTool, setIsOpenTool, outRef] = useOutsideClick<HTMLDivElement>(
    () => {
      setIsOpenControl(false)
      setActive('')
    },
  )
  const [isEditMode, toggle] = useToggle(false)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PercentCrop>()

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (w / h) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, w / h))
    }
  }

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
  const handleUploadImagePos = (x: number, y: number) => {
    onUpdate({
      ...asset,
      value: { ...asset.value, pos: { x, y } },
    })
  }

  return (
    <>
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
          onChangeEditMode()
        }}
      >
        <div className="relative flex flex-1 rounded-2xl overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <img
              className="relative w-full h-full object-cover"
              src={value.imageUrl}
              alt={`image_${id}`}
              style={{
                objectPosition: `${value?.pos?.x}% ${value?.pos?.y}%`,
              }}
            />
          </div>

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
        {isOpenControl && !isEditMode && (
          <div className="control-wrapper">
            <DeleteGridItemButton
              onDelete={() => {
                onDelete(id)
              }}
            />
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex toolbar-wrapper">
              <button
                type="button"
                onClick={() => {
                  toggle()
                  onChangeEditMode()
                }}
              >
                편집
              </button>
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

      <Modal
        isOpen={isEditMode}
        isBorder={false}
        onClose={() => {
          toggle()
          const newX =
            completedCrop?.height === 100
              ? (completedCrop.x / (100 - completedCrop.width)) * 100
              : 50
          const newY =
            completedCrop?.width === 100
              ? (completedCrop.y / (100 - completedCrop.height)) * 100
              : 50
          handleUploadImagePos(newX, newY)
        }}
      >
        <div
          id="cropImageAsset"
          className="max-h-[90vh] overflow-scroll rounded-2xl"
        >
          <ReactCrop
            crop={crop}
            onChange={(_, c) => setCrop(c)}
            onComplete={(_, c) => setCompletedCrop(c)}
            aspect={w / h}
            locked
          >
            <img
              src={value.imageUrl}
              alt={`image_${id}`}
              onLoad={onImageLoad}
              className="w-full h-full overflow-hidden object-cover	"
            />
          </ReactCrop>
        </div>
      </Modal>
    </>
  )
}

export default ImageAssetEditor
