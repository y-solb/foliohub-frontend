import { AssetType, BreakpointType } from '@/types'
import { Layout } from 'react-grid-layout'
import GithubAsset from '../GithubAsset'
import TextAsset from '../TextAsset'
import ImageAsset from '../ImageAsset'
import CardAsset from '../CardAsset'

interface AssetProps {
  asset: AssetType
  breakpoint: BreakpointType
  layout: Layout | undefined
}

function Asset({ asset, breakpoint, layout }: AssetProps) {
  switch (asset.type) {
    case 'github':
      return <GithubAsset asset={asset} width={layout?.w ?? 1} />
    case 'content':
      return <TextAsset asset={asset} />
    case 'image':
      return <ImageAsset asset={asset} breakpoint={breakpoint} />
    case 'card':
      return (
        <CardAsset
          asset={asset}
          width={layout?.w ?? 1}
          height={layout?.h ?? 1}
          breakpoint={breakpoint}
        />
      )
    default:
      return null
  }
}

export default Asset
