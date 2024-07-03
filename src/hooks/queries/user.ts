import httpClient from '@/lib/httpClient'
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
  const { data } = await httpClient.get('/v1/user/my')
  return data
}

const deleteAccount = async (): Promise<AuthInfo> => {
  const { data } = await httpClient.delete('/v1/user/account')
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
