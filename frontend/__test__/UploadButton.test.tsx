import { beforeEach, describe, expect, it, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderServerComponent } from './lib/renderServerComponent'

import UploadButton from '@/components/UploadButton'

describe('Upload Component', async () => {
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
  it('renders the button', async () => {
    await renderServerComponent(<UploadButton />)
    expect(screen.getByRole('uploadButton').textContent).toBe('Upload CSV')
  })
  it('renders the input type file', async () => {
    await renderServerComponent(<UploadButton />)
    expect(screen.getByRole('uploadInput')).toBeTruthy()
  })
})
