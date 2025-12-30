import { render, screen } from '@testing-library/react'
import { WorkExperience } from '@/components/experience/work-experience'

describe('WorkExperience', () => {
  it('renders all experience items', () => {
    render(<WorkExperience />)

    const trueCodersMatches = screen.getAllByText('TrueCoders')
    for (const match of trueCodersMatches) {
      expect(match).toBeInTheDocument()
    }
    expect(
      screen.getByText('Bailey Brothers Music Company')
    ).toBeInTheDocument()
    expect(screen.getByText('NaphCare')).toBeInTheDocument()

    const whiteboardMatches = screen.getAllByText('Whiteboard-it')
    for (const match of whiteboardMatches) {
      expect(match).toBeInTheDocument()
    }
    expect(screen.getByText('VMWare')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<WorkExperience className="custom-class" />)
    const section = container.querySelector('.custom-class')
    expect(section).toBeInTheDocument()
  })
})
