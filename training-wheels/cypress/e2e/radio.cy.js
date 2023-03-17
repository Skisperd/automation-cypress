it('Deve marcar o radio button', function(){
    cy.visit('/radios')

    
    cy.get('input[value=thor3]')
    .click()
    .should('be.checked')
})