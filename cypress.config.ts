const { defineConfig } = require("cypress");


module.exports = defineConfig({
  
  e2e: {
   "baseUrl":'https://www.grizly.cz/',
   env: {
      USER_EMAIL: 'hejtmankovaTest@gmail.com',
      USER_PASSWORD: 'KSbq7hkhFRj.SVL'
    },
  //  "video": true,
  //  "videosFolder": 'cypress/videos',
    "watchForFileChanges": false,
    "viewportHeight":3000,
    "viewportWidth":1700,
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
