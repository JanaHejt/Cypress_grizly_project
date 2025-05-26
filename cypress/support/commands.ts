/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      waitForStickyElement(
        selector: string,
        scrollY?: number,
        timeout?: number
      ): Chainable;
      login(user: User): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

export {}; // 👈 důležité pro správný TypeScript modul

import { User } from "../pages/components/loginComponent";
import loginComponent from "../pages/components/loginComponent";
import homePage from "../pages/homePage";

Cypress.Commands.add("login", (user: User) => {
  loginComponent.emailInput().type(user.email);
  loginComponent.passwordInput().type(user.password);
  loginComponent.loginButton().click();
});

Cypress.Commands.add("logout", () => {
  homePage.navBar.getLoginBox().click();
  cy.get('a[class="odhlaseni"]').should("be.visible").click();
});

// Cypress.Commands.add('handleOneSignalPopup', () => {
//   cy.get('body', { timeout: 5000 }).then(($body) => {
//     const popup = $body.find('#onesignal-slidedown-dialog');

//     if (popup.length > 0 && popup.is(':visible')) {
//       cy.log('OneSignal popup detected, clicking allow button');
//       cy.get('#onesignal-slidedown-allow-button').click();
//     } else {
//       cy.log('OneSignal popup not present or not visible');
//     }
//   });
// });

Cypress.Commands.add(
  "waitForStickyElement",
  (selector: string, scrollY = 200, timeout = 5000) => {
    cy.scrollTo(0, scrollY);

    cy.get("body", { timeout }).then(($body) => {
      if ($body.find(selector).length > 0) {
        cy.get(selector, { timeout }).should("be.visible");
      } else {
        cy.log(`Element ${selector} se neobjevil po scrollu.`);
      }
    });
  }
);
