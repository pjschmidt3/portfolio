describe('Projects Page', () => {
  beforeEach(() => {
    cy.visit('/projects')
  })

  it('should display the page heading', () => {
    cy.contains('h1', 'Projects').should('be.visible')
  })

  it('should display project items in a carousel', () => {
    cy.get('[data-role="tech"]').should('exist')
    cy.get('button:contains("View on Github")').should('exist')
  })

  it('should have carousel navigation buttons', () => {
    cy.get('button[aria-label="Previous slide"]').should('exist')
    cy.get('button[aria-label="Next slide"]').should('exist')
  })

  it('should display project details', () => {
    // Check that project title exists
    cy.contains('TrueCoders').should('be.visible')

    // Check that technologies are displayed
    cy.get('[data-role="tech"]').should('have.length.greaterThan', 0)

    // Check that action buttons exist
    cy.get('button').contains('View on Github').should('be.visible')
  })

  it('should navigate through carousel items', () => {
    // Click next button
    cy.get('button[aria-label="Next slide"]').click()

    // Verify carousel moved
    cy.get('[data-role="tech"]').should('be.visible')
  })

  it('should have working GitHub links', () => {
    cy.get('a[href*="github.com"]').should('exist')
      .and('have.attr', 'href')
      .and('include', 'github.com')
  })

  it('should display demo links when available', () => {
    // Navigate to find a project with demo link
    cy.get('button').contains('View Site').should('exist')
  })

  it('should display icons in project buttons', () => {
    // GitHub button should have icon
    cy.contains('a', 'View on Github').find('svg').should('exist')

    // View Site button should have icon (if demo exists)
    cy.get('a').contains('View Site').find('svg').should('exist')
  })

  it('should have proper icon accessibility attributes', () => {
    // Icons should be decorative with aria-hidden
    cy.contains('a', 'View on Github').find('svg[aria-hidden="true"]').should('exist')
  })

  it('should have proper spacing between icons and text in buttons', () => {
    // Check that links have gap class
    cy.contains('a', 'View on Github').should('have.class', 'gap-2')
  })
})
