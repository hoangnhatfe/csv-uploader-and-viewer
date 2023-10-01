"use client"
import React, { FormEvent, FC } from 'react'
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface HeaderProps {
  
}

const Header: FC<HeaderProps> = ({}) => {
  const router = useRouter()
  const handleSearch = (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form:any = event.target
    const searchKey = form.search.value
    if (!searchKey) {
      toast.error("Please enter search key.")
      return
    }
    const href = `/search?q=${searchKey}`
    router.push(href)
  }
  return (
    <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <div className="flex xl:col-span-2">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/">
                Mini App
              </Link>
            </div>
          </div>
          <div className="min-w-0 flex-1 w-full xl:col-span-10">
            <form onSubmit={(e) => handleSearch(e)} className="flex items-center py-4">
              <div className="w-full pl-6">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search size={48} className="h-5 w-5 text-slate-400"/>
                  </div>
                  <input
                    id="search"
                    name="search"
                    className="block w-full rounded-md rounded-r-none border-0 bg-white py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    placeholder="Search"
                    type="search"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex w-auto mt-0 items-center justify-center rounded-md rounded-l-none bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header