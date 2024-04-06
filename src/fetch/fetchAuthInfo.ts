import { AuthInfo } from '@/types'
import { cookies } from 'next/headers'

// eslint-disable-next-line import/prefer-default-export
export const fetchAuthInfo = async (): Promise<AuthInfo | null> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/v1/auth`, {
    headers: { Cookie: cookies().toString() },
  })

  if (res.status !== 200) {
    return null
  }
  return res.json()
}
