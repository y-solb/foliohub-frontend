import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get('refreshToken')?.value

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/mypage', '/edit/:path*'],
}
