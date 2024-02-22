export type ToolType = 'github' | 'content' | 'image' | 'link'

export type DetailType = {
  id: string
  type: ToolType
  value: any // TODO: 타입 변경
}

export type AuthInfo = {
  id: string
  email: string
  username: string
  accessToken: string
}
