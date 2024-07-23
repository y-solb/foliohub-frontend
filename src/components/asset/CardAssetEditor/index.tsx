import { BreakpointType, CardAssetType, CommandType } from '@/types'
import { useRef, useState } from 'react'
import { TbLink, TbCrop, TbPhotoEdit, TbPhotoPlus } from 'react-icons/tb'
import { useRecoilState } from 'recoil'
import activeAssetIdState from '@/recoil/atoms/activeAssetState'
import useToggle from '@/hooks/useToggle'
import useImageUpload from '@/hooks/useImageUpload'
import Image from 'next/image'
import useOutsideClickRef from '@/hooks/useOutsideClickRef'
import { useLongPress } from '@/hooks/useLongPress'
import { getGridTemplate } from '@/lib/asset'
import DeleteGridItemButton from '../DeleteGridItemButton'
import InputToolbar from '../../toolbar/InputToolbar'
import ImageCropModal from '../../modal/ImageCropModal'

interface CardAssetEditorProps {
  asset: CardAssetType
  width: number
  height: number
  breakpoint: BreakpointType
  onUpdate: (updatedAsset: CardAssetType) => void
  onDelete: (id: string, layoutId: string, command?: CommandType) => void
  onChangeEditMode: () => void
}

function CardAssetEditor({
  asset,
  width,
  height,
  breakpoint,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: CardAssetEditorProps) {
  const { value, id, layoutId, command } = asset

  const [ratio, setRatio] = useState(0)
  const [activeAssetId, setActiveAssetId] = useRecoilState(activeAssetIdState)
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [isOpenInputToolbar, setIsOpenInputToolbar] = useState(false)
  const [activeTool, setActiveTool] = useState('')
  const [cardInputs, setCardInputs] = useState({
    imageUrl: value.imageUrl,
    title: value.title,
    description: value.description,
  })
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [isOpenCardEditor, setIsOpenCardEditor] = useState(false)
  const outRef = useOutsideClickRef<HTMLDivElement>(() => {
    if (isOpenControl) {
      setIsOpenControl(false)
      setActiveAssetId('')
      setActiveTool('')
    }
    if (isOpenInputToolbar) {
      setIsOpenControl(false)
      setIsOpenInputToolbar(false)
      setActiveTool('')
    }
    if (isOpenCardEditor) {
      setIsOpenCardEditor(false)
      setActiveAssetId('')
      onChangeEditMode()
      onUpdate({
        ...asset,
        value: { ...asset.value, ...cardInputs },
      })
    }
  })

  const handleOpenControl = () => {
    if (isOpenCardEditor || (activeAssetId.length && activeAssetId !== id))
      return
    setIsOpenControl(true)
  }

  const longPressEvent = useLongPress({
    onLongPress: handleOpenControl,
  })

  const [isCropMode, toggle] = useToggle(false)
  const { uploadImage } = useImageUpload()

  const handleClickInputRef = () => {
    if (!imageRef.current) {
      return
    }
    imageRef.current.click()
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = await uploadImage(e.target.files, 'asset')
    if (!imageUrl) return
    setCardInputs((prevInputs) => ({
      ...prevInputs,
      imageUrl,
    }))
  }

  const handleUpdateImageLink = (inputValue: string) => {
    onUpdate({
      ...asset,
      value: { ...asset.value, link: inputValue },
    })
    setIsOpenInputToolbar(false)
    setActiveAssetId('')
    setActiveTool('')
  }
  const handleActiveLinkTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenInputToolbar(true)
    setActiveAssetId(id)
    setActiveTool((e.currentTarget as HTMLButtonElement).name)
  }
  const handleActiveCardTab = () => {
    setIsOpenControl(false)
    setIsOpenCardEditor(!isOpenCardEditor)
    setActiveAssetId(id)
    onChangeEditMode()
  }
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCardInputs((prevInputs) => ({
      ...prevInputs,
      [e.target.name]: e.target.value,
    }))
  }

  const handleMouseLeave = () => {
    if (isOpenInputToolbar) return
    setIsOpenControl(false)
    setIsOpenInputToolbar(false)
    setActiveTool('')
  }

  const handleCropModalOpen = () => {
    const divElement = document.getElementById(`image_${id}`)
    if (!divElement) return

    const newRatio = divElement.offsetWidth / divElement.offsetHeight
    setRatio(newRatio)
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
    <div
      ref={outRef}
      className="relative flex flex-1 w-full max-width-full"
      onMouseEnter={handleOpenControl}
      onMouseLeave={handleMouseLeave}
      {...longPressEvent}
    >
      <div
        className={`relative flex-1 ${value?.imageUrl || isOpenCardEditor ? 'grid' : ''}  grid-item-wrapper overflow-hidden p-3 gap-2`}
        style={getGridTemplate(width, height)}
      >
        {isOpenCardEditor ? (
          <>
            <div className="relative rounded-xl overflow-hidden">
              {cardInputs?.imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={cardInputs?.imageUrl}
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
              ) : (
                <div className="relative w-full overflow-hidden bg-gray-100 h-full" />
              )}
              <div className="absolute top-0 w-full h-full">
                <button
                  type="button"
                  aria-label="change-image"
                  className={`flex items-center justify-center w-full h-full  ${cardInputs?.imageUrl && 'bg-white opacity-0 hover:opacity-70'}`}
                  onClick={handleClickInputRef}
                >
                  <TbPhotoPlus size={24} />
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
            <div className="flex flex-col gap-2 overflow-hidden">
              <input
                type="text"
                name="title"
                className="body2 rounded-lg bg-gray-100 w-full h-6 p-2"
                value={cardInputs?.title}
                onChange={handleInputChange}
                placeholder="제목"
              />
              <textarea
                name="description"
                className="body3 h-full rounded-lg bg-gray-100 text-gray-400 w-full p-2"
                value={cardInputs?.description}
                onChange={handleInputChange}
                placeholder="내용"
              />
            </div>
          </>
        ) : (
          <>
            {value?.imageUrl && (
              <div
                id={`image_${id}`}
                className="relative w-full h-full rounded-xl overflow-hidden"
              >
                <Image
                  src={value?.imageUrl}
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
                {value.link && (
                  <div className="image-link absolute bottom-2 left-2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1">
                    <TbLink size={20} />
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2 overflow-x-hidden	overflow-y-auto">
              {value?.title && (
                <p className="body2 font-medium">{value?.title}</p>
              )}
              {value?.description && (
                <p className="body3 text-gray-400">{value?.description}</p>
              )}
            </div>
          </>
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
              name="card"
              aria-label="edit-card"
              className={`p-1 rounded-lg hover:bg-gray-200 ${activeTool === 'card' ? 'bg-gray-200' : ''}`}
              onClick={handleActiveCardTab}
            >
              <TbPhotoEdit size={24} />
            </button>
            {value?.imageUrl && (
              <button
                type="button"
                name="crop"
                aria-label="crop-image"
                className={`p-1 rounded-lg hover:bg-gray-200 ${activeTool === 'crop' ? 'bg-gray-200' : ''}`}
                onClick={handleCropModalOpen}
              >
                <TbCrop size={24} />
              </button>
            )}
            <button
              type="button"
              name="link"
              aria-label="edit-link-image"
              className={`p-1 rounded-lg hover:bg-gray-200 ${activeTool === 'link' ? 'bg-gray-200' : ''}`}
              onClick={handleActiveLinkTab}
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
          </div>
        </div>
      )}
      <ImageCropModal
        isOpen={isCropMode}
        imageUrl={value.imageUrl}
        ratio={ratio}
        onCropModalClose={(newX, newY) => {
          handleCropModalClose(newX, newY)
        }}
      />
    </div>
  )
}

export default CardAssetEditor
