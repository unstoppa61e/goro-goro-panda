describe('Modal', () => {
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
  
  const clearStage = () => {
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
  }
  
  const clearReview = () => {
    for (let i = 0; i < 10; i++) {
      cy.wait(1000)
      cy.findByTestId('start-answering').click()
      for (let j = 0; j < 5; j++) {
        clearWordplayByClicking();
      }
    }
  }
  
  context('when the user clears stage 1', () => {
    context('when the user clicks "move to stage select" button', () => {
      it('moves to stage select page', () => {
        cy.visit('/stages/1')
        cy.wait(750)
        clearStage()
        cy.wait(750)
        cy.findByTestId('move-to-stage-select-button').click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
      })
    })
    
    context('when the user clicks "move to next stage" button', () => {
      it('moves to stage 2', () => {
        cy.visit('/stages/1')
        cy.wait(2000)
        clearStage()
        cy.wait(2000)
        cy.findByTestId('move-to-next-stage-button').click()
        cy.wait(2000)
        cy.url().should('eq', Cypress.config().baseUrl + '/stages/2')
      })
    })
  })
  
  context('when the user clears stage 10', () => {
    context('when the user clicks "move to next stage" button', () => {
      it('moves to review 1', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'u51');
        cy.visit('/stages/10')
        cy.wait(2000)
        clearStage()
        cy.wait(2000)
        cy.findByTestId('move-to-next-stage-button').click()
        cy.wait(2000)
        cy.url().should('eq', Cypress.config().baseUrl + '/reviews/1')
      })
    })
  })
  
  context('when the user clears review 1', () => {
    context('when the user clicks "move to next stage" button', () => {
      it('moves to the finale page', () => {
        cy.setLocalStorage('gorogoropanda.com/clearedStage', 'ttw');
        cy.visit('/reviews/1')
        cy.wait(6000)
        clearReview()
        cy.wait(6000)
        cy.findByTestId('move-to-next-stage-button').click()
        cy.wait(6000)
        cy.url().should('eq', Cypress.config().baseUrl + '/thank-you-for-playing')
      })
    })
  })
})
