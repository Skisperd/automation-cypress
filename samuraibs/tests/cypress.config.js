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
    },
    testIsolation: false, //false = mesma sessão
    apiServer: "https://samuraibs-api-tiago.fly.dev",
    baseUrl: 'https://samuraibs-web-tiago.fly.dev',
    chromeWebSecurity: false,
    defaultCommandTimeout: 30000,
    viewportWidth: 1440,
    viewportHeight: 900,
    projectId: "tbhhim"
  },
});
