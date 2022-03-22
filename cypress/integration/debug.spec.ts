describe('Debug', () => {
  context('when the user moves to stage 1', () => {
    it('does not show the debug button', () => {
      cy.visit('/stages/1')
      cy.wait(500)
      cy.findByTestId('debug').should('not.exist')
    })
  })
  
  context('when the user moves to review 1', () => {
    it('does not show the debug button', () => {
      cy.setLocalStorage('gorogoropanda.com/clearedStage', 'ttw');
      cy.visit('/reviews/1')
      cy.wait(500)
      cy.findByTestId('debug').should('not.exist')
    })
  })
})
