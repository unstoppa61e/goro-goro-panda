describe('Stage select', () => {
  context('when the user clicks stage 1 panel', () => {
    it('moves to stage 1', () => {
      cy.visit('/')
      cy.findByTestId('stage-select-panel-1').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/stages/1')
    })
  })
  
  context('when the user clicks stage 2 panel', () => {
    context('if stage 1 is not cleared yet', () => {
      it('remains home', () => {
        cy.visit('/')
        cy.wait(500)
        cy.findByTestId('stage-select-panel-2').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })
    
    context('if stage 1 is already cleared', () => {
      it('moves to stage 2', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'gjj');
        cy.visit('/')
        cy.wait(500)
        cy.findByTestId('stage-select-panel-2').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/stages/2')
      })
    })
  })
  
  context('when the user clicks review stage 1 panel', () => {
    context('if stage 9 is already cleared and stage 10 is not cleared yet', () => {
      it('remains home', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'u51');
        cy.visit('/')
        cy.wait(500)
        cy.findByTestId('review-panel-1').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })
    
    context('if stage 10 is already cleared', () => {
      it('moves to review 1', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'ttw');
        cy.visit('/')
        cy.wait(500)
        cy.findByTestId('review-panel-1').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/reviews/1')
      })
    })
  })
})
