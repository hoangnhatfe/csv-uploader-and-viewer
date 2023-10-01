import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderServerComponent } from './lib/renderServerComponent'

import Table from '@/components/Table'
import testData from './mock/data.json'

describe('Table Component', async () => {
  beforeEach(() =>{
    vi.mock("next/navigation", () => {
      const actual = vi.importActual("next/navigation");
      return {
        ...actual,
        useRouter: vi.fn(() => ({
          push: vi.fn(),
        })),
        useSearchParams: vi.fn(() => ({
          get: vi.fn(),
        })),
        usePathname: vi.fn(),
      };
    });
  })
  it('renders the table', async () => {
    await renderServerComponent(<Table data={testData.data} page={testData.meta.pagination.page} pageSize={testData.meta.pagination.pageSize} total={testData.meta.pagination.total} pageCount={testData.meta.pagination.pageCount}  />)
    expect(screen.getByRole('table')).toBeTruthy()
  })
  it('renders the pagination', async () => {
    await renderServerComponent(<Table data={testData.data} page={testData.meta.pagination.page} pageSize={testData.meta.pagination.pageSize} total={testData.meta.pagination.total} pageCount={testData.meta.pagination.pageCount}  />)
    expect(screen.getByRole('navigation')).toBeTruthy()
  })
  it('renders the table page size select', async () => {
    await renderServerComponent(<Table data={testData.data} page={testData.meta.pagination.page} pageSize={testData.meta.pagination.pageSize} total={testData.meta.pagination.total} pageCount={testData.meta.pagination.pageCount}  />)
    expect(screen.getByRole('tablePageSizeSelect')).toBeTruthy()
  })
})
