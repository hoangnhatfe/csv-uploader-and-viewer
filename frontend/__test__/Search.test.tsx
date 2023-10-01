import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderServerComponent } from './lib/renderServerComponent'

import SearchPage from '@/app/search/page'
import testData from './mock/data.json'

const createFetchResponse = (data:any) => {
  return new Response(JSON.stringify(data));
}

describe('Search Page', async () => {
  beforeEach(() =>{
    global.fetch = vi.fn()

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

    vi.spyOn(global, 'fetch').mockResolvedValue(createFetchResponse(testData))
  })
  it('renders the heading', async () => {
    await renderServerComponent(<SearchPage searchParams={{q: 'lorem'}} />)
    expect(screen.getByRole('heading').textContent).toBe('Results of “lorem”')
  })
  it('renders the table', async () => {
    await renderServerComponent(<SearchPage searchParams={{q: 'lorem'}} />)
    expect(screen.getByRole('table')).toBeTruthy()
  })
})
