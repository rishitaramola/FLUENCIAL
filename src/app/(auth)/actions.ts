'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

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

  // Honor redirectTo so middleware-initiated redirects land back on the right page
  const redirectTo = (formData.get('redirectTo') as string | null) ?? '/dashboard'
  redirect(redirectTo)
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
