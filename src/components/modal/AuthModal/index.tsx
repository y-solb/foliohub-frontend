'use client'

import { useRecoilState } from 'recoil'
import authModalState from '@/recoil/atoms/authModalState'
import { FcGoogle } from 'react-icons/fc'
import ExperienceForm from '@/containers/authModal/ExperienceForm'
import Modal from '@/components/common/Modal'
import Logo from '@/components/common/Logo'
import API_ENDPOINTS from '@/constants/apiEndpoints'

function AuthModal() {
  const [authModal, setAuthModal] = useRecoilState(authModalState)

  const handleClose = () => {
    setAuthModal(false)
  }

  return (
    <Modal isOpen={authModal} onClose={handleClose}>
      <div className="flex flex-col items-center justify-center gap-8 w-96 p-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <Logo />
          <span className="body2 text-gray-400">
            당신의 여정을 기록하고, 성장을 공유해 봐요!
          </span>
        </div>
        <ExperienceForm onCloseModal={handleClose} />
        <a
          href={`${process.env.NEXT_PUBLIC_API_HOST}${API_ENDPOINTS.AUTH.GOOGLE}`}
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
