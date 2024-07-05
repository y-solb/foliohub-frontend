import httpClient from '@/lib/httpClient'
import API_ENDPOINTS from '@/constants/apiEndpoints'
import { JobCategoryResponse } from './type'

export const getJobCategoryList = async () => {
  const { data } = await httpClient.get<JobCategoryResponse[]>(
    API_ENDPOINTS.JOBCATEGORY.ALL,
  )
  return data
}
