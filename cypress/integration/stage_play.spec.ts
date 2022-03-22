describe('Stage play', () => {
  context('when the user clicks the start answering button', () => {
    it('shows the review button', () => {
      cy.visit('/stages/1')
      cy.wait(500)
      cy.findByTestId('start-answering').click()
      cy.findByTestId('review').should('be.visible')
    })
  
    it('shows the keyboard', () => {
      cy.visit('/stages/1')
      cy.wait(500)
      cy.findByTestId('start-answering').click()
      cy.findByTestId('keyboard').should('be.visible')
    })
  })
})
