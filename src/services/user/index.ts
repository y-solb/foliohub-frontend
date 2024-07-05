import httpClient from '@/lib/httpClient'
import API_ENDPOINTS from '@/constants/apiEndpoints'
import {
  DeleteAccountResponse,
  MyInfoResponse,
  UpdateJobCategoryPayload,
  UpdateJobCategoryResponse,
} from './type'

export const getMyInfo = async () => {
  const { data } = await httpClient.get<MyInfoResponse>(API_ENDPOINTS.USER.MY)
  return data
}

export const editJobCategory = async (
  updateJobCategoryPayload: UpdateJobCategoryPayload,
) => {
  const { data } = await httpClient.put<UpdateJobCategoryResponse>(
    API_ENDPOINTS.USER.JOBCATEGORY,
    updateJobCategoryPayload,
  )
  return data
}

export const deleteAccount = async () => {
  const { data } = await httpClient.delete<DeleteAccountResponse>(
    API_ENDPOINTS.USER.ACCOUNT,
  )
  return data
}
