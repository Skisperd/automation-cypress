it('Deve realizar upload de imagem', function () {
    cy.visit('/upload')

    const imageFile = 'cypress/downloads/teste.jpg'
    cy.get('input[name=file]').selectFile(imageFile, {force: true})

    cy.get('input[value=Upload]').click()

    cy.get('img[src="/uploads/teste.jpg"]', {timeout: 8000})
        .should('be.visible')
})
