export type BreakpointType = 'md' | 'lg'

export type ToolType = 'github' | 'content' | 'image' | 'card'

export type CommandType = 'save' | 'update' | 'delete'

export interface BaseAsset<T extends ToolType, V> {
  id: string
  layoutId: string
  type: T
  command?: CommandType
  value: V
}

export type AssetType =
  | GithubAssetType
  | TextAssetType
  | ImageAssetType
  | CardAssetType

export type GithubAssetType = BaseAsset<'github', GithubValue>
export type TextAssetType = BaseAsset<'content', ContentValue>
export type ImageAssetType = BaseAsset<'image', ImageValue>
export type CardAssetType = BaseAsset<'card', CardValue>

export type AssetValueType = GithubValue | ContentValue | ImageValue | CardValue

interface GithubValue {
  githubId: string
}

interface ContentValue {
  content: string
}

interface ImageValue {
  imageUrl: string
  link: string
  pos: { md: { x: number; y: number }; lg: { x: number; y: number } }
}

interface CardValue {
  imageUrl: string
  link: string
  pos: { md: { x: number; y: number }; lg: { x: number; y: number } }
  title: string
  description: string
}

export interface AuthInfo {
  id: string
  username: string
  thumbnail: string | null
}

export interface SocialLinks {
  blogLink: string | null
  facebookLink: string | null
  githubLink: string | null
  instagramLink: string | null
  linkedinLink: string | null
  twitterLink: string | null
  youtubeLink: string | null
}

export interface Portfolio {
  id: string
  username: string
  displayName: string
  shortBio: string
  thumbnail: string
  isLike: boolean
  likeCount: number
  assets: AssetType[]
}

export interface Activity {
  date: string
  count: number
  level: number
}

export interface PortfolioItemType {
  id: string
  displayName: string
  shortBio: string
  thumbnail: string | null
  username: string
  userJob: string | null
  likeCount: number
  userId: string
}
