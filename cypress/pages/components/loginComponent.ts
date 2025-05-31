export interface User {
    email: string,
    password: string
}

class LoginPage {
  //Selektory

  emailInput() {
    return cy.get('input[tabindex="1"]');
  }
  passwordInput() {
    return cy.get('input[tabindex="2"]');
  }
  loginButton(){
     return cy.get('input[tabindex="3"]');
  }
  logoutButton(){
    return cy.get('a[class="odhlaseni"]')
  }
  loginFailMessage(){
    return cy.get('div[id="logFailMess"]')
  }

//   loginFailMessage(options?: Partial<Cypress.Timeoutable>) {
//   return cy.get('#logFailMess', options);
// }

  //Metoda
  login(user: User) {
    this.emailInput().type(user.email);
    this.passwordInput().type(user.password);
    this.loginButton().click();
  }
};

export default new LoginPage();