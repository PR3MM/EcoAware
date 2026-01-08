describe('Guide Page', () => {
  it('visit guide page ', () => {

    cy.visit('http://localhost:5173/guide')
    cy.contains("Learn how to properly segregate different types")


    // cy.get('[data-cy="category-category.id"]')
    cy.get('[data-cy="category-1"]').should('be.visible')
    cy.get('[data-cy="category-2"]').should('be.visible')
    cy.get('[data-cy="category-3"]').should('be.visible')
    cy.get('[data-cy="category-4"]').should('be.visible')
    cy.get('[data-cy="category-5"]').should('be.visible')
    cy.get('[data-cy="category-1"]').click()
    cy.get('[data-cy="category-2"]').click()
    cy.get('[data-cy="category-3"]').click()
    cy.get('[data-cy="category-4"]').click()
    cy.get('[data-cy="category-5"]').click()

    cy.contains('Large appliances like refrigerators, washing machines, and microwaves.').should('be.visible')


    })
  })