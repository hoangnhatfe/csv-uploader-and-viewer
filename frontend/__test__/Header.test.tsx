import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderServerComponent } from './lib/renderServerComponent'

import Header from '@/components/Header'

describe('Header Component', async () => {
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
  it('renders the header', async () => {
    await renderServerComponent(<Header />)
    expect(screen.getByText('Mini App')).toBeTruthy()
  })
})
