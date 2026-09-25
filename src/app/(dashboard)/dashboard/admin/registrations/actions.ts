'use server'

import { revalidatePath } from 'next/cache'
import { updateLeadStatus } from '@/lib/data/leads'
import type { LeadStatus } from '@/lib/supabase/types'

export async function changeRegistrationStatus(leadId: string, status: LeadStatus) {
  if (leadId && status) {
    await updateLeadStatus(leadId, status)
    revalidatePath('/dashboard/admin/registrations')
  }
}
