import { AuthInfo } from '@/types'

export type AuthInfoResponse = AuthInfo | null

export interface AuthResponse {
  success: boolean
  message: string
}

export interface RegisterPayload {
  displayName: string
  username: string
}

export interface ExperienceLoginPayload {
  code: string
}
