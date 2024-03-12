import { AssetType } from '@/types'

import { useMetadataQuery } from '@/hooks/queries/metadata'

interface LinkAssetProps {
  asset: AssetType
  width: number
  height: number
}

function LinkAsset({ asset, width, height }: LinkAssetProps) {
  const { value, id } = asset
  const { data } = useMetadataQuery(value.link)
  return (
    <div className="relative flex flex-1 w-full max-width-full">
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
    </div>
  )
}

export default LinkAsset
