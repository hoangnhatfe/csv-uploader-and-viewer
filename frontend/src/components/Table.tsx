"use client"
import React, { FC } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from '@/lib/utils'
import { useRouter, useSearchParams } from 'next/navigation'


interface TableProps {
  data: any[]
  page: number
  pageSize: number
  pageCount: number
  total: number
  loading?: boolean
}

const Table: FC<TableProps> = ({data, page = 0, pageSize = 10, pageCount = 1, total = 0, loading}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromSearch = searchParams.get('q') ? `q=${searchParams.get('q')}&` : ''
  
  const handlePageSizeChange = (value: string) => {
    // // change pagesize query params
    const href = `?${fromSearch}page=${page}&pageSize=${value}`
    router.push(href)
  }

  const handlePageChange = (value: number) => {
    // change page query params
    const href = `?${fromSearch}page=${value}&pageSize=${pageSize}`
    router.push(href)
  }
  const quantityOfPages = [10, 20, 50, 100]
  return <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block py-2 align-middle px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        <table className="max-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="w-[5%] max-w-10 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Id
              </th>
              <th
                scope="col"
                className="w-[5%] max-w-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                PostId
              </th>
              <th
                scope="col"
                className="w-[30%] max-w-[300px] truncate px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Name
              </th>
              <th
                scope="col"
                className="w-[20%] max-w-[200px] truncate px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Email
              </th>
              <th scope="col"
                className="w-[30%] max-w-[300px] truncate hidden sm:table-cell px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Body
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            { (data.length > 0) ? data.map((item, index) => (
                <tr className={cn({'hidden': loading})} key={index}>
                  <td className="w-[5%] max-w-10 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {item.id}
                  </td>
                  <td className="w-[5%] max-w-10 whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.postId}
                  </td>
                  <td className="w-[30%] max-w-[300px] truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.name}
                  </td>
                  <td className="w-[20%] max-w-[200px] truncate whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {item.email}
                  </td>
                  <td className="w-[40%] max-w-[300px] truncate hidden sm:table-cell px-3 py-4 text-sm text-gray-500">
                    {item.body}
                  </td>
                </tr>
              )) : <tr className={cn({'hidden': loading})}><td colSpan={5}><p className="p-4 text-center">No results</p></td></tr>
            }
            {loading && <SkeletonTable pageSize={pageSize} />}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 items-center justify-between">
            <div>
              <div className="flex items-center text-sm text-gray-700">
                <div>
                  <Select onValueChange={handlePageSizeChange} defaultValue={pageSize.toString()}>
                    <SelectTrigger className="w-[60px]" role="tablePageSizeSelect">
                      <SelectValue placeholder="10"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {quantityOfPages.map((item, index) => (
                          <SelectItem key={index} value={item.toString()} disabled={total < item*(page+1)}>{item}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="ml-2"> of {total} </div>
              </div>
            </div>
            <div>
              <Pagination page={page} pageCount={pageCount} onPageChange={handlePageChange} />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
}

interface SkeletonTableProps {
  pageSize: number
}

const SkeletonTable: FC<SkeletonTableProps> = ({pageSize = 10}) => {
  return Array.from(Array(pageSize).keys()).map((index) => (
    <tr key={index}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        <Skeleton className="w-[100px] h-[20px] rounded-2" />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Skeleton className="w-[100px] h-[20px] rounded-2" />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Skeleton className="w-[100px] h-[20px] rounded-2" />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        <Skeleton className="w-[100px] h-[20px] rounded-2" />
      </td>
      <td className="truncate max-w-sm px-3 py-4 text-sm text-gray-500">
        <Skeleton className="w-[100px] h-[20px] rounded-2" />
      </td>
    </tr>
))}

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

const Pagination: FC<PaginationProps> = ({page = 0, pageCount = 1, onPageChange}) => {
  const generatePages = () => {
    const numVisiblePages = 4;
    const pages = [];

    if (pageCount <= numVisiblePages) {
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(page - 2, 0);
      let endPage = Math.min(startPage + numVisiblePages - 1, pageCount - 1);

      if (endPage - startPage < numVisiblePages - 1) {
        startPage = endPage - numVisiblePages + 1;
      }

      if (startPage > 0) {
        pages.push(0);
        if (startPage > 1) {
          pages.push('ellipsis');
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < pageCount - 1) {
        if (endPage < pageCount - 2) {
          pages.push('ellipsis');
        }
        pages.push(pageCount - 1);
      }
    }

    return pages;
  };
  const visiblePages = generatePages();

  return <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
    {/* Previous Page */}
    <button
      onClick={() => onPageChange(page - 1)}
      className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover-bg-gray-50 focus:z-20 focus:outline-offset-0 ${
        page === 0 ? 'cursor-not-allowed' : ''
      }`}
      disabled={page === 0}
    >
      <span className="sr-only">Previous</span>
      <ChevronLeft className="h-5 w-5" />
    </button>

    {/* Page Numbers and Ellipsis */}
    {visiblePages.map((pageNumber, index) => (
      <React.Fragment key={index}>
        {pageNumber === 'ellipsis' ? (
          <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
            ...
          </span>
        ) : (
          // @ts-ignore
          <button onClick={() => onPageChange(pageNumber)}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
              page === pageNumber
                ? 'bg-slate-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600'
                : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover-bg-gray-50 focus:z-20 focus:outline-offset-0'
            }`}
          >
            {/* @ts-ignore */}
            {pageNumber + 1}
          </button>
        )}
      </React.Fragment>
    ))}

    {/* Next Page */}
    <button
      onClick={() => onPageChange(page + 1)}
      className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover-bg-gray-50 focus:z-20 focus:outline-offset-0 ${
        page === pageCount - 1 ? 'cursor-not-allowed' : ''
      }`}
      disabled={page === pageCount - 1}
    >
      <span className="sr-only">Next</span>
      <ChevronRight className="h-5 w-5" />
    </button>
  </nav>
}


export default Table