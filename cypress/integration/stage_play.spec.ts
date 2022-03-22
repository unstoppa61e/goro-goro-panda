describe('Stage play', () => {
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
  
  context('when the user clicks the start answering button and inputs two correct numbers by clicking number buttons', () => {
    it('shows the keyboard', () => {
      cy.visit('/stages/1')
      cy.wait(500)
      cy.findByTestId('start-answering').click()
      clearWordplayByClicking();
      cy.findByTestId('start-answering').should('be.visible')
    })
  })
  
  context('when the user clears five wordplays continuously', () => {
    it('levels up', () => {
      cy.visit('/stages/1')
      cy.wait(500)
      for (let i = 0; i < 5; i++) {
        cy.findByTestId('start-answering').click()
        clearWordplayByClicking();
      }
      cy.get('.text-ok').contains('レベルアップ')
    })
  })
  
  context('when the user clears fifteen sets', () => {
    it('shows the modal', () => {
      cy.visit('/stages/1')
      cy.wait(500)
      let level = 0;
      for (const number of [5, 3, 3, 3, 1]) {
        level++;
        for (let i = 0; i < number; i++) {
          cy.findByTestId('start-answering').click()
          for (let j = 0; j < level; j++) {
            clearWordplayByClicking();
          }
        }
      }
      cy.findByTestId('modal').should('be.visible')
    })
  })
})
