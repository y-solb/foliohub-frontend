import { AssetType } from '@/types'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useState } from 'react'
import { RxLink2 } from 'react-icons/rx'
import { useMetadataQuery } from '@/hooks/queries/metadata'
import DeleteGridItemButton from '../DeleteGridItemButton'
import InputToolbar from '../toolbar/InputToolbar'

interface LinkAssetEditorProps {
  asset: AssetType
  width: number
  height: number
  onUpdate: (updatedAsset: AssetType) => void
  onDelete: (id: string) => void
}

function LinkAssetEditor({
  asset,
  width,
  height,
  onUpdate,
  onDelete,
}: LinkAssetEditorProps) {
  const { value, id } = asset

  const { data } = useMetadataQuery(value.link)

  const [isOpenControl, setIsOpenControl] = useState(false)
  const [activeTool, setActiveTool] = useState('')
  const [isOpenInputToolbar, setIsOpenInputToolbar, outRef] =
    useOutsideClick<HTMLDivElement>(() => {
      setIsOpenControl(false)
      setActiveTool('')
    })

  const handleUpdateImageLink = (inputValue: string) => {
    onUpdate({
      ...asset,
      value: { ...asset.value, link: inputValue },
    })
    setIsOpenInputToolbar(false)
    setActiveTool('')
  }

  const handleMouseEnter = () => {
    setIsOpenControl(true)
  }

  const handleMouseLeave = () => {
    if (isOpenInputToolbar) return
    setIsOpenControl(false)
    setIsOpenInputToolbar(false)
    setActiveTool('')
  }

  const handleActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenInputToolbar(true)
    setActiveTool((e.currentTarget as HTMLButtonElement).name)
  }

  return (
    <div
      ref={outRef}
      className="relative flex flex-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`relative ${data?.image ? 'grid' : ''} flex-1 grid-item-wrapper overflow-hidden`}
        style={{
          gridTemplateColumns:
            width > height ? `${height}fr ${width - height}fr` : '',
          gridTemplateRows:
            width < height ? `${height}fr ${width - height}fr` : '1fr 1fr',
        }}
      >
        {data?.image && (
          <div
            className={`relative w-full overflow-hidden ${width !== height ? 'pb-[100%]' : ''}`}
          >
            <img
              src={data?.image}
              alt={`image_${id}`}
              className="absolute top-0 object-cover w-full h-full"
            />
          </div>
        )}
        <div className="flex flex-col gap-2 p-3 overflow-hidden">
          <p className="body2 ellipsis2">{data?.title}</p>
          {(width > 1 || height > 1) && (
            <p
              className={`body3 text-gray-400  ${width > 2 || height > 2 ? 'ellipsis5' : 'ellipsis3'}`}
            >
              {data?.description}
            </p>
          )}
        </div>
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
              className={`p-1 rounded-lg hover:bg-gray-200 ${activeTool === 'link' ? 'bg-gray-200' : ''}`}
              onClick={handleActiveTab}
            >
              <RxLink2 size={24} />
            </button>
            {isOpenInputToolbar && (
              <InputToolbar
                defaultValue={value.link}
                buttonLabel="add-image-link"
                onAdd={handleUpdateImageLink}
              />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LinkAssetEditor
