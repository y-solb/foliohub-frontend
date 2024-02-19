'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import httpClient from '@/lib/httpClient'

export default function RegisterPage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const handleSubmit = async () => {
    if (!inputRef.current) {
      return
    }
    console.log(inputRef.current.value)
    try {
      const { data } = await httpClient.post('/v1/auth/register', {
        username: inputRef.current.value,
      })
      console.log(data)
      router.push('/')
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  return (
    <div>
      회원가입 페이지입니다 아이디입력해주세요
      <input type="text" ref={inputRef} />
      <button type="button" onClick={handleSubmit}>
        회원가입해버리기!
      </button>
    </div>
  )
}
