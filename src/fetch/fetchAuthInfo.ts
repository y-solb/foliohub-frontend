import API_ENDPOINTS from '@/constants/apiEndpoints'
import { AuthInfo } from '@/types'
import { cookies } from 'next/headers'

export const fetchAuthInfo = async (): Promise<AuthInfo | null> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}${API_ENDPOINTS.AUTH.USER}`,
    {
      headers: { Cookie: cookies().toString() },
    },
  )

  if (res.status !== 200) {
    return null
  }
  return res.json()
}
