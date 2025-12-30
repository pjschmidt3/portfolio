describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays the main heading', () => {
    cy.get('h1').contains('Phillip Schmidt').should('be.visible')
  })

  it('displays the subtitle', () => {
    cy.get('h2').contains('Senior Software Developer').should('be.visible')
  })

  it('displays the bio paragraph', () => {
    cy.contains('Senior React Developer with 10+ years of experience').should('be.visible')
  })

  it('displays the Experience section heading', () => {
    cy.contains('Experience').should('be.visible')
  })

  it('displays all timeline entries', () => {
    cy.contains('Career Break — Relocation & Family Care').should('be.visible')
    cy.contains('Lead Developer / Architect').should('be.visible')
    cy.contains('Web Developer / Consultant').should('be.visible')
  })

  it('displays company names', () => {
    cy.contains('TrueCoders').should('be.visible')
    cy.contains('Bailey Brothers Music Company').should('be.visible')
  })

  it('displays locations', () => {
    cy.contains('Covington, LA').should('be.visible')
    cy.contains('Birmingham, AL').should('be.visible')
  })

  it('displays date ranges', () => {
    cy.contains('Aug 2024 - Present').should('be.visible')
    cy.contains('Apr 2021 – Aug 2024').should('be.visible')
    cy.contains('2020 - Apr 2021').should('be.visible')
  })

  it('displays job responsibilities', () => {
    cy.contains('Architected and led development of a large-scale React + Node.js web application').should('be.visible')
    cy.contains('Mentored junior developers in React, TypeScript, Node.js').should('be.visible')
  })

  it('has proper page structure', () => {
    cy.get('main').should('exist')
    cy.get('h1').should('have.length.at.least', 1)
    cy.get('h2').should('have.length.at.least', 1)
  })

  it('renders in dark mode by default', () => {
    cy.get('html').should('have.class', 'dark')
  })
})
