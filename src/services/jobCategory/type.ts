export interface JobCategoryResponse {
  code: string
  name: string
  sub: { code: string; name: string }[]
}
