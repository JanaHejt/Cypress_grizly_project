import loginComponent, { User } from "../pages/components/loginComponent";

import homePage from "../pages/homePage";
//import navBarComponent from "../pages/components/navBarComponent";

describe("Login", () => {
  const user: User = {
    email: Cypress.env("USER_EMAIL"),
    password: Cypress.env("USER_PASSWORD"),
  };

  it("Should verify input fields visibility and log in registered user with valid credentials", () => {
    //Arrange
    cy.visit("https://www.grizly.cz/");
    cy.get(".fancybox-slide");
    cy.get("#btn-cookie-accept-all").click();

    //Act - login
    homePage.navBar.getLoginButton().click();
    cy.login(user);

    //Assert - ověření přihlášení
    cy.get(
      ".nav-panel__item.nav-panel__item--login.user.login-box.js-login-box"
    ).within(() => {
      cy.get("a.nav-panel__item-link.link-my-profile")
        .should("have.attr", "title", "Janka H.")
        .should("contain.text", "Janka H.");
    });

    // Act – logout
    cy.logout();

    // Assert – ověření odhlášení
    homePage.navBar.getLoginButton().should("contain.text", "Přihlásit");
  });

  it("Login should fail for user with invalid credentials", () => {  //npx cypress run --spec "cypress/e2e/login.cy.ts" --browser chrome --headless
    cy.fixture("invalidUser").then((invalidUser) => {
      // Arrange
      cy.visit("https://www.grizly.cz/");
      cy.get(".fancybox-slide");
      cy.get("#btn-cookie-accept-all").click();

      // Zachytíme login request -> pro funkčnost testu v headless mode
      cy.intercept("POST", "**/Services/EShopService.svc/CheckLoginClient").as(
        "loginRequest"
      );

      // Act
      homePage.navBar.getLoginButton().click();
      loginComponent.emailInput().type(invalidUser.email);
      loginComponent.passwordInput().type(invalidUser.password);
      loginComponent.loginButton().click();

      // Čekám na odpověď serveru
      cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);

      // Ověření textu chybové hlášky bez ohledu na visibility
      cy.get("#logFailMess td", { timeout: 10000 }).should(($td) => {
        const text = $td.text().trim();
        expect(text).to.include("Neplatné přihlášení");
      });

      // Assert -> tento test funugje pouze v GUI, ale pro headless mode nestačí
      // loginComponent
      //   .loginFailMessage()
      //   .should("be.visible")
      //   .and("contain.text", "Neplatné přihlášení.");
    });
  });
});
