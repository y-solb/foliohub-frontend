import { Metadata } from 'next'
// import NotFoundError from '@/components/Error/NotFoundError'

export const metadata: Metadata = {
  title: 'Foliohub - 404',
  robots: 'noindex',
}

export default function NotFound() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-32">
        <h1>404 ERROR</h1>
        <p className="body1 text-gray-400 mt-4 mb-10">
          해당 페이지를 찾을 수 없어요!
        </p>
        <a
          href="/"
          className="flex items-center justify-center rounded-full bg-black text-white h-12 px-8"
        >
          <span>메인으로 돌아가기</span>
        </a>
      </div>
      <div className="fixed bottom-80 left-10 rotate-[80deg]">
        <div className="animate-wave1 wave bg-[#42A7E3]" />
        <div className="animate-wave2 wave bg-[#5090E6]" />
        <div className="animate-wave3 wave bg-[#607AE9]" />
      </div>
    </>
  )
}
