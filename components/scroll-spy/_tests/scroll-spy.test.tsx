import { render, waitFor } from '@testing-library/react'
import { ScrollSpy } from '@/components/scroll-spy/scroll-spy'

describe('Scrollspy nav', () => {
  it('renders a nav element', () => {
    const { container } = render(<ScrollSpy />)
    const nav = container.querySelector('nav')

    expect(nav).toBeInTheDocument()
  })

  it('should apply the active styles when an element is scrolled to', () => {
    const { container } = render(<ScrollSpy />)
    const experienceSection =
      container.ownerDocument.querySelector('#experience')
    container?.ownerDocument?.scrollingElement?.scrollTo({
      top: Number(experienceSection?.scrollHeight) + 100
    })

    const experienceNavLink = container.querySelector('#nav-experience')

    waitFor(() => {
      expect(experienceNavLink).toHaveClass('text-highlight')
    })
  })
})
