import Table from '@/components/Table'
import { Data, Meta, Payload } from '@/types/Data'

const getTableData = async (q: string, page: number, pageSize: number) => {
  const response = await fetch(`${process.env.API_URL}/data/search?q=${q}&page=${page}&pageSize=${pageSize}` , { cache: 'no-store' })
  const data:Promise<Payload> = await response.json()
  return data
}

interface SearchPageProps {
  searchParams: {
    q: string | undefined
    page?: string | undefined
    pageSize?: string | undefined
  }
}

export default async function SearchPage({searchParams} : SearchPageProps) {
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 0
  const pageSize = searchParams?.pageSize ? parseInt(searchParams.pageSize as string) : 10
  const q = searchParams.q ? searchParams.q : ''
  const {data, meta }: {data: Data[], meta: Meta} = await getTableData(q, page, pageSize)
  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Results of &ldquo;{q}&rdquo;</h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <Table data={data} page={meta.pagination.page} pageSize={meta.pagination.pageSize} total={meta.pagination.total} pageCount={meta.pagination.pageCount}/>
      </div>
    </main>
  )
}
