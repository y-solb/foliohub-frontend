import httpClient from '@/lib/httpClient'
import API_ENDPOINTS from '@/constants/apiEndpoints'
import {
  AuthInfoResponse,
  AuthResponse,
  ExperienceLoginPayload,
  RegisterPayload,
} from './type'

export const getAuthInfo = async () => {
  const { data } = await httpClient.get<AuthInfoResponse>(
    API_ENDPOINTS.AUTH.USER,
  )
  return data
}

export const register = async (registerPayload: RegisterPayload) => {
  const { data } = await httpClient.post<AuthResponse>(
    API_ENDPOINTS.AUTH.REGISTER,
    registerPayload,
  )
  return data
}

export const logout = async () => {
  const { data } = await httpClient.post<AuthResponse>(
    API_ENDPOINTS.AUTH.LOGOUT,
  )
  return data
}

export const experienceLogin = async (
  experienceLoginPayload: ExperienceLoginPayload,
) => {
  const { data } = await httpClient.post<AuthResponse>(
    API_ENDPOINTS.AUTH.EXPERIENCE,
    experienceLoginPayload,
  )
  return data
}
