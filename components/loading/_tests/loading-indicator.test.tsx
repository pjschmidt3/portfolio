import { render, screen } from '@testing-library/react'
import { LoadingIndicator } from '@/components/loading/loading-indicator'

describe('Loading Indicator', () => {
  it('should display a loading spinner', () => {
    render(<LoadingIndicator />)

    const loadingIndicator = screen.getByRole('status')

    expect(loadingIndicator).toBeInTheDocument()
  })
})
