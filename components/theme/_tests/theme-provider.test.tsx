import { render, screen, waitFor } from '@testing-library/react'
import ThemeProvider from '@/components/theme/ThemeProvider'
import { useTheme } from 'next-themes'

describe('ThemeProvider', () => {
  it('renders children', () => {
    const children = <div role="test">Testing</div>
    const { container } = render(<ThemeProvider>{children}</ThemeProvider>)

    const childNode = container.querySelector('[role="test"]')
    expect(childNode).toHaveTextContent('Testing')
  })

  it('passes context to children', () => {
    const ChildComponent = function () {
      const { theme } = useTheme()

      return <div role="test">{theme}</div>
    }

    const { container } = render(
      <ThemeProvider
        defaultTheme="dark"
        enableSystem={true}>
        <ChildComponent />
      </ThemeProvider>
    )

    const childContent = container.querySelector('[role="test"]')

    waitFor(() => expect(childContent).toHaveTextContent('dark'))
  })
})
