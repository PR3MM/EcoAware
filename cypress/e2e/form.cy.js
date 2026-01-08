describe('form', () => {
  it('visit the page', () => {
    cy.contains('Schedule E-Waste Collection')
    cy.get('[name="name"]')
    cy.get('[name="email"]')
    cy.get('[name="address"]')
    cy.get('[name="type"]')
    cy.get('[name="weight"]')
    cy.get(':nth-child(5) > .w-full')
    
    // should not submit
    // cy.get(':nth-child(5) > .w-full').click().should('have.value',false)

    // enter text 

    cy.get('[name="name"]').type("sda")
    cy.get('[name="email"]').type("sda@a.com")
    cy.get('[name="address"]').type("sda")
    cy.get('[name="type"]').select("Battery")
    cy.get('[name="weight"]').type(1)
    cy.get(':nth-child(5) > .w-full').click()

      cy.get('.mt-4').should('be.visible')
    })
  })