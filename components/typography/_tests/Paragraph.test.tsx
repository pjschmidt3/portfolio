import { render, screen } from '@testing-library/react'
import { Paragraph } from '@/registry/new-york/ui/paragraph'

describe('Paragraph', () => {
  it('renders children correctly', () => {
    render(<Paragraph>Test paragraph text</Paragraph>)
    const paragraph = screen.getByText('Test paragraph text')
    expect(paragraph).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    render(<Paragraph>Styled paragraph</Paragraph>)
    const paragraph = screen.getByText('Styled paragraph')
    expect(paragraph).toHaveClass('text-base')
  })

  it('renders without children', () => {
    const { container } = render(<Paragraph />)
    const paragraph = container.querySelector('p')
    expect(paragraph).toBeInTheDocument()
    expect(paragraph).toBeEmptyDOMElement()
  })

  it('renders with complex children', () => {
    render(
      <Paragraph>
        This is <strong>bold</strong> text
      </Paragraph>
    )
    const paragraph = screen.getByText(/This is/)
    expect(paragraph).toBeInTheDocument()
    const bold = screen.getByText('bold')
    expect(bold.tagName).toBe('STRONG')
  })
})
