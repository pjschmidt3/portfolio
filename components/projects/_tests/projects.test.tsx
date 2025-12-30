import { render, screen, waitFor } from '@testing-library/react'
import { Projects } from '@/components/projects/projects'

describe('Projects', () => {
  it('renders all project items', () => {
    render(<Projects />)

    waitFor(() => {
      expect(screen.getByText('Portal')).toBeInTheDocument()
      expect(screen.getByText('Marketing>')).toBeInTheDocument()
    })
  })

  it('renders technology badges for each project', () => {
    render(<Projects />)

    expect(screen.getByText('React.js')).toBeInTheDocument()
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
