describe('Review play', () => {
  const clickCorrectNumberKey = () => {
    cy.get('.bg-focused').children().children('.invisible').then(($correctNumberTile) => {
      const correctNumber = $correctNumberTile.text()
      cy.findByTestId(`number-key-${correctNumber}`).click()
    })
  }
  
  const clearWordplayByClicking = () => {
    for (let i = 0; i < 2; i++) {
      clickCorrectNumberKey();
    }
  }
  
  context('when the user clears ten sets', () => {
    it('shows the modal', () => {
      cy.setLocalStorage('gorogoropanda.com/clearedStage', 'ttw');
      cy.visit('/reviews/1')
      cy.wait(500)
      for (let i = 0; i < 10; i++) {
        cy.findByTestId('start-answering').click()
        for (let j = 0; j < 5; j++) {
          clearWordplayByClicking();
        }
      }
      cy.findByTestId('modal').should('be.visible')
    })
  })
})
