import { AssetType } from '@/types'
import { MdError } from 'react-icons/md'
import { useMetadataQuery } from '@/hooks/queries/metadata'
import Link from 'next/link'

interface LinkAssetProps {
  asset: AssetType
  width: number
  height: number
}

function LinkAsset({ asset, width, height }: LinkAssetProps) {
  const { value, id } = asset
  const { data, isSuccess, isError } = useMetadataQuery(value.link)
  return (
    <div className="relative flex flex-1 w-full max-width-full">
      {isSuccess && (
        <div className="relative flex-1 grid-item-wrapper overflow-hidden">
          <Link
            href={`${value.link}`}
            className={`relative ${data?.image ? 'grid' : ''} w-full h-full overflow-hidden`}
            style={{
              gridTemplateColumns:
                width > height ? `${height}fr ${width - height}fr` : '',
              gridTemplateRows:
                width < height ? `${height}fr ${width - height}fr` : '1fr 1fr',
            }}
            aria-label="link"
            target="_blank"
          >
            {data?.image && (
              <div
                className={`relative w-full ${width !== height ? 'pb-[100%]' : ''}`}
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
          </Link>
        </div>
      )}
      {isError && (
        <div className="flex flex-col justify-center items-center gap-4 grid-item-wrapper overflow-y-auto p-4">
          <div>
            <MdError size={24} />
          </div>
          <p className="body2 text-gray-400">
            데이터를 불러오는 도중 문제가 발생했어요! 링크를 올바르게 입력했는지
            확인해 주세요.
          </p>
        </div>
      )}
    </div>
  )
}

export default LinkAsset
