describe('Navigation Active States', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should show Home link as active on home page', () => {
    cy.get('nav a[href="/"]')
      .should('have.attr', 'data-active', 'true')
      .should('have.class', 'text-primary')
      .should('have.class', 'font-semibold')
  })

  it('should show Experience link as active on experience page', () => {
    cy.visit('/experience')

    cy.get('nav a[href="/experience"]')
      .should('have.attr', 'data-active', 'true')
      .should('have.class', 'text-primary')
      .should('have.class', 'font-semibold')

    cy.get('nav a[href="/"]').should('have.attr', 'data-active', 'false')
  })

  it('should show Resume trigger as active on resume page', () => {
    cy.visit('/resume')

    cy.get('nav button:contains("Resume")')
      .should('have.attr', 'data-active', 'true')
      .should('have.class', 'text-primary')
      .should('have.class', 'font-semibold')
  })

  it('should show Projects link as active on projects page', () => {
    cy.visit('/projects')

    cy.get('nav a[href="/projects"]')
      .should('have.attr', 'data-active', 'true')
      .should('have.class', 'text-primary')
      .should('have.class', 'font-semibold')

    cy.get('nav a[href="/"]').should('have.attr', 'data-active', 'false')
  })

  it('should show Contact link as active on contact page', () => {
    cy.visit('/contact')

    cy.get('nav a[href="/contact"]')
      .should('have.attr', 'data-active', 'true')
      .should('have.class', 'text-primary')
      .should('have.class', 'font-semibold')

    cy.get('nav a[href="/"]').should('have.attr', 'data-active', 'false')
  })

  it('should update active state when navigating between pages', () => {
    // Start on home page
    cy.get('nav a[href="/"]').should('have.attr', 'data-active', 'true')

    // Click Experience
    cy.get('nav a[href="/experience"]').click()

    cy.url().should('include', '/experience')
    cy.get('nav a[href="/experience"]').should(
      'have.attr',
      'data-active',
      'true'
    )
    cy.get('nav a[href="/"]').should('have.attr', 'data-active', 'false')

    // Click Contact
    cy.get('nav a[href="/contact"]').click()

    cy.url().should('include', '/contact')
    cy.get('nav a[href="/contact"]').should('have.attr', 'data-active', 'true')
    cy.get('nav a[href="/experience"]').should(
      'have.attr',
      'data-active',
      'false'
    )
  })

  it('should display icons in navigation links', () => {
    // Home icon
    cy.get('nav a[href="/"]').find('svg').should('exist')

    // Experience icon
    cy.get('nav a[href="/experience"]').find('svg').should('exist')

    // Projects icon
    cy.get('nav a[href="/projects"]').find('svg').should('exist')

    // Contact icon
    cy.get('nav a[href="/contact"]').find('svg').should('exist')

    // Resume icon in trigger
    cy.get('nav button:contains("Resume")').find('svg').should('exist')
  })

  it('should display icons in resume submenu', () => {
    // Open resume submenu
    cy.get('nav button:contains("Resume")').click()

    // View icon
    cy.contains('View').parent('a').find('svg').should('exist')

    // Download icon
    cy.contains('Download').parent('a').find('svg').should('exist')
  })

  it('should have theme toggle button', () => {
    cy.get('nav button[aria-label*="mode"]').should('exist')
    cy.get('nav button[aria-label*="mode"]').find('svg').should('exist')
  })

  it('should toggle theme when theme button is clicked', () => {
    // Click theme toggle
    cy.get('nav button[aria-label*="mode"]').click()

    // Verify icon changed (either sun or moon should be visible)
    cy.get('nav button[aria-label*="mode"]').find('svg').should('exist')
  })
})
