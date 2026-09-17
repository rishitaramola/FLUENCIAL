import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { AppRole } from '@/lib/supabase/types'

const ROUTE_ROLES: Array<{ prefix: string; allowed: AppRole[] }> = [
  { prefix: '/dashboard/admin', allowed: ['ADMIN'] },
  { prefix: '/dashboard/teacher', allowed: ['ADMIN', 'TEACHER'] },
  { prefix: '/dashboard/student', allowed: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { prefix: '/dashboard', allowed: ['ADMIN', 'TEACHER', 'STUDENT'] },
]

function getRoleFromToken(accessToken: string): AppRole {
  try {
    const payload = JSON.parse(
      Buffer.from(accessToken.split('.')[1], 'base64url').toString(),
    ) as { user_role?: AppRole }
    return payload.user_role ?? 'STUDENT'
  } catch {
    return 'STUDENT'
  }
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')
  const isDashboard = pathname.startsWith('/dashboard')

  if (!user) {
    if (isDashboard) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(url)
    }
    return response
  }

  if (isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.searchParams.delete('redirectTo')
    return NextResponse.redirect(url)
  }

  const matched = ROUTE_ROLES.find((r) => pathname.startsWith(r.prefix))
  if (matched) {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    const userRole = session?.access_token ? getRoleFromToken(session.access_token) : 'STUDENT'

    if (!matched.allowed.includes(userRole)) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
