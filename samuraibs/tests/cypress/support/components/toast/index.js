import { el } from './elements'

class Toast {
    shouldHaveText(expectText) {
        // Verifica se a mensagem de erro é exibida corretamente
        cy.get(el.toast)
            .should('be.visible')
            .find('p')
            .should('have.text', expectText)
    }
}

export default new Toast()