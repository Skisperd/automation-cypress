const { defineConfig } = require("cypress");

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
    projectId: "osar2q"
  },
});
