describe('Cadastro', function () {

    // Define as informações do usuário que será cadastrado
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
            cy.visit('signup')

            // Preenche as informações do usuário nos campos do formulário
            cy.get('input[placeholder="Nome"]').type(user.name)
            cy.get('input[placeholder="E-mail"]').type(user.email)
            cy.get('input[placeholder="Senha"]').type(user.password)

            // Realiza o cadastro do usuário clicando no botão de submit
            cy.get('button[type="submit"]').click()

            // Verifica se a mensagem de sucesso é exibida
            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })

        // Teste para verificar se o email já cadastrado é exibido corretamente
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
                cy.visit('signup')

                // Preenche as informações do usuário já cadastrado nos campos do formulário
                cy.get('input[placeholder="Nome"]').type(user.name)
                cy.get('input[placeholder="E-mail"]').type(user.email)
                cy.get('input[placeholder="Senha"]').type(user.password)

                // Realiza o cadastro do usuário já cadastrado clicando no botão de submit
                cy.get('button[type="submit"]').click()

                // Verifica se a mensagem de erro é exibida corretamente
                cy.get('.toast')
                    .should('be.visible')
                    .find('p')
                    .should('have.text', 'Email já cadastrado para outro usuário.')
            })
        })
    })
})
