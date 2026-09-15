'use server'

import { revalidatePath } from 'next/cache'
import { updateLeadStatus } from '@/lib/data/leads'
import type { LeadStatus } from '@/lib/supabase/types'

export async function changeLeadStatus(formData: FormData) {
  const leadId = formData.get('leadId') as string
  const status = formData.get('status') as LeadStatus

  if (leadId && status) {
    await updateLeadStatus(leadId, status)
    revalidatePath('/dashboard/admin/leads')
    revalidatePath('/dashboard/admin')
  }
}
