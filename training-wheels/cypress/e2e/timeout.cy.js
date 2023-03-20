it('Deve verificar o time', function () {
    cy.visit('/timeout')

    cy.contains('button', 'Habilita').click()

    cy.get('#firstname')
        .should('be.visible')
        .type('Tiago Dias', {timeout: 8000})
})
