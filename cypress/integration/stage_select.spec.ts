describe('Stage select', () => {
  context('when the user clicks stage 1 panel', () => {
    it('moves to stage 1', () => {
      cy.visit('/')
      cy.findByTestId('stage-select-panel-1').click()
      cy.url().should('include', '/stages/1')
    })
  })
})
