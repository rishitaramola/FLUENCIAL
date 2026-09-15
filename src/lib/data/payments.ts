import { createClient } from '@/lib/supabase/server'
import type { Tables } from '@/lib/supabase/types'

export type PaymentWithDetails = Tables<'payments'> & {
  course?: Tables<'courses'> | null
  student?: (Tables<'students'> & { profile?: Tables<'profiles'> | null }) | null
}

export async function getAllPayments(): Promise<PaymentWithDetails[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      course:courses!payments_course_id_fkey(*),
      student:students!payments_student_id_fkey(
        *,
        profile:profiles!students_id_fkey(*)
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching payments:', error.message)
    return []
  }
  return (data as unknown as PaymentWithDetails[]) ?? []
}

export async function getPaymentsByStudent(studentId: string): Promise<PaymentWithDetails[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('payments')
    .select(`
      *,
      course:courses!payments_course_id_fkey(*)
    `)
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Error fetching payments for student ${studentId}:`, error.message)
    return []
  }
  return (data as unknown as PaymentWithDetails[]) ?? []
}

export async function getFinancialSummary() {
  const payments = await getAllPayments()
  const successfulPayments = payments.filter((p) => p.status === 'SUCCESS')
  const totalRevenuePaise = successfulPayments.reduce((acc, p) => acc + p.amount_paise, 0)
  const totalRevenueInr = Math.round(totalRevenuePaise / 100)

  return {
    totalRevenueInr,
    totalTransactions: payments.length,
    successfulTransactions: successfulPayments.length,
    pendingTransactions: payments.filter((p) => p.status === 'PENDING' || p.status === 'CREATED').length,
  }
}
