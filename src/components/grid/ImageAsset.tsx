/* eslint-disable @next/next/no-img-element */
import { AssetType } from '@/types'
import { RxLink2 } from 'react-icons/rx'

interface ImageAssetProps {
  breakpoint: string
  asset: AssetType
}

function ImageAsset({ asset, breakpoint }: ImageAssetProps) {
  const { value, id } = asset

  return (
    <div className="relative flex flex-1">
      <div className="relative flex flex-1 rounded-2xl overflow-hidden">
        <div className="relative w-full overflow-hidden">
          <img
            className="relative w-full h-full object-cover"
            src={value.imageUrl}
            alt={`image_${id}`}
            style={{
              objectPosition: `${value.pos[breakpoint]?.x}% ${value.pos[breakpoint]?.y}%`,
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
    </div>
  )
}

export default ImageAsset
