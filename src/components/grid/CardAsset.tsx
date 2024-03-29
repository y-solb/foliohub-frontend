import { AssetType } from '@/types'
import Link from 'next/link'
import { TbLink } from 'react-icons/tb'

interface CardAssetProps {
  asset: AssetType
  width: number
  height: number
}

function CardAsset({ asset, width, height }: CardAssetProps) {
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
                ? `${height}fr ${width - height}fr`
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
              <img
                src={value?.imageUrl}
                alt={`image_${id}`}
                className="absolute top-0 object-cover w-full h-full"
              />
              <div className="image-link absolute bottom-2 left-2 flex rounded-full border border-solid border-gray-100 bg-white shadow-md p-1">
                <TbLink size={20} />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 overflow-hidden">
            {value?.title && <p className="body2 ellipsis2">{value?.title}</p>}
            {(width > 1 || height > 1) && value?.description && (
              <p
                className={`body3 text-gray-400  ${width > 2 || height > 2 ? 'ellipsis5' : 'ellipsis3'}`}
              >
                {value?.description}
              </p>
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
                ? `${height}fr ${width - height}fr`
                : width === height
                  ? '1fr 1fr'
                  : '',
          }}
        >
          {value?.imageUrl && (
            <div
              className={`relative w-full rounded-xl overflow-hidden ${width !== height ? 'h-full' : ''}`}
            >
              <img
                src={value?.imageUrl}
                alt={`image_${id}`}
                className="absolute top-0 object-cover w-full h-full"
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
          <div className="flex flex-col gap-2 overflow-hidden">
            {value?.title && <p className="body2 ellipsis2">{value?.title}</p>}
            {(width > 1 || height > 1) && value?.description && (
              <p
                className={`body3 text-gray-400  ${width > 2 || height > 2 ? 'ellipsis5' : 'ellipsis3'}`}
              >
                {value?.description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default CardAsset
