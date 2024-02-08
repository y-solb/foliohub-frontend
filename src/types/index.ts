export type ToolType = 'github' | 'content' | 'image'

export type DetailType = {
  id: string
  type: ToolType
  value: any // TODO: 타입 변경
}
