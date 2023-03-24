import signup from '../support/pages/signup'
import signupPage from '../support/pages/signup'

describe('Cadastro', function () {

    context('Quando o usuário é novo', function () {
        const user = {
            name: 'Tiago Dias',
            email: 'tf@connectionSystem.com',
            password: 'pwd123'
        }

        // Antes de cada teste, remove o usuário da base de dados
        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        // Teste para cadastrar um novo usuário com sucesso
        it('Deve cadastrar um novo usuário com sucesso', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o usuário já está cadastrado', function () {
        const user = {
            name: 'Tiago Dias',
            email: 'tf.dias@connectionSystem.com',
            password: 'pwd123',
            is_provider: true
        }

        // Antes de cada teste, remove o usuário da base de dados e adiciona ele novamente
        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.equal(200)
            })
        })

        // Teste para verificar se a mensagem de email já cadastrado é exibida corretamente
        it('Deve exibir email já cadastrado', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o email é incorreto', function () {
        const user = {
            name: 'Tiago Dias',
            email: 'tf.diasconnectionSystem.com',
            password: 'pwd123'
        }

        it('Deve exibir a mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('Quando a senha é menor que 6 caracteres', function () {
        const passwords = ['1', '2a', '3ab', '4abc', '5abcd']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('Não deve cadastrar com a senha:' + p, function () {

                const user = {
                    name: 'Tiago Dias',
                    email: 'tf.dias@connectionSystem.com',
                    password: p
                }

                signupPage.form(user)
                signupPage.submit()
            })
        })
        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context('Quando não é preenchido campo obrigatório', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('Deve exibir: ' + alert.toLowerCase(), function () {

                signupPage.alertHaveText(alert)

            })
        })
    })
})