describe('URL access', () => {
  context('when the user accesses stage 1 URL', () => {
    it('moves to stage 1', () => {
      cy.visit('/stages/1')
      cy.wait(750)
      cy.url().should('eq', Cypress.config().baseUrl + '/stages/1')
    })
  })
  
  context('when the user accesses stage 2 URL', () => {
    context('if stage 1 is not cleared yet', () => {
      it('gets redirected home', () => {
        cy.visit('/stages/2')
        cy.wait(750)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })
    
    context('if stage 1 is already cleared', () => {
      it('moves to stage 2', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'gjj');
        cy.visit('/stages/2')
        cy.wait(750)
        cy.url().should('eq', Cypress.config().baseUrl + '/stages/2')
      })
    })
  })
  
  context('when the user accesses review stage 1 URL', () => {
    context('if no stages are cleared yet', () => {
      it('gets redirected home', () => {
        cy.visit('/reviews/1')
        cy.wait(750)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })
    
    context('if stage 9 is already cleared and stage 10 is not cleared yet', () => {
      it('gets redirected home', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'u51');
        cy.visit('/reviews/1')
        cy.wait(750)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })

    context('if stage 10 is already cleared', () => {
      it('moves to review 1', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'ttw');
        cy.visit('/reviews/1')
        cy.wait(750)
        cy.url().should('eq', Cypress.config().baseUrl + '/reviews/1')
      })
    })
  })
  
  context('when the user accesses finale page URL', () => {
    context('if no stages are cleared yet', () => {
      it('gets redirected home', () => {
        cy.visit('/thank-you-for-playing')
        cy.wait(750)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })
    
    context('if stage 10 is already cleared and review 1 is not cleared yet', () => {
      it('gets redirected home', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'ttw');
        cy.visit('/thank-you-for-playing')
        cy.wait(750)
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })
    
    context('if stage 10 and review 1 are already cleared', () => {
      it('moves to review 1', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'ttw');
        cy.setLocalStorage('gorogoropanda.com/clearedReview', 'gjj');
        cy.visit('/thank-you-for-playing')
        cy.wait(750)
        cy.url().should('eq', Cypress.config().baseUrl + '/thank-you-for-playing')
      })
    })
  })
})
