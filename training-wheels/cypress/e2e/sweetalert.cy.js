it('Deve verificar a mensagem de sucesso', function () {
    cy.visit('/sweet_alert')

    cy.contains('button', 'Sucesso').click()

    cy.get('.swal-text')
        .should('have.text', 'Você clicou no botão verde.')

})

it('Deve verificar a mensagem de deu Ruim', function () {
    cy.visit('/sweet_alert')

    cy.contains('button', 'Deu Ruim').click()

    cy.get('.swal-text')
        .should('have.text', 'Você clicou no botão vermelho.')

})

