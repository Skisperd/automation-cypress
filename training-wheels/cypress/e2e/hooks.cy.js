
describe('Suite de testes', function(){

    before(function(){
        cy.log('Antes de tudo')
    })

    beforeEach(function(){
        cy.log('Antes dos testes')
    })

    it('Teste 1', function(){
        cy.log('testando o teste 1')
    })
    
    it('Teste 2', function(){
        cy.log('testando o teste 2')
    })
    
    it('Teste 3', function(){
        cy.log('testando o teste 3')
    })

    after(function(){
        cy.log('Depois de tudo')
    })
    
})

