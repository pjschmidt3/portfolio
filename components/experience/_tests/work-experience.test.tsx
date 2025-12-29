import { render, screen } from '@testing-library/react'
import { WorkExperience } from '@/components/experience/work-experience'

describe('Timeline', () => {
  it('renders heading when provided', () => {
    render(<WorkExperience heading="Work Experience" />)
    const heading = screen.getByText('Work Experience')
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H2')
  })

  it('does not render heading when not provided', () => {
    const { container } = render(<WorkExperience />)
    const headings = container.querySelectorAll('H2')
    expect(headings).toHaveLength(0)
  })

  it('renders all experience items', () => {
    render(<WorkExperience />)
    expect(screen.getByText('Senior Software Developer')).toBeInTheDocument()
    expect(screen.getByText('Associate Consultant')).toBeInTheDocument()
    expect(screen.getByText('Lead Developer/Architect')).toBeInTheDocument()
  })

  it('renders string content correctly', () => {
    render(<WorkExperience />)
    expect(screen.getByText('Working on exciting projects')).toBeInTheDocument()
    expect(screen.getByText('Built web applications')).toBeInTheDocument()
  })

  it('renders ReactNode content correctly', () => {
    render(<WorkExperience />)
    expect(screen.getByText('First item')).toBeInTheDocument()
    expect(screen.getByText('Second item')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<WorkExperience className="custom-class" />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('custom-class')
  })
})
