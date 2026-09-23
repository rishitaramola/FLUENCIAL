'use client'

import { useState } from 'react'
import { answerVisitorQuestion, convertToFaq, deleteVisitorQuestion } from '@/app/actions/questions'

type Question = {
  id: string
  name: string
  email: string
  phone: string | null
  question: string
  status: string
  admin_answer: string | null
  is_public: boolean
  created_at: string
}

export function QuestionsClient({ initialQuestions }: { initialQuestions: Question[] }) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [answer, setAnswer] = useState('')
  const [sendEmail, setSendEmail] = useState(false)
  const [faqCategory, setFaqCategory] = useState('GENERAL')
  const [mode, setMode] = useState<'VIEW' | 'ANSWER' | 'CONVERT'>('VIEW')

  const selectedQ = questions.find(q => q.id === selectedId)

  async function handleAnswer() {
    if (!selectedId || !selectedQ) return
    const res = await answerVisitorQuestion(selectedId, answer, sendEmail, selectedQ.email)
    if (res.success) {
      setQuestions(prev => prev.map(q => q.id === selectedId ? { ...q, admin_answer: answer, status: 'ANSWERED' } : q))
      setMode('VIEW')
      if (sendEmail) alert('Answer saved and emailed to the visitor.')
    } else {
      alert('Error: ' + res.error)
    }
  }

  async function handleConvert() {
    if (!selectedId || !selectedQ) return
    const params = new URLSearchParams({
      fromId: selectedId,
      newQ: selectedQ.question,
      newA: answer || '',
      newC: faqCategory
    })
    window.location.href = `/dashboard/admin/faqs?${params.toString()}`
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return
    const res = await deleteVisitorQuestion(id)
    if (res.success) {
      setQuestions(prev => prev.filter(q => q.id !== id))
      if (selectedId === id) setSelectedId(null)
    } else {
      alert('Error: ' + res.error)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questions.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">No questions found.</td>
                </tr>
              )}
              {questions.map((q) => (
                <tr 
                  key={q.id} 
                  className={`cursor-pointer hover:bg-indigo-50 transition-colors ${selectedId === q.id ? 'bg-indigo-50' : ''}`}
                  onClick={() => {
                    setSelectedId(q.id)
                    setAnswer(q.admin_answer || '')
                    setMode('VIEW')
                  }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {q.name}
                    <div className="text-gray-500 font-normal">{q.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-xs">
                    {q.question}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      q.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                      q.status === 'ANSWERED' ? 'bg-blue-100 text-blue-800' :
                      q.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(q.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details/Action Panel */}
      <div className="lg:col-span-1">
        {selectedQ ? (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sticky top-24 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Question Details</h3>
                <button onClick={() => handleDelete(selectedQ.id)} className="text-xs text-red-600 hover:text-red-700 font-medium">Delete</button>
              </div>
              <div className="mt-3">
                <p className="text-base font-semibold text-gray-900">{selectedQ.question}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <p><span className="font-medium text-gray-700">From:</span> {selectedQ.name} ({selectedQ.email})</p>
                  {selectedQ.phone && <p><span className="font-medium text-gray-700">Phone:</span> {selectedQ.phone}</p>}
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {mode === 'VIEW' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Current Answer</h3>
                  {selectedQ.admin_answer ? (
                    <p className="mt-2 text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">{selectedQ.admin_answer}</p>
                  ) : (
                    <p className="mt-2 text-sm text-gray-400 italic">No answer provided yet.</p>
                  )}
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <button onClick={() => setMode('ANSWER')} className="w-full rounded-md bg-white border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    {selectedQ.admin_answer ? 'Edit Answer' : 'Write Answer'}
                  </button>
                  {selectedQ.admin_answer && selectedQ.status !== 'PUBLISHED' && (
                    <button onClick={() => setMode('CONVERT')} className="w-full rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700">
                      Convert to FAQ
                    </button>
                  )}
                </div>
              </div>
            )}

            {mode === 'ANSWER' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Answer</label>
                  <textarea
                    rows={5}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="Type your response here..."
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" id="send-email" checked={sendEmail} onChange={e => setSendEmail(e.target.checked)} className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <label htmlFor="send-email" className="text-sm text-gray-700">Send response directly to visitor's email</label>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={handleAnswer} className="flex-1 rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700">Save Answer</button>
                  <button onClick={() => setMode('VIEW')} className="flex-1 rounded-md bg-white border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            )}

            {mode === 'CONVERT' && (
              <div className="space-y-4">
                <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100">
                  <p className="text-sm text-indigo-800">Convert this question into a public FAQ. It will be added as unpublished, so you can review it in the FAQs section.</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={faqCategory}
                    onChange={e => setFaqCategory(e.target.value)}
                  >
                    <option value="GENERAL">GENERAL</option>
                    <option value="WHY FLUENCIEL?">WHY FLUENCIEL?</option>
                    <option value="COURSES & LEARNING">COURSES & LEARNING</option>
                    <option value="TEF, TCF, DELF & DALF">TEF, TCF, DELF & DALF</option>
                    <option value="CLASSES & BATCHES">CLASSES & BATCHES</option>
                    <option value="FEES & REFUNDS">FEES & REFUNDS</option>
                    <option value="STUDY MATERIAL & SUPPORT">STUDY MATERIAL & SUPPORT</option>
                    <option value="LEARNING JOURNEY">LEARNING JOURNEY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">FAQ Answer</label>
                  <textarea
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-500">Edit the answer to be suitable for the public.</p>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={handleConvert} className="flex-1 rounded-md bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700">Convert & Save</button>
                  <button onClick={() => setMode('VIEW')} className="flex-1 rounded-md bg-white border border-gray-300 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center text-sm text-gray-500">
            Select a question to view details and respond.
          </div>
        )}
      </div>
    </div>
  )
}
