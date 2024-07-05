import httpClient from '@/lib/httpClient'
import API_ENDPOINTS from '@/constants/apiEndpoints'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type JobCategoryData = {
  code: string
  name: string
  sub: { code: string; name: string }[]
}
type UpdateJobCodeVariables = {
  jobCode: string
}

const getJobCategoryList = async (): Promise<JobCategoryData[]> => {
  const { data } = await httpClient.get(API_ENDPOINTS.JOBCATEGORY.ALL)
  return data
}

const editJobCategory = async ({ jobCode }: UpdateJobCodeVariables) => {
  const { data } = await httpClient.put(API_ENDPOINTS.USER.JOBCATEGORY, {
    jobCode,
  })
  return data
}

export const useJobCategoryListQuery = () => {
  return useQuery<JobCategoryData[]>({
    queryKey: ['jobCategoryList'],
    queryFn: getJobCategoryList,
  })
}

export const useJobCategoryMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: UpdateJobCodeVariables) =>
      editJobCategory(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myInfo'],
      })
    },
  })
}
