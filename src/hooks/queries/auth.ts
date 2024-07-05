import { experienceLogin, getAuthInfo, logout, register } from '@/services/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useAuthQuery = () => {
  return useQuery({
    queryKey: ['authInfo'],
    queryFn: getAuthInfo,
    staleTime: Infinity,
  })
}

export const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authInfo'] })
    },
  })
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authInfo'] })
    },
  })
}

export const useExperienceLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: experienceLogin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authInfo'],
      })
    },
  })
}
