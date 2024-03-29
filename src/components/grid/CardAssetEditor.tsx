import { AssetType } from '@/types'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useRef, useState } from 'react'
import { TbLink, TbPhotoEdit, TbPhotoPlus } from 'react-icons/tb'
import { useRecoilState } from 'recoil'
import activeAssetIdState from '@/recoil/atoms/activeAssetState'
import uploadImage from '@/lib/uploadImage'
import DeleteGridItemButton from '../DeleteGridItemButton'
import InputToolbar from '../toolbar/InputToolbar'

interface CardAssetEditorProps {
  asset: AssetType
  width: number
  height: number
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string, command?: 'save' | 'update' | 'delete') => void
  onChangeEditMode: () => void
}

function CardAssetEditor({
  asset,
  width,
  height,
  onUpdate,
  onDelete,
  onChangeEditMode,
}: CardAssetEditorProps) {
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
  const [cardInputs, setCardInputs] = useState({
    imageUrl: value.imageUrl,
    title: value.title,
    description: value.description,
  })
  const imageRef = useRef<HTMLInputElement | null>(null)
  const [isOpenCardEditor, setIsOpenCardEditor, outCardRef] =
    useOutsideClick<HTMLDivElement>(() => {
      setActiveAssetId('')
      onChangeEditMode()
      onUpdate({
        ...asset,
        value: { ...cardInputs },
      })
    })

  const handleClickInputRef = () => {
    if (!imageRef.current) {
      return
    }
    imageRef.current.click()
  }

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = await uploadImage(e.target.files, 'asset')
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
  const handleMouseEnter = () => {
    if (isOpenCardEditor || (activeAssetId.length && activeAssetId !== id))
      return
    setIsOpenControl(true)
  }

  const handleMouseLeave = () => {
    if (isOpenInputToolbar) return
    setIsOpenControl(false)
    setIsOpenInputToolbar(false)
    setActiveTool('')
  }

  return (
    <div
      ref={outCardRef}
      className="relative flex flex-1 w-full max-width-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative flex-1 ${value?.imageUrl ? 'grid' : ''}  grid-item-wrapper overflow-hidden p-3 gap-2`}
        style={{
          gridTemplateColumns:
            width > height ? `${height}fr ${width - height}fr` : '',
          gridTemplateRows:
            // eslint-disable-next-line no-nested-ternary
            width < height
              ? `${height}fr ${width - height}fr`
              : width === height
                ? '1fr 1fr'
                : '',
        }}
      >
        {isOpenCardEditor ? (
          <>
            <div className="relative rounded-xl overflow-hidden">
              {cardInputs?.imageUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={cardInputs?.imageUrl}
                    alt={`image_${id}`}
                    className="absolute top-0 object-cover w-full h-full"
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
                className="body2 rounded-lg border border-solid border-gray-300 bg-white w-full h-6 p-2"
                value={cardInputs?.title}
                onChange={handleInputChange}
                placeholder="제목"
              />
              {(width > 1 || height > 1) && (
                <textarea
                  name="description"
                  className="body3 h-full rounded-lg border border-solid border-gray-300 bg-white text-gray-400 w-full p-2"
                  value={cardInputs?.description}
                  onChange={handleInputChange}
                  placeholder="내용"
                />
              )}
            </div>
          </>
        ) : (
          <>
            {value?.imageUrl && (
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <img
                  src={value?.imageUrl}
                  alt={`image_${id}`}
                  className="absolute top-0 object-cover w-full h-full"
                />
                {value.link && (
                  <div className="image-link absolute bottom-2 left-2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1">
                    <TbLink size={20} />
                  </div>
                )}
              </div>
            )}
            <div className="flex flex-col gap-2 overflow-hidden">
              {value?.title && (
                <p className="body2 ellipsis2">{value?.title}</p>
              )}
              {(width > 1 || height > 1) && value?.description && (
                <p
                  className={`body3 text-gray-400  ${width > 2 || height > 2 ? 'ellipsis5' : 'ellipsis3'}`}
                >
                  {value?.description}
                </p>
              )}
            </div>
          </>
        )}
      </div>

      {isOpenControl && (
        <div className="control-wrapper" ref={outRef}>
          <DeleteGridItemButton
            onDelete={() => {
              onDelete(id, command)
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
    </div>
  )
}

export default CardAssetEditor
