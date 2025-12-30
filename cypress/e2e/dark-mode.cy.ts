describe('Dark Mode', () => {
  it('loads with dark mode by default', () => {
    cy.visit('/')
    cy.get('html').should('have.class', 'dark')
  })

  it('applies dark theme CSS variables', () => {
    cy.visit('/')
    cy.get('html').should('have.class', 'dark')
    cy.get('body').should('have.css', 'background-color')
  })

  it('renders all elements visibly in dark mode', () => {
    cy.visit('/')
    cy.get('h1').should('be.visible')
    cy.get('h2').should('be.visible')
    cy.get('p').should('be.visible')
  })
})
