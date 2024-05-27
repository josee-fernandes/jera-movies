import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const isAuthenticated =
    !!request.cookies.has('next-auth.session-token') ||
    !!request.cookies.has('__Secure-next-auth.session-token') ||
    !!request.cookies.has('credentials.session-token') ||


  if (!request.url.includes('/browse') && isAuthenticated) {
    return NextResponse.redirect(new URL('/browse', request.url))
  }

  if (request.url.includes('/browse') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
