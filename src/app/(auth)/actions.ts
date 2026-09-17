'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: (formData.get('email') as string).trim().toLowerCase(),
    password: formData.get('password') as string,
  })

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')

  const { safeInternalPath } = await import('@/lib/auth')
  redirect(safeInternalPath(formData.get('redirectTo') as string | null))
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: (formData.get('email') as string).trim().toLowerCase(),
    password: formData.get('password') as string,
    options: {
      data: {
        full_name: (formData.get('fullName') as string).trim(),
      },
    },
  })

  if (error) {
    redirect(`/register?error=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check+your+email+to+confirm+your+account.')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient()
  const origin = (await headers()).get('origin')

  const { error } = await supabase.auth.resetPasswordForEmail(
    (formData.get('email') as string).trim().toLowerCase(),
    { redirectTo: `${origin}/auth/callback?next=/reset-password` }
  )

  if (error) {
    redirect(`/forgot-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/forgot-password?message=Check+your+email+for+a+password+reset+link.')
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (password !== confirmPassword) {
    redirect('/reset-password?error=Passwords+do+not+match.')
  }

  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    redirect(`/reset-password?error=${encodeURIComponent(error.message)}`)
  }

  redirect('/login?message=Password+updated+successfully.+Please+sign+in.')
}
