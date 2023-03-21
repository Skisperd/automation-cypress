it('Deve exibir 7 series', function () {
    cy.visit('/tables')

    cy.get('table tbody tr')
        .then(function (series) {
            expect(series).to.have.length(7)
        })
})

it('Deve exibir a serie loki', function () {
    cy.visit('/tables')

    cy.contains('table tbody tr', 'Loki')
        .then(function (item) {
            expect(item).to.contain('Marvel')
            expect(item).to.contain('Disney+')
            expect(item).to.contain('2021')
        })
})


it('Deve remover a serie round 6', function () {
    cy.visit('/tables')

    cy.contains('table tbody tr', 'Round 6')
        .then(function (item) {
            item.find('.delete').click()
        })
        .should('not.exist')

    cy.get('table tbody tr')
        .then(function (series) {
            expect(series).to.have.length(6)
        })
})
