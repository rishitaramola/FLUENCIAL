import type { Metadata } from 'next'
import { getAllPayments } from '@/lib/data/payments'
import { IndianRupee, CheckCircle2, Clock, AlertCircle, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Payments & Revenue Ledger',
}

export default async function AdminPaymentsPage() {
  const payments = await getAllPayments()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Payments & Revenue Ledger</h1>
        <p className="text-sm text-gray-500">All student tuition fees, registrations, and payment statuses.</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order & Payment ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <div className="font-mono text-xs font-medium text-gray-900">{payment.order_id}</div>
                    {payment.payment_id && (
                      <div className="font-mono text-xs text-gray-400">PayID: {payment.payment_id}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {payment.student?.profile?.full_name || 'Enrolled Student'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {payment.course?.title || 'Course Fee'}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    ₹{(payment.amount_paise / 100).toLocaleString('en-IN')} {payment.currency}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        payment.status === 'SUCCESS'
                          ? 'bg-emerald-100 text-emerald-800'
                          : payment.status === 'FAILED'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {payment.status === 'SUCCESS' ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(payment.created_at).toLocaleDateString()}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                    No transactions recorded yet. Once Razorpay orders are completed, they appear here automatically.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
