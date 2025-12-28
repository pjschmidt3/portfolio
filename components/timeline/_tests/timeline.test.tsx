import { render, screen } from '@testing-library/react'
import { Timeline, TimelineEntry } from '@/components/timeline/timeline'

const mockTimelineItems: TimelineEntry[] = [
  {
    date: 'Jan 2024 - Present',
    title: 'Senior Developer',
    company: 'Tech Corp',
    location: 'New York, NY',
    content: 'Working on exciting projects'
  },
  {
    date: 'Jan 2022 - Dec 2023',
    title: 'Developer',
    location: 'Boston, MA',
    content: 'Built web applications'
  },
  {
    date: 'Jan 2020 - Dec 2021',
    title: 'Junior Developer',
    company: 'Startup Inc',
    content: (
      <ul>
        <li>First item</li>
        <li>Second item</li>
      </ul>
    )
  }
]

describe('Timeline', () => {
  it('renders heading when provided', () => {
    render(
      <Timeline
        heading="Work Experience"
        items={mockTimelineItems}
      />
    )
    const heading = screen.getByText('Work Experience')
    expect(heading).toBeInTheDocument()
    expect(heading.tagName).toBe('H2')
  })

  it('does not render heading when not provided', () => {
    const { container } = render(<Timeline items={mockTimelineItems} />)
    const headings = container.querySelectorAll('H2')
    expect(headings).toHaveLength(0)
  })

  it('renders all timeline items', () => {
    render(<Timeline items={mockTimelineItems} />)
    expect(screen.getByText('Senior Developer')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText('Junior Developer')).toBeInTheDocument()
  })

  it('renders company, location, and date correctly', () => {
    render(<Timeline items={mockTimelineItems} />)
    expect(screen.getByText(/Tech Corp/)).toBeInTheDocument()
    expect(screen.getByText(/New York, NY/)).toBeInTheDocument()
    expect(screen.getByText(/Jan 2024 - Present/)).toBeInTheDocument()
  })

  it('handles missing company field', () => {
    render(<Timeline items={mockTimelineItems} />)
    const secondItem = screen.getByText(/Boston, MA/)
    expect(secondItem).not.toHaveTextContent('undefined')
  })

  it('renders string content correctly', () => {
    render(<Timeline items={mockTimelineItems} />)
    expect(screen.getByText('Working on exciting projects')).toBeInTheDocument()
    expect(screen.getByText('Built web applications')).toBeInTheDocument()
  })

  it('renders ReactNode content correctly', () => {
    render(<Timeline items={mockTimelineItems} />)
    expect(screen.getByText('First item')).toBeInTheDocument()
    expect(screen.getByText('Second item')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Timeline
        items={mockTimelineItems}
        className="custom-class"
      />
    )
    const section = container.querySelector('section')
    expect(section).toHaveClass('custom-class')
  })

  it('renders empty timeline when no items provided', () => {
    const { container } = render(<Timeline items={[]} />)
    const cards = container.querySelectorAll('[class*="card"]')
    expect(cards).toHaveLength(0)
  })
})
