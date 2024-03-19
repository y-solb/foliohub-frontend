'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { FaArrowRight } from 'react-icons/fa6'
import { useRegisterMutation } from '@/hooks/queries/auth'

function RegisterForm() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const { mutate } = useRegisterMutation()

  const handleSubmit = async () => {
    if (!inputRef.current || !inputRef.current.value) {
      alert('ID를 입력해주세요.') // TODO: alert로 교체 && 쿠키에 registerToken이 없는 경우 return
      return
    }
    mutate(inputRef.current.value)
    router.push('/')
  }

  return (
    <div className="flex items-center justify-center rounded-full border border-solid border-gray-300 bg-white overflow-hidden  h-12 pl-4 pr-2 py-2">
      <span>https://www.foliohub.me/</span>
      <input type="text" ref={inputRef} placeholder="ID" />
      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-black w-8 h-8"
        onClick={handleSubmit}
        aria-label="회원가입"
      >
        <FaArrowRight size={16} className="text-white" />
      </button>
    </div>
  )
}

export default RegisterForm
