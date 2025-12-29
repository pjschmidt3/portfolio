import { render, screen } from '@testing-library/react'
import { Projects } from '@/components/projects/projects'

describe('Projects', () => {
  it('renders heading when provided', () => {
    render(<Projects heading="My Projects" />)
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'My Projects'
    })
    expect(heading).toBeInTheDocument()
  })

  it('does not render heading when not provided', () => {
    render(<Projects />)
    const headings = screen.queryAllByRole('heading', { level: 2 })
    expect(headings).toHaveLength(0)
  })

  it('renders all project items', () => {
    render(<Projects />)
    expect(screen.getByText('Portal')).toBeInTheDocument()
    expect(screen.getByText('Marketing>')).toBeInTheDocument()
  })

  it('renders technology badges for each project', () => {
    render(<Projects />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<Projects className="custom-class" />)
    const section = container.querySelector('section')
    expect(section).toHaveClass('custom-class')
  })
})
