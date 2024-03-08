export type ToolType = 'github' | 'content' | 'image' | 'link'

export type AssetType = {
  id: string
  type: ToolType
  command?: 'save' | 'update'
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
  email: string
  userId: string
  accessToken: string
}

export type UserData = {
  id: string
  userId: string
  displayName: string
  shortBio: string
  thumbnail: string
  isLike: boolean
  likeCount: number
  assets: AssetType[]
}
