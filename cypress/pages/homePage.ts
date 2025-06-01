import akceComponent from "./components/akceComponent";
import NavBarComponent from "./components/navBarComponent";

export enum MenuItems {
  AKCE_SLEVY = "AKCE A SLEVY",
  GRIZLY_SVET = "GRIZLY SVĚT",
  ORECHY = "Ořechy",
  SUSENE_A_LYO_OVOCE = "Sušené a lyo ovoce",
  ORECHOVA_MASLA_AKREMY = "Ořechová másla a krémy",
  VARENI_A_PECENI = "Vaření a pečení",
  SNIDANE = "Snídaně",
  MLSANI = "Mlsání",
  DOPLNKY = "Doplňky stravy a péče"
}

export default new class homePage {
  public navBar = new NavBarComponent();

  storePromo() {
    return cy.get('div[class="store-promo__boxes"]');
  }

  oblibeneKategorie() {
    return cy.get('div[class=" CategoryTreeDirectory clearfix"]');
  }
  akce() {
    return cy.get('div[id="TitleParam_3"]');
  }
  nejprodavanejsi() {
    return cy.get('div[id="TitleParam_5"]');
  }
  novinky() {
    return cy.get('div[id="TitleParam_2"]');
  }

  storeInfo() {
    return cy.get('div[class="store-info"]');
  }
  footer() {
    return cy.get('div[class="footer"]').scrollIntoView();
  }
  //Doporučené produkty po kliku na search input field
  getTopProducts() {
    return cy.get('div[data-type="item"]');
  }

  // Akce: Ověření přítomnosti klíčových prvků
  verifyHomePageElements() {
    this.navBar.getLogo().should("be.visible");
    this.navBar.getMenuBar().should("be.visible");
    this.navBar.getMainMenu().should("be.visible");
    this.navBar.getSearchInput().should("be.visible");
    this.navBar.getSubmitButton().should("be.visible");
    this.navBar.getLoginButton().should("be.visible");
    this.navBar.getCartBox().should("be.visible");

    this.storePromo().should("be.visible");
    this.oblibeneKategorie().should("be.visible");
    this.akce().should("be.visible");
    this.nejprodavanejsi().should("be.visible");
    this.novinky().should("be.visible");
    this.storeInfo().should("be.visible");

    //this.footer().should('be.visible')
  }

  getAkce() {
    this.akce().should("be.visible");
  }

  waitForStickyBanner() {
    return cy.waitForStickyElement(
      'div[class="nav-horizontal catmenu-wrap js-mobile-nav"]'
    );
  }

  // Akce: ověří, že menu banner je viditelný a obsahuje konkrétní počet položek
  verifyMenuItems(expectedCount = 3) {
    //this.scrollToMenuBanner()
    this.navBar.getMainMenu().should("be.visible").click(); //.and('contain',this.getMenuBanner)
    this.navBar.getMenuItems()
      .should("be.visible")
      .should("have.length.at.least", expectedCount);
  }

  // Volitelně: ověření, že obsahuje konkrétní texty
  verifyMenuContains(textArray: MenuItems[]) {
    textArray.forEach((text) => {
      this.navBar.getMenuItems().should("contain.text", text);
    });
  }

  //Page po clicku na search input field

  verifySearchTopProducts() {
    this.navBar.getSearchInput().click();
    this.getTopProducts().should("be.visible");
  }
};
