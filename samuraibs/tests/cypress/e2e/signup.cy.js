import signupPage from '../support/pages/signup'


describe('Cadastro', function () {

    before(function () {
        cy.fixture('signup').then(function (signup) {
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('Quando o usuário é novo', function () {
        before(function () {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        })

         it('Deve cadastrar um novo usuário com sucesso', function () {

            signupPage.go()
            signupPage.form(this.success)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('Quando o usuário já está cadastrado', function () {
        // Antes de cada teste, remove o usuário da base de dados e adiciona ele novamente
        before(function () {
            cy.postUser(this.email_dup)
        })
        // Teste para verificar se a mensagem de email já cadastrado é exibida corretamente
        it('Deve exibir email já cadastrado', function () {
            signupPage.go()
            signupPage.form(this.email_dup)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Quando o email é incorreto', function () {
        it('Deve exibir a mensagem de alerta', function () {
            signupPage.go()
            signupPage.form(this.email_inv)
            signupPage.submit()
            signupPage.alert.haveText('Informe um email válido')
        })
    })

    context('Quando a senha é menor que 6 caracteres', function () {
        const passwords = ['1', '2a', '3ab', '4abc', '5abcd']

        passwords.forEach(function (p) {
            it('Não deve cadastrar com a senha:' + p, function () {

                this.short_password.password = p

                signupPage.go()
                signupPage.form(this.short_password)
                signupPage.submit()
            })
        })
        afterEach(function () {
            signupPage.alert.haveText('Pelo menos 6 caracteres')
        })
    })

    context('Quando não é preenchido campo obrigatório', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function(){
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function(alert){
            it('deve exibir ' + alert.toLowerCase(), function(){
                signupPage.alert.haveText(alert)
            })
        })
    })
})