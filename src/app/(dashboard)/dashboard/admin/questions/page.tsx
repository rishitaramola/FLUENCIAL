import { createClient } from '@/lib/supabase/server'
import { QuestionsClient } from './questions-client'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function AdminQuestionsPage() {
  const supabase = await createClient()

  // RLS will enforce admin-only access, but we double-check session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: questions, error } = await supabase
    .from('visitor_questions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching visitor questions:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Visitor Questions</h1>
      </div>
      <QuestionsClient initialQuestions={questions || []} />
    </div>
  )
}
