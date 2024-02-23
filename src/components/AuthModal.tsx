'use client'

import { useRecoilState } from 'recoil'
import authModalState from '@/recoil/atoms/authModalState'
import { FcGoogle } from 'react-icons/fc'
import Image from 'next/image'
import Modal from './common/Modal'

function AuthModal() {
  const [authModal, setAuthModal] = useRecoilState(authModalState)

  return (
    <Modal
      isOpen={authModal}
      onClose={() => {
        setAuthModal(false)
      }}
    >
      <div className="flex flex-col items-center justify-center gap-8 w-96 p-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/foliohub_text.svg"
            alt="text_logo"
            width={120}
            height={32}
          />
          <span className="body2 text-gray-500">
            당신의 여정을 기록하고, 성장을 공유해 봐요!
          </span>
        </div>
        <a
          href={`${process.env.NEXT_PUBLIC_API_HOST}/v1/auth/redirect/google`}
          className="flex items-center justify-center gap-4 rounded-full bg-black text-white w-full h-12 px-8"
        >
          <FcGoogle size={16} />
          <span className="body2">구글로 시작하기</span>
        </a>
      </div>
    </Modal>
  )
}

export default AuthModal
