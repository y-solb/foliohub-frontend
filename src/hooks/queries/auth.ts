import httpClient from '@/lib/httpClient'
import API_ENDPOINTS from '@/constants/apiEndpoints'
import { AuthInfo } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

type AuthData = {
  success: boolean
}
type RegisterVariables = {
  displayName: string
  username: string
}
type ExperienceLoginVariables = {
  code: string
}

const getAuthInfo = async (): Promise<AuthInfo> => {
  const { data } = await httpClient.get(API_ENDPOINTS.AUTH.USER)
  return data
}

const register = async (
  registerVariables: RegisterVariables,
): Promise<AuthData> => {
  const { data } = await httpClient.post(
    API_ENDPOINTS.AUTH.REGISTER,
    registerVariables,
  )
  return data
}

const logout = async (): Promise<AuthData> => {
  const { data } = await httpClient.post(API_ENDPOINTS.AUTH.LOGOUT)
  return data
}

const experienceLogin = async ({ code }: ExperienceLoginVariables) => {
  const { data } = await httpClient.post(API_ENDPOINTS.AUTH.EXPERIENCE, {
    code,
  })
  return data
}

export const useAuthQuery = () => {
  return useQuery<AuthInfo>({
    queryKey: ['authInfo'],
    queryFn: getAuthInfo,
    staleTime: Infinity,
  })
}

export const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (variables: RegisterVariables) => register(variables),
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

export const useExperienceLoginMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: ExperienceLoginVariables) =>
      experienceLogin(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['authInfo'],
      })
    },
  })
}
