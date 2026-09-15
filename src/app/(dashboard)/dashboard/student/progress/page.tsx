import type { Metadata } from 'next'
import { Award, CheckCircle2, TrendingUp, BookOpen, MessageSquare, Headphones, PenTool } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Linguistic Progress Tracker',
}

const SKILL_METRICS = [
  { name: 'Spoken Interaction & Fluency', score: 85, icon: MessageSquare, level: 'B1 Strong' },
  { name: 'Listening Comprehension', score: 78, icon: Headphones, level: 'B1 Competent' },
  { name: 'Reading & Text Analysis', score: 90, icon: BookOpen, level: 'B2 Proficient' },
  { name: 'Written Expression & Syntax', score: 72, icon: PenTool, level: 'A2 High' },
]

export default function StudentProgressPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">CEFR Diagnostic & Competency</h1>
        <p className="text-sm text-gray-500">Track your linguistic milestones across the 4 core communicative domains.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SKILL_METRICS.map((skill) => {
          const Icon = skill.icon
          return (
            <div key={skill.name} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{skill.name}</h3>
                    <span className="text-xs text-indigo-600 font-medium">{skill.level}</span>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-900">{skill.score}%</span>
              </div>

              <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${skill.score}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-semibold text-gray-900">Delivered Milestones</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>Completed 10 Live Conversational Speaking Laboratories</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>Passed DELF B1 Diagnostic Mock Test with 82/100 points</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
            <span>Mastered Subjunctive & Past Tense conjugation syntax</span>
          </div>
        </div>
      </div>
    </div>
  )
}
