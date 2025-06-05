export interface User {
  email: string,
  password: string
}

class LoginPage {
  //Selektory

  //parent element v ramci ktereho se budu hledaji elementy
  loginForm() {
    return cy.get('[id="frmLoginForm"]');
  }

  emailInput() {
    return this.loginForm().find('input[name="logEmail"]');
  }
  passwordInput() {
    return this.loginForm().find('input[name="logPass"]');
  }
  loginButton() {
    return this.loginForm().find('input[name="logAdd"]');
  }
  logoutButton() {
    return this.loginForm().find('a[class="odhlaseni"]')
  }

  // toto je tiez validny zapis
  // loginFailMessage(){
  //   return cy.get('div[id="logFailMess"]')
  // }

  loginFailMessage() {
    return this.loginForm().find("#logFailMess");
  }

  //Metoda
  login(user: User) {
    this.emailInput().type(user.email);
    this.passwordInput().type(user.password);
    this.loginButton().click();
  }
};

export default new LoginPage();