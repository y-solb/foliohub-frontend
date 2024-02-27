import httpClient from '@/lib/httpClient'
import { AuthInfo } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type RegType = {
  success: boolean
}

const getAuthInfo = async (): Promise<AuthInfo> => {
  const { data } = await httpClient.get('/v1/auth')
  return data
}

const register = async (userId: string): Promise<RegType> => {
  const { data } = await httpClient.post('/v1/auth/register', {
    userId,
  })
  return data
}

const logout = async (): Promise<RegType> => {
  const { data } = await httpClient.post('/v1/auth/logout')
  return data
}

export const useAuthQuery = () => {
  return useQuery<AuthInfo>({
    queryKey: ['authInfo'],
    queryFn: getAuthInfo,
  })
}

export const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (userId: string) => register(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authInfo'] })
    },
  })
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authInfo'] })
    },
  })
}
