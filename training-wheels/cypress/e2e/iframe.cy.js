const niceIFrame = function(){
    return cy 
        .get('#weareqaninja')
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
}

const badIFrame = function(){
    return cy 
        .get('iframe[src*=instagram]')
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
}

it('Deve realizar upload de imagem', function () {
    cy.visit('/bad_iframe')

    badIFrame()
        .contains('.FollowerCountText', '7.325 seguidores')
        .should('be.visible')
})
