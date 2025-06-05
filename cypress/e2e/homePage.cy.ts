import homePage, { MenuItems } from "../pages/homePage";
import akceComponent from "../pages/components/akceComponent";


describe("Ověření domovské stránky Grizly.cz", () => {
  beforeEach(() => {
    cy.visit("/");
    // cy.get('.fancybox-slide')
    // cy.get('#btn-cookie-accept-all').click()
  });

  it("Ověří přítomnost klíčových prvků na domovské stránce", () => {
    //Handeling pop-ups
    cy.get(".fancybox-slide");
    cy.get("#btn-cookie-accept-all").click();
    homePage.verifyHomePageElements();
  });

  it("Ověří zobrazení nabídky Category Menu a hlavních titles", () => {
    cy.get(".fancybox-slide");
    cy.get("#btn-cookie-accept-all").click();
    //grizly_homePage.waitForStickyElement()
    //grizly_homePage.verifySearchTopProducts();
    homePage.verifyMenuItems(3);
    homePage.verifyMenuContains([
      MenuItems.AKCE_SLEVY,
      MenuItems.GRIZLY_SVET,
      MenuItems.ORECHY,
      MenuItems.SUSENE_A_LYO_OVOCE,
      MenuItems.ORECHOVA_MASLA_AKREMY,
      MenuItems.VARENI_A_PECENI,
      MenuItems.SNIDANE,
      MenuItems.MLSANI,
      MenuItems.DOPLNKY
    ]);
  });
});

describe("Interakce s komponentou Akce a přidání položky do košíku", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".fancybox-slide");
    cy.get("#btn-cookie-accept-all").click();
    homePage.getAkce();
  });

  it("Should verify all (visible) elements in the item card", () => {
    const itemCard = new akceComponent("18089"); // Vytvoření instance s dataId xy
    itemCard.nadradenyElementAkce().should("be.visible");
  });

  it("Should find product item and click Add to cart button", () => {
    const itemCard = new akceComponent("18089"); // Vytvoření instance s dataId xy
    //itemCard.nadradenyElementAkce().should("be.visible");
    itemCard
      .nameItem()
      .should("contain.text", "Jahody lyofilizované XXL");
    itemCard.itemPrice().should("contain.text", "169");
    itemCard
      .buyItemButton()
      .should("be.visible")
      .should("contain.text", "Do košíku")
      .click();
  });

  it("Should verify that item was added to cart and correct number indication is displayed + navigate to cart page", () => {
    const itemCard = new akceComponent("18089");

    // Přidání položky do košíku
    itemCard.buyItemButton().click();

    // Ověření, že se u ikonky košíku objevil počet
    homePage.navBar
      .cartItemCount()
      .should("be.visible")
      .and("not.contain.text", "0")
      .and("contain.text", "1");

    //Přesměrování na cart page a ověření, že jsme na cart page
    homePage.navBar.getCartBox().click();
    cy.url().should("include", "/basket-1");
    
  });
});
