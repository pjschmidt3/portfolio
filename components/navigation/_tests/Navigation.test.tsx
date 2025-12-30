import { render } from '@testing-library/react'
import { Navigation } from 'components/navigation/navigation'

describe('Navigation', () => {
  it('renders a nav element', () => {
    const { container } = render(<Navigation />)
    const nav = container.querySelector('nav')

    expect(nav).toBeInTheDocument()
  })

  it('renders a home link', () => {
    const { container } = render(<Navigation />)
    const nav = container.querySelector('nav')

    expect(nav).toHaveTextContent('Home')
  })
})
