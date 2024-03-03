import { AssetType } from '@/types'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useEffect, useState } from 'react'
import { RxLink2 } from 'react-icons/rx'
import axios from 'axios'
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
  const [isOpenControl, setIsOpenControl] = useState(false)
  const [activeTab, setActive] = useState('')
  const [isOpenTool, setIsOpenTool, outRef] = useOutsideClick<HTMLDivElement>(
    () => {
      setIsOpenControl(false)
      setActive('')
    },
  )
  const [info, setInfo] = useState<{
    title: string
    image: string
    description: string
  }>()
  const { value, id } = asset

  const fetchData = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/v1/metadata', {
        params: { link: value.link },
      })
      setInfo(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleUpdateImageLink = (inputValue: string) => {
    onUpdate({
      ...asset,
      value: { ...asset.value, link: inputValue },
    })
    setIsOpenTool(false)
    setActive('')
  }

  const handleMouseEnter = () => {
    setIsOpenControl(true)
  }

  const handleMouseLeave = () => {
    if (isOpenTool) return
    setIsOpenControl(false)
    setIsOpenTool(false)
    setActive('')
  }

  const handleActiveTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpenTool(true)
    setActive((e.currentTarget as HTMLButtonElement).name)
  }

  return (
    <div
      ref={outRef}
      className="relative flex flex-1 max-w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative grid flex-1 grid-item-wrapper overflow-hidden"
        style={{
          gridTemplateColumns:
            width > height ? `${height}fr ${width - height}fr` : '',
          gridTemplateRows:
            width < height ? `${height}fr ${width - height}fr` : '1fr 1fr',
        }}
      >
        <div
          className={`relative w-full overflow-hidden ${width !== height ? 'pb-[100%]' : ''}`}
        >
          <img
            src={info?.image}
            alt={`image_${id}`}
            className="absolute top-0 object-cover w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-2 p-3 overflow-hidden">
          <p className="body2 ellipsis2">{info?.title}</p>
          {(width > 1 || height > 1) && (
            <p
              className={`body3 text-gray-400  ${width > 2 || height > 2 ? 'ellipsis5' : 'ellipsis3'}`}
            >
              {info?.description}
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
              className={`p-1 rounded-lg hover:bg-gray-200 ${activeTab === 'link' ? 'bg-gray-200' : ''}`}
              onClick={handleActiveTab}
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
          </div>
        </div>
      )}
    </div>
  )
}

export default LinkAssetEditor
