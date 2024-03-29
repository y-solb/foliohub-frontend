/* eslint-disable @next/next/no-img-element */
import { AssetType } from '@/types'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useState, useRef } from 'react'
import { TbLink, TbCrop, TbPhotoPlus } from 'react-icons/tb'
import useToggle from '@/hooks/useToggle'
import Link from 'next/link'
import { useRecoilState } from 'recoil'
import activeAssetIdState from '@/recoil/atoms/activeAssetState'
import uploadImage from '@/lib/uploadImage'
import DeleteGridItemButton from '../DeleteGridItemButton'
import InputToolbar from '../toolbar/InputToolbar'
import ImageCropModal from '../ImageCropModal'

interface ImageAssetEditorProps {
  asset: AssetType
  w: number
  h: number
  breakpoint: string
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string, command?: 'save' | 'update' | 'delete') => void
  onChangeEditMode: () => void
}

function ImageAssetEditor({
  asset,
  w,
  h,
  breakpoint,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: ImageAssetEditorProps) {
  const { value, id, command } = asset

  const [activeAssetId, setActiveAssetId] = useRecoilState(activeAssetIdState)
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [activeTool, setActiveTool] = useState('')
  const [isOpenInputToolbar, setIsOpenInputToolbar, outRef] =
    useOutsideClick<HTMLDivElement>(() => {
      setIsOpenControl(false)
      setActiveAssetId('')
      setActiveTool('')
    })
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [isCropMode, toggle] = useToggle(false)

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
    onUpdate({
      ...asset,
      value: { ...asset.value, imageUrl },
    })
  }

  const handleUploadImagePos = (x: number, y: number) => {
    onUpdate({
      ...asset,
      value: {
        ...asset.value,
        pos: { ...asset.value.pos, [breakpoint]: { x, y } },
      },
    })
  }

  const handleActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenInputToolbar(true)
    setActiveAssetId(id)
    setActiveTool((e.currentTarget as HTMLButtonElement).name)
  }

  const handleMouseEnter = () => {
    if (activeAssetId.length && activeAssetId !== id) return
    setIsOpenControl(true)
  }

  const handleMouseLeave = () => {
    if (isOpenInputToolbar) return
    setIsOpenControl(false)
    setIsOpenInputToolbar(false)
    setActiveTool('')
  }

  const handleOpenCropModal = () => {
    toggle()
    onChangeEditMode()
  }

  const handleCropModalClose = (newX: number, newY: number) => {
    toggle()
    onChangeEditMode()
    setIsOpenControl(false)
    handleUploadImagePos(newX, newY)
  }

  return (
    <>
      <div
        ref={outRef}
        className="relative flex flex-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative flex flex-1 rounded-2xl overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <img
              className="relative w-full h-full object-cover"
              src={value.imageUrl}
              alt={`image_${id}`}
              style={{
                objectPosition: `${value.pos?.[breakpoint] ? value.pos[breakpoint].x : 50}% ${value.pos?.[breakpoint] ? value.pos[breakpoint].y : 50}%`,
              }}
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
                onDelete(id, command)
              }}
            />
            <div className="asset-toolbar-wrapper">
              <button
                type="button"
                name="crop"
                aria-label="crop-image"
                className={`p-1 rounded-lg hover:bg-gray-200 ${activeTool === 'crop' ? 'bg-gray-200' : ''}`}
                onClick={handleOpenCropModal}
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
        ratio={w / h}
        onCropModalClose={(newX, newY) => {
          handleCropModalClose(newX, newY)
        }}
      />
    </>
  )
}

export default ImageAssetEditor
