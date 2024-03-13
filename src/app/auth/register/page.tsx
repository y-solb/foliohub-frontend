import RegisterForm from '@/containers/register/RegisterForm'
import Image from 'next/image'

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center brand-gradient h-screen p-20">
      <Image src="/foliohub_text.svg" alt="text_logo" width={120} height={32} />
      <p className="body2 text-gray-600 mt-16 mb-8">
        반가워요! 사용할 ID를 입력하면 회원가입이 완료돼요.
      </p>
      <RegisterForm />
    </div>
  )
}
