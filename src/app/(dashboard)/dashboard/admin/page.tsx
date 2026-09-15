import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCourses } from '@/lib/data/courses'
import { getAllStudents } from '@/lib/data/students'
import { getAllLeads } from '@/lib/data/leads'
import { getAllPayments, getFinancialSummary } from '@/lib/data/payments'
import { 
  BookOpen, 
  Users, 
  UserPlus, 
  IndianRupee, 
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Admin Overview',
}

export default async function AdminDashboardPage() {
  const [courses, students, leads, payments, financials] = await Promise.all([
    getAllCourses(),
    getAllStudents(),
    getAllLeads(),
    getAllPayments(),
    getFinancialSummary(),
  ])

  const activeStudents = students.filter((s) => s.status === 'ACTIVE' || s.status === 'ENROLLED')
  const newLeads = leads.filter((l) => l.status === 'NEW')
  const publishedCourses = courses.filter((c) => c.status === 'published')

  const kpis = [
    {
      name: 'Total Revenue',
      value: `₹${financials.totalRevenueInr.toLocaleString('en-IN')}`,
      subtext: `${financials.successfulTransactions} paid transactions`,
      icon: IndianRupee,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      name: 'Active Students',
      value: activeStudents.length,
      subtext: `${students.length} total registered`,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      name: 'New Leads',
      value: newLeads.length,
      subtext: `${leads.length} in pipeline`,
      icon: UserPlus,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      name: 'Published Courses',
      value: publishedCourses.length,
      subtext: `${courses.length} total courses`,
      icon: BookOpen,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Admin Control Center</h1>
          <p className="text-sm text-gray-500">Monitor studio operations, conversions, revenue, and enrollments.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin/courses"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
          >
            Manage Courses
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <div
              key={kpi.name}
              className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">{kpi.name}</span>
                <div className={`rounded-lg p-2 ${kpi.bg}`}>
                  <Icon className={`h-5 w-5 ${kpi.color}`} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-bold text-gray-900">{kpi.value}</span>
                <p className="mt-1 text-xs text-gray-500">{kpi.subtext}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* 2-column layout: Recent Leads & Recent Payments */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Leads */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">Recent Inquiries & Leads</h2>
            <Link
              href="/dashboard/admin/leads"
              className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-500 gap-1"
            >
              View pipeline <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{lead.name}</p>
                  <p className="truncate text-xs text-gray-500">{lead.email} {lead.phone ? `· ${lead.phone}` : ''}</p>
                  {lead.course && (
                    <span className="inline-block mt-1 text-xs text-indigo-600 font-medium">
                      Course: {lead.course.title}
                    </span>
                  )}
                </div>
                <div className="ml-4 shrink-0">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      lead.status === 'NEW'
                        ? 'bg-amber-100 text-amber-800'
                        : lead.status === 'CONVERTED'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-500">No leads recorded yet.</div>
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 className="text-base font-semibold text-gray-900">Recent Transactions</h2>
            <Link
              href="/dashboard/admin/payments"
              className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-500 gap-1"
            >
              View ledger <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {payments.slice(0, 5).map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 px-6 hover:bg-gray-50/50">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    Order #{payment.order_id.slice(-8)}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {payment.student?.profile?.full_name ?? 'Student'} · {payment.course?.title ?? 'Course'}
                  </p>
                </div>
                <div className="ml-4 text-right shrink-0">
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{(payment.amount_paise / 100).toLocaleString('en-IN')}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium ${
                      payment.status === 'SUCCESS'
                        ? 'text-emerald-600'
                        : payment.status === 'FAILED'
                        ? 'text-red-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {payment.status === 'SUCCESS' ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                    {payment.status}
                  </span>
                </div>
              </div>
            ))}
            {payments.length === 0 && (
              <div className="p-8 text-center text-sm text-gray-500">No transactions recorded yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
