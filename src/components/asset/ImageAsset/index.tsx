import { BreakpointType, ImageAssetType } from '@/types'
import Link from 'next/link'
import { TbLink } from 'react-icons/tb'
import Image from 'next/image'

interface ImageAssetProps {
  breakpoint: BreakpointType
  asset: ImageAssetType
}

function ImageContent({ asset, breakpoint }: ImageAssetProps) {
  const { id, value } = asset
  return (
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
        <div
          aria-label="related-image-link"
          className="image-link absolute bottom-2 left-2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1 transition-all group-hover:rotate-90 group-hover:scale-105"
        >
          <TbLink size={20} />
        </div>
      )}
    </div>
  )
}

function ImageAsset({ asset, breakpoint }: ImageAssetProps) {
  const { value } = asset

  return (
    <div className="relative flex flex-1 group">
      {value.link ? (
        <Link
          href={value.link}
          className="flex flex-1 w-full max-width-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageContent asset={asset} breakpoint={breakpoint} />
        </Link>
      ) : (
        <ImageContent asset={asset} breakpoint={breakpoint} />
      )}
    </div>
  )
}

export default ImageAsset
