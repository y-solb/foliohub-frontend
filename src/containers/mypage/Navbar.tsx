'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAVBARLIST = [
  {
    id: 'like',
    title: '좋아요',
    path: '/mypage',
  },
  {
    id: 'account',
    title: '내 계정',
    path: '/mypage/account',
  },
]

function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="relative flex lg:px-20 px-10 py-8">
      <div className="flex w-full border-b border-solid border-gray-200">
        {NAVBARLIST.map((navbar) => (
          <Link
            key={navbar.id}
            href={navbar.path}
            className={`relative font-semibold px-2 py-4 after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:w-full after:h-[3px] ${navbar.path === pathname && 'after:rounded-lg after:bg-black'}`}
          >
            {navbar.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
