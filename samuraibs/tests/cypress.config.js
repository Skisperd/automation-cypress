const { defineConfig } = require("cypress");
const { Pool } = require('pg')

const pool = new Pool({
  user: "kxoyfbqk",
  password: "D6E2fSF-J9ypRLza8XLG1R9ot7kxfoYS",
  host: "babar.db.elephantsql.com",
  database: "kxoyfbqk",
  ssl: false,
  port: 5432
})

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      if (config.isTextTerminal) {
        console.log('cypress run!')
      }
      
      on("task", {
        removeUser(email) {
          return new Promise(function (resolve) {
            pool.query('DELETE FROM public.users WHERE email = $1', [email], function(error, result) {
              if (error) {
                throw error
              }
              resolve({ success: result })
            })
          })
        },
      })
    },
    testIsolation: false, //false = mesma sessão
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    viewportWidth: 1440,
    viewportHeight: 900
  },
});
