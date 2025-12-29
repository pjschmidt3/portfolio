import { render, screen } from '@testing-library/react'
import { HeadingTwo } from 'components/typography/heading-two'

describe('HeadingTwo', () => {
  it('renders children correctly', () => {
    render(<HeadingTwo>Test Heading</HeadingTwo>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Test Heading')
  })

  it('applies correct CSS classes', () => {
    render(<HeadingTwo>Styled Heading</HeadingTwo>)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveClass(
      'scroll-m-20',
      'text-4xl',
      'font-extrabold',
      'text-primary',
      'font-roboto'
    )
  })

  it('renders without children', () => {
    render(<HeadingTwo />)
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toBeInTheDocument()
    expect(heading).toBeEmptyDOMElement()
  })

  it('renders with complex children', () => {
    render(
      <HeadingTwo>
        <span>Complex</span> Heading
      </HeadingTwo>
    )
    const heading = screen.getByRole('heading', { level: 2 })
    expect(heading).toHaveTextContent('Complex Heading')
  })
})
