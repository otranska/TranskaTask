const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://actionurgentcare.com',
    viewportHeight: 1600,
    viewportWidth: 1920,
  },
});