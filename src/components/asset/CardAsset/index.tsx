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

function CardAsset({ asset, width, height, breakpoint }: CardAssetProps) {
  const { value, id } = asset

  return (
    <div className="relative flex flex-1 w-full max-width-full">
      {value.link ? (
        <Link
          href={`${value.link}`}
          className={`relative flex-1 ${value?.imageUrl ? 'grid' : ''}  grid-item-wrapper overflow-hidden p-3 gap-2`}
          style={{
            gridTemplateColumns:
              width > height ? `${height}fr ${width - height}fr` : '',
            gridTemplateRows:
              // eslint-disable-next-line no-nested-ternary
              width < height
                ? `${height}fr ${height - width}fr`
                : width === height
                  ? '1fr 1fr'
                  : '',
          }}
          aria-label="link"
          target="_blank"
        >
          {value?.imageUrl && (
            <div
              className={`relative w-full rounded-xl overflow-hidden ${width !== height ? 'h-full' : ''}`}
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
              <div className="image-link absolute bottom-2 left-2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1">
                <TbLink size={20} />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
            {value?.title && (
              <p className="body2 font-medium">{value?.title}</p>
            )}
            {value?.description && (
              <p className="body3 text-gray-400">{value?.description}</p>
            )}
          </div>
        </Link>
      ) : (
        <div
          className={`relative flex-1 ${value?.imageUrl ? 'grid' : ''}  grid-item-wrapper overflow-hidden p-3 gap-2`}
          style={{
            gridTemplateColumns:
              width > height ? `${height}fr ${width - height}fr` : '',
            gridTemplateRows:
              // eslint-disable-next-line no-nested-ternary
              width < height
                ? `${height}fr ${height - width}fr`
                : width === height
                  ? '1fr 1fr'
                  : '',
          }}
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
          )}
          <div className="flex flex-col gap-2 overflow-x-hidden	overflow-y-auto">
            {value?.title && (
              <p className="body2 font-medium">{value?.title}</p>
            )}
            {value?.description && (
              <p className="body3 text-gray-400">{value?.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CardAsset
