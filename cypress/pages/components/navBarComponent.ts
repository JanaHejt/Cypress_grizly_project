export default class navBarComponent {
  getLogo = () => {
    return cy.get('a[class="header__mid--logo"]');
  };

  getMenuBar = () => {
    return cy.get('div[class="nav-panel"]');
  };

  // Vyhledávací pole
  getSearchInput = () => {
    return cy.get('input[name="search"]');
  };

  getSubmitButton = () => {
    return cy.get('button[id="searchButt"]');
  };

  // Přihlášení, Odhlášení a registrace
  getLoginButton() {
    return cy.get('div[id="LoginLite"]');
  }
  getLoginBox(){
    return cy.get('div[class="login-box__icon"]')
  }

  //Košík
  getCartBox = () => {
    return cy.get('div[id="basketBoxLite"]');
  };

  getCartLink() {
    return cy.get('#basketBoxLite a[href="/basket-1/"]').first();
  }
  cartItemCount = () => {
    return cy.get('div[class="nav-panel__item-counter basket__count"]');
  };
  //Menu bar - scroll dependent
  getMainMenu = () => {
    return cy.get('ul[class="nav-horizontal__menu categoryTree"]'); //('div[class="nav-horizontal catmenu-wrap js-mobile-nav"]')
  };

  //itemy v menu baru
  getMenuItems = () => {
    return cy.get('ul[data-level="1"] li'); // vrací všechny <li>
  };
}
