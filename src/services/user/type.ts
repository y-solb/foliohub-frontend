export interface MyInfoResponse {
  id: string
  username: string
  jobCategoryCode: string
  displayName: string
  thumbnail: string
  job: string
  jobCode: string
}

export interface UpdateJobCategoryPayload {
  jobCode: string
}

export interface UpdateJobCategoryResponse {
  success: boolean
  message: string
}

export interface DeleteAccountResponse {
  success: boolean
  message: string
}
