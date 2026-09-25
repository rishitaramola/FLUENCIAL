import type { Metadata } from 'next'
import { getRegistrations } from '@/lib/data/registrations'
import { getAllCourses } from '@/lib/data/courses'
import { RegistrationsClient } from './RegistrationsClient'

export const metadata: Metadata = {
  title: 'Registrations | Fluenciel Language Studio',
}

export default async function AdminRegistrationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  
  const search = typeof params.search === 'string' ? params.search : undefined
  const course_id = typeof params.course_id === 'string' ? params.course_id : undefined
  const status = typeof params.status === 'string' ? params.status : undefined
  const level = typeof params.level === 'string' ? params.level : undefined
  const sort = typeof params.sort === 'string' ? params.sort : undefined
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1

  const [{ data: registrations, count }, courses] = await Promise.all([
    getRegistrations({ search, course_id, status, level, sort, page }),
    getAllCourses()
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Registrations</h1>
        <p className="text-sm text-gray-500">
          View and manage people who have registered or inquired through the website.
        </p>
      </div>

      <RegistrationsClient
        registrations={registrations}
        totalCount={count}
        courses={courses}
      />
    </div>
  )
}
