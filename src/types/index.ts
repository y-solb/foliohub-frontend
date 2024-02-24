export type ToolType = 'github' | 'content' | 'image' | 'link'

export type AssetType = {
  id: string
  type: ToolType
  command?: 'save' | 'update'
  value: any // TODO: 타입 변경
}

export type AuthInfo = {
  id: string
  email: string
  userId: string
  accessToken: string
}
