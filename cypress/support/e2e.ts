// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

Cypress.on("uncaught:exception", (err: Error) => {
  if (err.message.includes("Cannot read properties of null")) {
    return false;
  }
});
// Cypress.on('uncaught:exception', (err, runnable) => {
//     return false
// })

//Ignore fetch logs
const app = window.top
if (app!.document.head.querySelector('[data-hide-command-log-request]')) {
    const style = app!.document.createElement('style')
    style.innerHTML =
        '.command-name-request, .command-name-xhr { display: none }'
    style.setAttribute('data-hide-command-log-request', '')
    app!.document.head.appendChild(style)
}

//U webů, kde je hodně animací
// Cypress.on('window:before:load', window => {
//     window.document.head.insertAdjacentHTML(
//         'beforeend',
//         `
//     <style>
//       /* Disable CSS transitions. */
//       *, *::before, *::after { -webkit-transition: none !important; -moz-transition: none !important; -o-transition: none !important; transition: none !important; }
//       /* Disable CSS animations. */
//       *, *::before, *::after { -webkit-animation: none !important; -moz-animation: none !important; -o-animation: none !important; animation: none !important; }
//     </style>
//   `
//     )
// })



// Import commands.js using ES2015 syntax:
import './commands'

