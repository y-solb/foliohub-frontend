import { AssetType } from '@/types'
import { useEffect, useState } from 'react'
import axios from 'axios'

interface LinkAssetProps {
  asset: AssetType
  width: number
  height: number
}

function LinkAsset({ asset, width, height }: LinkAssetProps) {
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

  return (
    <div className="relative flex flex-1 max-w-full">
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
    </div>
  )
}

export default LinkAsset
