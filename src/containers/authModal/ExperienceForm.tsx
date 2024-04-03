'use client'

import { useExperienceLoginMutation } from '@/hooks/queries/auth'
import useOpenAlertModal from '@/hooks/useOpenAlertModal'
import { useRef } from 'react'
import { FaArrowRight } from 'react-icons/fa6'

interface ExperienceFormProps {
  onCloseModal: () => void
}

function ExperienceForm({ onCloseModal }: ExperienceFormProps) {
  const codeRef = useRef<HTMLInputElement | null>(null)
  const { openAlert } = useOpenAlertModal()
  const { mutate } = useExperienceLoginMutation()

  const handleSubmit = () => {
    if (!codeRef.current || !codeRef.current.value) {
      openAlert('코드를 입력주세요.')
      return
    }

    mutate(
      {
        code: codeRef.current.value,
      },
      {
        onSuccess: () => {
          onCloseModal()
          openAlert('로그인이 완료되었어요!', '체험하러 가볼까요?')
        },
        onError: () => {
          openAlert('잘못된 코드에요.', '입력된 코드를 확인해주세요.')
        },
      },
    )
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="flex items-center rounded-full border border-solid border-gray-300 bg-white overflow-hidden max-w-80 w-full h-12 pl-4 pr-2 py-2">
      <input
        type="text"
        className="body1 w-full"
        ref={codeRef}
        placeholder="체험 CODE를 입력하고 이용해 봐요."
        onKeyUp={handleEnterKey}
      />
      <button
        type="button"
        className="flex items-center justify-center rounded-full bg-black min-w-8 min-h-8"
        onClick={handleSubmit}
        aria-label="체험하기"
      >
        <FaArrowRight size={16} className="text-white" />
      </button>
    </div>
  )
}

export default ExperienceForm
