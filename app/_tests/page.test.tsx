import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '@/app/page'

describe('home page', () => {
  it('should have first and second level headings', () => {
    render(<HomePage />)

    const h1 = screen.getByRole('heading', { level: 1 })
    const h2 = screen.getAllByRole('heading', { level: 2 })[0]
    waitFor(() => {
      expect(h1).toHaveTextContent('Phillip Schmidt')
      expect(h2).toHaveTextContent('Senior Software Developer')
    })
  })
})
