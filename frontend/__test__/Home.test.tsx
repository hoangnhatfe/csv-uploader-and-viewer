import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderServerComponent } from './lib/renderServerComponent'

import Home from '@/app/page'
import testData from './mock/data.json'

const createFetchResponse = (data:any) => {
  return new Response(JSON.stringify(data));
}

describe('Home Page', async () => {
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
    await renderServerComponent(<Home />)
    expect(screen.getByText('Data Table')).toBeTruthy()
  })
  it('renders the table', async () => {
    await renderServerComponent(<Home />)
    expect(screen.getByRole('table')).toBeTruthy()
  })
  it('renders the pagination', async () => {
    await renderServerComponent(<Home />)
    expect(screen.getByRole('navigation')).toBeTruthy()
  })
  it('renders the upload button', async () => {
    await renderServerComponent(<Home />)
    expect(screen.getByRole('uploadButton').textContent).toBe('Upload CSV')
  })
})
