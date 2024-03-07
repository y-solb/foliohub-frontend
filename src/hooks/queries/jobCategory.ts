import httpClient from '@/lib/httpClient'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type JobCategory = {
  code: string
  name: string
  sub: { code: string; name: string }[]
}
type UpdateJobCodeVariables = {
  jobCode: string
}

const getJobCategoryList = async (): Promise<JobCategory[]> => {
  const { data } = await httpClient.get('/v1/job-category/list')
  return data
}

const editJobCategory = async ({ jobCode }: UpdateJobCodeVariables) => {
  const { data } = await httpClient.put('/v1/job-category', {
    jobCode,
  })
  return data
}

export const useJobCategoryListQuery = () => {
  return useQuery<JobCategory[]>({
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
