import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('Login', function () {
    context('Quando o usuário é válido', function () {

        const user = {
            name: 'Tiago Dias',
            email: 'tf.dias@connectionsSystem.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user)
        })


        it('Deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
            
            dashPage.exitButtonClick()
        })
    })

    context('Quando a senha é inválida', function () {

        let user = {
            name: 'Tiago Dias Oliveira',
            email: 'tf.dias.oliveira@connectionsSystem.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () {
                user.password = 'pwd1234'
            })
        })


        it('Deve exibir erro de credenciais', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'

            loginPage.toast.shouldHaveText(message)

        })
    })

    context('Quando o email for inválido', function () {

        const emails = [
            'tiago.com.br',
            'yahoo.com.br',
            '@gmail.com.br',
            'tiago@',
            '123',
            '%$$%',
            'tfd123'

        ]

        before(function(){
            loginPage.go()
        })


        emails.forEach(function (email) {
            it('não deve logar com o email: ' + email, function () {
                const user = { email: email, password: 'pwd123' }
                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
        })

    })

    context('quando não preencho nenhum dos campos', function(){
        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        beforeEach(function(){
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase(), function(){
                loginPage.alert.haveText(alert)
            })
        })
    })

})