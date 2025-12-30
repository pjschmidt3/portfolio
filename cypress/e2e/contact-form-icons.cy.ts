describe('Contact Form Icons', () => {
  beforeEach(() => {
    cy.visit('/contact')
  })

  it('should display icons in form field labels', () => {
    // First Name icon
    cy.contains('label', 'First Name').find('svg').should('exist')

    // Last Name icon
    cy.contains('label', 'Last Name').find('svg').should('exist')

    // Email icon
    cy.contains('label', 'Email').find('svg').should('exist')

    // Subject icon
    cy.contains('label', 'Subject').find('svg').should('exist')

    // Message icon
    cy.contains('label', 'Message').find('svg').should('exist')
  })

  it('should display icon in submit button', () => {
    cy.get('button[type="submit"]').find('svg').should('exist')
    cy.get('button[type="submit"]').should('contain', 'Send Message')
  })

  it('should have proper spacing between icons and text', () => {
    // Check that labels have gap class
    cy.contains('label', 'First Name').should('have.class', 'gap-2')
    cy.contains('label', 'Email').should('have.class', 'gap-2')
  })

  it('should have icons with proper aria attributes', () => {
    // Icons in labels should be decorative
    cy.contains('label', 'First Name').find('svg[aria-hidden="true"]').should('exist')
  })
})
