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
    cy.visit("/");
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
      
      cy.visit("/");
      cy.get(".fancybox-slide");
      cy.get("#btn-cookie-accept-all").click();

      // Zachytíme login request -> pro funkčnost testu v headless mode
      cy.intercept("POST", "**/Services/EShopService.svc/CheckLoginClient").as(
        "loginRequest"
      );

      // Act
      // toto idealne preniest do POM , login() metodu tam uz mate
      homePage.navBar.getLoginButton().click();
      loginComponent.emailInput().type(invalidUser.email);
      loginComponent.passwordInput().type(invalidUser.password)
        .should("have.value", invalidUser.password).wait(500); // čekám 500ms, aby se vyplnilo pole
      loginComponent.loginButton().should('be.enabled').click();

      // Čekám na odpověď serveru
      cy.wait("@loginRequest").its("response.statusCode").should("eq", 200);


      // Assert
      loginComponent
        .loginFailMessage()
        .should("be.visible")
        .and("contain.text", "Neplatné přihlášení.");
    });
  });
});
