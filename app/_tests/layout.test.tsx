import { render, waitFor } from '@testing-library/react'
import Layout from '@/app/layout'

describe('main layout', () => {
  it('should add the font variable css classes', () => {
    const { container } = render(
      <Layout>
        <div>Testing</div>
      </Layout>
    )

    const body = container.querySelector('body')

    waitFor(() => {
      expect(body?.className).toContain('roboto')
    })
  })
})
