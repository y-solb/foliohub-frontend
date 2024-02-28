import { AssetType } from '@/types'
import { Layout } from 'react-grid-layout'
import GithubAsset from './GithubAsset'
import TextAsset from './TextAsset'
import ImageAsset from './ImageAsset'
import LinkAsset from './LinkAsset'

interface AssetProps {
  asset: AssetType
  layout: Layout | undefined
}

function Asset({ asset, layout }: AssetProps) {
  switch (asset.type) {
    case 'github':
      return <GithubAsset asset={asset} width={layout?.w ?? 1} />
    case 'content':
      return <TextAsset asset={asset} />
    case 'image':
      return <ImageAsset asset={asset} />
    case 'link':
      return (
        <LinkAsset
          asset={asset}
          width={layout?.w ?? 1}
          height={layout?.h ?? 1}
        />
      )
    default:
      return null
  }
}

export default Asset
