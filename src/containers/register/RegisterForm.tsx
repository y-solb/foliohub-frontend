'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useRegisterMutation } from '@/hooks/queries/auth'
import useOpenAlertModal from '@/hooks/useOpenAlertModal'
import Button from '@/components/common/Button'

function RegisterForm() {
  const { openAlert } = useOpenAlertModal()
  const displayNameRef = useRef<HTMLInputElement | null>(null)
  const usernameRef = useRef<HTMLInputElement | null>(null)

  const router = useRouter()
  const { mutate } = useRegisterMutation()

  const handleSubmit = async () => {
    if (!displayNameRef.current || !displayNameRef.current.value) {
      openAlert('이름을 입력주세요.') // TODO: 쿠키에 registerToken이 없는 경우 return
      return
    }
    if (!usernameRef.current || !usernameRef.current.value) {
      openAlert('ID을 입력주세요.') // TODO: 쿠키에 registerToken이 없는 경우 return
      return
    }

    mutate(
      {
        displayName: displayNameRef.current.value,
        username: usernameRef.current.value,
      },
      {
        onSuccess: (_, variables) => {
          router.push(`/edit/${variables.username}`)
        },
      },
    )
  }

  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center rounded-full border border-solid border-gray-300 bg-white overflow-hidden max-w-80 w-full h-12 pl-4 pr-2 py-2 mb-4">
        <input
          type="text"
          className="body1 w-full"
          ref={displayNameRef}
          placeholder="이름"
        />
      </div>
      <div className="flex items-center rounded-full border border-solid border-gray-300 bg-white overflow-hidden max-w-80 w-full h-12 pl-4 pr-2 py-2">
        <p className="body1">www.foliohub.me/</p>
        <input
          type="text"
          className="body1 w-full"
          ref={usernameRef}
          placeholder="ID"
        />
      </div>
      <Button onClick={handleSubmit}>회원가입</Button>
    </div>
  )
}

export default RegisterForm
