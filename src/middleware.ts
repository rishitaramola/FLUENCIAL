import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import type { AppRole } from '@/lib/supabase/types'

// ─── Route-role mapping ────────────────────────────────────────────────────────

const ROUTE_ROLES: Array<{ prefix: string; allowed: AppRole[] }> = [
  { prefix: '/dashboard/admin',   allowed: ['ADMIN'] },
  { prefix: '/dashboard/teacher', allowed: ['ADMIN', 'TEACHER'] },
  { prefix: '/dashboard/student', allowed: ['ADMIN', 'TEACHER', 'STUDENT'] },
  { prefix: '/dashboard',         allowed: ['ADMIN', 'TEACHER', 'STUDENT'] },
]

// ─── Helpers ───────────────────────────────────────────────────────────────────

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

// ─── Middleware ────────────────────────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  // Keep a mutable response so cookie writes from createServerClient propagate.
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
          // Write cookies to the request first so downstream RSCs see them.
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          )
          // Rebuild the response so Set-Cookie headers reach the browser.
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          )
        },
      },
    },
  )

  // IMPORTANT: Do NOT put any logic between createServerClient and getUser().
  // getUser() validates the JWT against the Supabase Auth server — it is the
  // canonical security check; getSession() only reads from the cookie.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register')

  // ── Unauthenticated ────────────────────────────────────────────────────────
  if (!user) {
    if (!isAuthPage) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirectTo', pathname)
      return NextResponse.redirect(url)
    }
    return response
  }

  // ── Authenticated — redirect away from auth pages ─────────────────────────
  if (isAuthPage) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    url.searchParams.delete('redirectTo')
    return NextResponse.redirect(url)
  }

  // ── Role-based access ──────────────────────────────────────────────────────
  const matched = ROUTE_ROLES.find((r) => pathname.startsWith(r.prefix))
  if (matched) {
    // Decode role from the JWT (set by custom_access_token_hook).
    // Used only for routing; RLS enforces real data-layer security.
    const { data: { session } } = await supabase.auth.getSession()
    const userRole = session?.access_token
      ? getRoleFromToken(session.access_token)
      : 'STUDENT'

    if (!matched.allowed.includes(userRole)) {
      // Redirect to appropriate dashboard rather than a generic 403
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *   - _next/static  (static files)
     *   - _next/image   (Next.js image optimisation)
     *   - favicon.ico
     *   - public assets (svg, png, jpg, webp, ico)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|ico)$).*)',
  ],
}
