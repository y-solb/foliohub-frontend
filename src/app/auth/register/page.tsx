'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { FaArrowRight } from 'react-icons/fa6'
import useAuth from '@/hooks/mutations/useAuth'

export default function RegisterPage() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()
  const { registerMutation } = useAuth()

  const handleSubmit = async () => {
    if (!inputRef.current || !inputRef.current.value) {
      alert('ID를 입력해주세요.') // TODO: alert로 교체 && 쿠키에 registerToken이 없는 경우 return
      return
    }

    registerMutation.mutate(inputRef.current.value)
    router.push('/')
    // try {
    //   const { data } = await httpClient.post('/v1/auth/register', {
    //     username: inputRef.current.value,
    //   })
    //   console.log(data)

    // } catch (error) {
    //   console.error(error)
    //   throw error
    // }
  }
  return (
    <>
      {/* <div className="flex flex-col items-center justify-center brand-gradient h-screen p-20">
        <Image
          src="/foliohub_text.svg"
          alt="text_logo"
          width={120}
          height={32}
        />
        <div className="flex items-center flex-col p-10 toolbar-wrapper mt-8 bg-white">
          <h3>회원가입</h3>
          <p className="body2 text-gray-500">환영해요</p>
          <div className="flex items-center justify-center rounded-full border border-solid border-gray-300 bg-white overflow-hidden pl-4 pr-2 py-2 mt-4">
            <span>https://www.foliohub.me/</span>
            <input type="text" ref={inputRef} placeholder="id" />
            <button
              type="button"
              className="rounded-full bg-black p-1"
              onClick={handleSubmit}
              aria-label="회원가입"
            >
              <FaArrowRight size={16} className="text-white" />
            </button>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <div className="flex items-center justify-center rounded-full border border-solid border-gray-300 bg-white overflow-hidden px-4 py-2">
              <span>https://www.foliohub.me/</span>
              <input type="text" ref={inputRef} placeholder="id" />
            </div>
            <button
              type="button"
              className="rounded-full w-6 h-6
             bg-black p-1"
              onClick={handleSubmit}
              aria-label="회원가입"
            >
              <FaArrowRight size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col items-center justify-center brand-gradient h-screen p-20">
        <Image
          src="/foliohub_text.svg"
          alt="text_logo"
          width={120}
          height={32}
        />
        {/* <h3 className="mt-16">회원가입</h3> */}
        <p className="body2 text-gray-500 mt-16 mb-8">
          반가워요! 사용할 ID를 입력하면 회원가입이 완료돼요.
        </p>

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
        {/* <div className="flex gap-2 items-center mt-4">
          <div className="flex items-center justify-center rounded-full border border-solid border-gray-300 bg-white overflow-hidden h-12 px-4 py-2">
            <span>https://www.foliohub.me/</span>
            <input type="text" ref={inputRef} placeholder="ID" />
          </div>
          <button
            type="button"
            className="flex items-center justify-center rounded-full w-10 h-10
             bg-black p-2"
            onClick={handleSubmit}
            aria-label="회원가입"
          >
            <FaArrowRight size={18} className="text-white" />
          </button>
        </div> */}
      </div>
      {/* <div className="flex flex-col items-center justify-center brand-gradient h-screen p-20">
        <div className="flex items-center flex-col p-10 toolbar-wrapper mt-8 bg-white">
          <Image
            src="/foliohub_text.svg"
            alt="text_logo"
            width={120}
            height={32}
          />
          <h3>회원가입</h3>
          <p className="body2 text-gray-500">환영해요</p>

          <div className="flex items-center justify-center rounded-full border border-solid border-gray-300 bg-white overflow-hidden pl-4 pr-2 py-2 mt-4">
            <span>https://www.foliohub.me/</span>
            <input type="text" ref={inputRef} placeholder="id" />
            <button
              type="button"
              className="rounded-full bg-black p-1"
              onClick={handleSubmit}
              aria-label="회원가입"
            >
              <FaArrowRight size={16} className="text-white" />
            </button>
          </div>
          <div className="flex gap-2 items-center mt-4">
            <div className="flex items-center justify-center rounded-full border border-solid border-gray-300 bg-white overflow-hidden px-4 py-2">
              <span>https://www.foliohub.me/</span>
              <input type="text" ref={inputRef} placeholder="id" />
            </div>
            <button
              type="button"
              className="rounded-full w-6 h-6
             bg-black p-1"
              onClick={handleSubmit}
              aria-label="회원가입"
            >
              <FaArrowRight size={16} className="text-white" />
            </button>
          </div>
        </div>
      </div> */}
    </>
  )
}
