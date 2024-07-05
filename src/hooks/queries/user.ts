import httpClient from '@/lib/httpClient'
import API_ENDPOINTS from '@/constants/apiEndpoints'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type MyInfoData = {
  id: string
  username: string
  jobCategoryCode: string
  displayName: string
  thumbnail: string
  job: string
  jobCode: string
}

type AuthInfo = {
  message: string
}

const getMyInfo = async (): Promise<MyInfoData> => {
  const { data } = await httpClient.get(API_ENDPOINTS.USER.MY)
  return data
}

const deleteAccount = async (): Promise<AuthInfo> => {
  const { data } = await httpClient.delete(API_ENDPOINTS.USER.ACCOUNT)
  return data
}

export const useMyQuery = () => {
  return useQuery<MyInfoData>({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
  })
}

export const useDeleteAccountMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteAccount(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authInfo'] })
    },
  })
}
