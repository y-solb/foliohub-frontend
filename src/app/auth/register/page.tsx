import RegisterForm from '@/containers/register/RegisterForm'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: '회원가입 | FolioHub',
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-10">
      <div className="flex flex-col items-center gap-4 mb-16">
        <Image
          src="/foliohub_logo.svg"
          alt="text_logo"
          width={40}
          height={40}
        />
        <Image
          src="/foliohub_text_logo.svg"
          alt="text_logo"
          width={120}
          height={32}
        />
      </div>
      <h1>당신의 여정을 기록하고,</h1>
      <h1>성장을 공유해 봐요!</h1>
      <p className="body2 text-gray-400 mt-8 mb-8">
        반가워요.👋 사용할 이름과 ID를 입력하면 회원가입이 완료돼요.
      </p>
      <RegisterForm />
    </div>
  )
}
