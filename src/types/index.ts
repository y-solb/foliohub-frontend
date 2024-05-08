export type ToolType = 'github' | 'content' | 'image' | 'card'

export type AssetType = {
  id: string
  layoutId: string
  type: ToolType
  command?: 'save' | 'update' | 'delete'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  // {
  //   githubId?: string
  //   link?: string
  //   imageUrl?: string
  //   content?: string
  // }  TODO: 타입 변경
}

export type AuthInfo = {
  id: string
  username: string
  thumbnail: string | null
}

export type SocialLinks = {
  blogLink: string | null
  facebookLink: string | null
  githubLink: string | null
  instagramLink: string | null
  linkedinLink: string | null
  twitterLink: string | null
  youtubeLink: string | null
}

export type UserData = {
  id: string
  username: string
  displayName: string
  shortBio: string
  thumbnail: string
  isLike: boolean
  likeCount: number
  assets: AssetType[]
}

export type Activity = {
  date: string
  count: number
  level: number
}

export type PortfolioItemType = {
  id: string
  displayName: string
  shortBio: string
  thumbnail: string | null
  username: string
  userJob: string | null
  likeCount: number
  updatedAt: string
}
