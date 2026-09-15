'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createLead } from '@/lib/data/leads'

export async function submitLeadAction(formData: FormData): Promise<void> {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const phone = (formData.get('phone') as string)?.trim() || null
  const courseId = (formData.get('courseId') as string) || null
  const notes = (formData.get('notes') as string)?.trim() || null

  if (!name || !email) {
    redirect('/contact?error=Name+and+email+are+required')
  }

  try {
    await createLead({
      name,
      email,
      phone,
      course_id: courseId,
      notes,
      status: 'NEW',
    })

    revalidatePath('/dashboard/admin/leads')
  } catch (error: any) {
    console.error('Lead submission error:', error)
    redirect('/contact?error=Failed+to+submit+inquiry')
  }

  redirect('/contact?message=Thank+you!+Our+academic+counselor+will+reach+out+shortly.')
}
