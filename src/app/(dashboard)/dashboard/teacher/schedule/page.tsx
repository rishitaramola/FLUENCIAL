import type { Metadata } from 'next'
import { Calendar, Clock, Video, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Teaching Schedule',
}

const WEEKLY_SCHEDULE = [
  {
    day: 'Monday',
    batches: [
      { time: '10:00 AM - 11:30 AM', title: 'French A1 Intensive', mode: 'Live Interactive (Google Meet)', size: '8 Students' },
      { time: '04:00 PM - 05:00 PM', title: 'French B1 Oral Conversation', mode: 'Speaking Practice Lab', size: '4 Students' },
    ],
  },
  {
    day: 'Wednesday',
    batches: [
      { time: '10:00 AM - 11:30 AM', title: 'French A1 Intensive', mode: 'Live Interactive (Google Meet)', size: '8 Students' },
      { time: '06:00 PM - 07:30 PM', title: 'German A1 FastTrack', mode: 'Grammar & Vocabulary Workshop', size: '10 Students' },
    ],
  },
  {
    day: 'Friday',
    batches: [
      { time: '03:00 PM - 04:30 PM', title: 'DELF B2 Exam Preparation', mode: 'Mock Listening & Reading', size: '6 Students' },
      { time: '05:30 PM - 06:30 PM', title: 'Individual Speaking Diagnostics', mode: '1-on-1 Feedback', size: '1 Student' },
    ],
  },
]

export default function TeacherSchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Teaching Schedule & Sessions</h1>
        <p className="text-sm text-gray-500">Weekly class timetable, live room links, and speaking evaluations.</p>
      </div>

      <div className="space-y-6">
        {WEEKLY_SCHEDULE.map((daySchedule) => (
          <div key={daySchedule.day} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-3 font-semibold text-gray-900">
              <Calendar className="h-4 w-4 text-indigo-600" />
              <span>{daySchedule.day}</span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {daySchedule.batches.map((batch, idx) => (
                <div key={idx} className="rounded-lg border border-gray-100 bg-gray-50/50 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      {batch.time}
                    </span>
                    <span className="rounded bg-gray-200/70 px-2 py-0.5 text-xs text-gray-600">
                      {batch.size}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm">{batch.title}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <Video className="h-3.5 w-3.5 text-gray-400" />
                    {batch.mode}
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      className="rounded bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-500 transition-colors"
                    >
                      Open Live Class
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
