it('Deve marcar os top 5 de filmes', function(){
    cy.visit('https://training-wheels-qaninja.herokuapp.com/checkboxes')

    cy.get('input[name=avengers]').click()
})