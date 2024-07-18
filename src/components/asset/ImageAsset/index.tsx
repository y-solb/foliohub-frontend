import { BreakpointType, ImageAssetType } from '@/types'
import { TbLink } from 'react-icons/tb'
import Image from 'next/image'

interface ImageAssetProps {
  breakpoint: BreakpointType
  asset: ImageAssetType
}

function ImageAsset({ asset, breakpoint }: ImageAssetProps) {
  const { value, id } = asset

  return (
    <div className="relative flex flex-1">
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
        {value.link && (
          <a
            href={value.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="related-image-link"
            className="image-link absolute bottom-2 left-2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1"
          >
            <TbLink size={20} />
          </a>
        )}
      </div>
    </div>
  )
}

export default ImageAsset
