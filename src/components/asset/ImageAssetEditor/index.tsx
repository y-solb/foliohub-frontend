import { BreakpointType, CommandType, ImageAssetType } from '@/types'
import { useState, useRef } from 'react'
import { TbLink, TbCrop, TbPhotoPlus } from 'react-icons/tb'
import useToggle from '@/hooks/useToggle'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import activeAssetIdState from '@/recoil/atoms/activeAssetState'
import useImageUpload from '@/hooks/useImageUpload'
import Image from 'next/image'
import { useLongPress } from '@/hooks/useLongPress'
import useOutsideClickRef from '@/hooks/useOutsideClickRef'
import DeleteGridItemButton from '../DeleteGridItemButton'
import InputToolbar from '../../toolbar/InputToolbar'
import ImageCropModal from '../../modal/ImageCropModal'

interface ImageAssetEditorProps {
  asset: ImageAssetType
  width: number
  height: number
  breakpoint: BreakpointType
  onUpdate: (updatedAsset: ImageAssetType) => void
  onDelete: (id: string, layoutId: string, command?: CommandType) => void
  onChangeEditMode: () => void
}

function ImageAssetEditor({
  asset,
  width,
  height,
  breakpoint,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: ImageAssetEditorProps) {
  const { value, id, layoutId, command } = asset

  const [activeAssetId, setActiveAssetId] = useRecoilState(activeAssetIdState)
  const [activeTool, setActiveTool] = useState('')
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [isOpenInputToolbar, setIsOpenInputToolbar] = useState(false)
  const outRef = useOutsideClickRef<HTMLDivElement>(() => {
    if (isOpenControl) {
      setIsOpenControl(false)
    }
    if (isOpenInputToolbar) {
      setIsOpenInputToolbar(false)
      setActiveAssetId('')
      setActiveTool('')
    }
  })
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [isCropMode, toggle] = useToggle(false)
  const { uploadImage } = useImageUpload()

  const handleOpenControl = () => {
    if (activeAssetId.length && activeAssetId !== id) return
    setIsOpenControl(true)
  }

  const longPressEvent = useLongPress({
    onLongPress: handleOpenControl,
  })

  const handleUpdateImageLink = (inputValue: string) => {
    onUpdate({
      ...asset,
      value: { ...asset.value, link: inputValue },
    })
    setIsOpenInputToolbar(false)
    setActiveAssetId('')
    setActiveTool('')
  }

  const handleClickInputRef = () => {
    if (!imageRef.current) {
      return
    }
    imageRef.current.click()
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = await uploadImage(e.target.files, 'asset')
    if (!imageUrl) return
    onUpdate({
      ...asset,
      value: { ...asset.value, imageUrl },
    })
  }

  const handleActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenInputToolbar(true)
    setActiveAssetId(id)
    setActiveTool((e.currentTarget as HTMLButtonElement).name)
  }

  const handleMouseLeave = () => {
    if (isOpenInputToolbar) return
    setIsOpenControl(false)
    setIsOpenInputToolbar(false)
    setActiveTool('')
  }

  const handleCropModalOpen = () => {
    toggle()
    onChangeEditMode()
  }

  const handleCropModalClose = (newX: number, newY: number) => {
    toggle()
    onChangeEditMode()
    setIsOpenControl(false)
    onUpdate({
      ...asset,
      value: {
        ...asset.value,
        pos: { ...asset.value.pos, [breakpoint]: { x: newX, y: newY } },
      },
    })
  }

  return (
    <>
      <div
        ref={outRef}
        className="relative flex flex-1"
        onMouseEnter={handleOpenControl}
        onMouseLeave={handleMouseLeave}
        {...longPressEvent}
      >
        <div className="relative flex flex-1 rounded-2xl overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <Image
              src={value.imageUrl}
              className="object-cover"
              alt={`image_${id}`}
              style={{
                objectPosition: `${value.pos?.[breakpoint] ? value.pos[breakpoint].x : 50}% ${value.pos?.[breakpoint] ? value.pos[breakpoint].y : 50}%`,
              }}
              quality={100}
              fill
              priority
              sizes="(max-width: 842px) 100vw, 80vw"
            />
          </div>
          <input
            id={`image_change_${id}`}
            type="file"
            accept="image/*"
            ref={imageRef}
            className="hidden"
            onChange={handleUploadImage}
          />
          {value.link && (
            <Link
              href={value.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="related-image-link"
              className="image-link absolute bottom-2 left-2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1"
            >
              <TbLink size={20} />
            </Link>
          )}
        </div>
        {isOpenControl && !isCropMode && (
          <div className="control-wrapper">
            <DeleteGridItemButton
              onDelete={() => {
                onDelete(id, layoutId, command)
              }}
            />
            <div className="asset-toolbar-wrapper">
              <button
                type="button"
                name="crop"
                aria-label="crop-image"
                className={`p-1 rounded-lg hover:bg-gray-200 ${activeTool === 'crop' ? 'bg-gray-200' : ''}`}
                onClick={handleCropModalOpen}
              >
                <TbCrop size={24} />
              </button>
              <button
                type="button"
                name="link"
                aria-label="edit-link-image"
                className={`p-1 rounded-lg hover:bg-gray-200 ${activeTool === 'link' ? 'bg-gray-200' : ''}`}
                onClick={handleActiveTab}
              >
                <TbLink size={24} />
              </button>
              {isOpenInputToolbar && (
                <InputToolbar
                  buttonLabel="add-image-link"
                  placeholder="link"
                  defaultValue={value.link}
                  onAdd={handleUpdateImageLink}
                />
              )}
              <button
                type="button"
                aria-label="change-image"
                className="p-1 rounded-lg hover:bg-gray-200 active:bg-gray-200"
                onClick={handleClickInputRef}
              >
                <TbPhotoPlus size={24} />
              </button>
            </div>
          </div>
        )}
      </div>
      <ImageCropModal
        isOpen={isCropMode}
        imageUrl={value.imageUrl}
        ratio={width / height}
        onCropModalClose={(newX, newY) => {
          handleCropModalClose(newX, newY)
        }}
      />
    </>
  )
}

export default ImageAssetEditor
