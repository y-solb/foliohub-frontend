import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/mypage', '/edit/:path*'],
}
