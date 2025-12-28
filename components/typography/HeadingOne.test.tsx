import { render, screen } from '@testing-library/react'
import HeadingOne from './HeadingOne'

describe('HeadingOne', () => {
  it('renders children correctly', () => {
    render(<HeadingOne>Test Heading</HeadingOne>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Heading')
  })

  it('applies correct CSS classes', () => {
    render(<HeadingOne>Styled Heading</HeadingOne>)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveClass('scroll-m-20', 'text-4xl', 'font-extrabold', 'text-primary', 'font-roboto')
  })

  it('renders without children', () => {
    render(<HeadingOne />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toBeEmptyDOMElement()
  })

  it('renders with complex children', () => {
    render(
      <HeadingOne>
        <span>Complex</span> Heading
      </HeadingOne>
    )
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Complex Heading')
  })
})
