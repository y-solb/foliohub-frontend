'use client'

import React from 'react'

function ErrorPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mt-32">
        <h1>ERROR</h1>
        <p className="body1 text-gray-400 mt-4 mb-10">
          예상치 못한 오류가 발생했어요!
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

export default ErrorPage
