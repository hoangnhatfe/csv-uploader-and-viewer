import Table from '@/components/Table'
import { Data, Meta, Payload } from '@/types/Data'
import UploadButton from '@/components/UploadButton'

const getTableData = async (page: number, pageSize: number) => {
  const response = await fetch(`${process.env.API_URL}/data?page=${page}&pageSize=${pageSize}`, { cache: 'no-store' })
  const data:Promise<Payload> = await response.json()
  return data
}

interface HomeProps {
  searchParams?: {
    page: string | undefined
    pageSize: string | undefined
  }
}

export default async function Home({searchParams}: HomeProps) {
  const page = searchParams?.page ? parseInt(searchParams.page as string) : 0
  const pageSize = searchParams?.pageSize ? parseInt(searchParams.pageSize as string) : 10
  const {data, meta }: {data: Data[], meta: Meta} = await getTableData(page, pageSize)

  return (
    <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Data Table</h1>
          <p className="mt-2 text-sm text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lobortis ante dolor, at ornare neque finibus id. Vivamus consectetur a ante at pulvinar. Duis tempor finibus imperdiet.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <UploadButton />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <Table data={data} page={meta.pagination.page} pageSize={meta.pagination.pageSize} total={meta.pagination.total} pageCount={meta.pagination.pageCount}/>
      </div>
    </main>
  )
}
