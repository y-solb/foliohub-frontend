import { getGridTemplate } from '@/lib/asset'
import { BreakpointType, CardAssetType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { TbLink } from 'react-icons/tb'

interface CardAssetProps {
  asset: CardAssetType
  width: number
  height: number
  breakpoint: BreakpointType
}

function CardContent({ asset, width, height, breakpoint }: CardAssetProps) {
  const { id, value } = asset
  return (
    <div
      className={`relative flex-1 ${value?.imageUrl ? 'grid' : ''}  grid-item-wrapper overflow-hidden p-3 gap-2`}
      style={getGridTemplate(width, height)}
    >
      {value?.imageUrl && (
        <div className="relative w-full h-full rounded-xl overflow-hidden">
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
            <div
              aria-label="related-image-link"
              className="image-link absolute bottom-2 left-2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1 transition-all group-hover:rotate-90 group-hover:scale-105"
            >
              <TbLink size={20} />
            </div>
          )}
        </div>
      )}
      <div className="flex flex-col gap-2 overflow-x-hidden	overflow-y-auto">
        {value?.title && <p className="body2 font-medium">{value?.title}</p>}
        {value?.description && (
          <p className="body3 text-gray-400">{value?.description}</p>
        )}
      </div>
    </div>
  )
}

function CardAsset({ asset, width, height, breakpoint }: CardAssetProps) {
  const { value } = asset

  return (
    <div className="relative flex flex-1 w-full max-width-full group">
      {value.link ? (
        <Link
          href={value.link}
          className="flex flex-1 w-full max-width-full"
          target="_blank"
          rel="noopener noreferrer"
        >
          <CardContent
            asset={asset}
            width={width}
            height={height}
            breakpoint={breakpoint}
          />
        </Link>
      ) : (
        <CardContent
          asset={asset}
          width={width}
          height={height}
          breakpoint={breakpoint}
        />
      )}
    </div>
  )
}

export default CardAsset
