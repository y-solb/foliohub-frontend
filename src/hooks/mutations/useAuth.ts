import httpClient from '@/lib/httpClient'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type RegType = {
  success: boolean
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

export default function useAuth() {
  const queryClient = useQueryClient()

  const registerMutation = useMutation({
    mutationFn: (userId: string) => register(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authInfo'] })
    },
  })

  const logoutMutation = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authInfo'] })
    },
  })

  return { registerMutation, logoutMutation }
}
