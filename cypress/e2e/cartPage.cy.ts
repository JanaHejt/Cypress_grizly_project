import homePage from "../pages/homePage";
import akceComponent from "../pages/components/akceComponent";
import cartPage from "../pages/cartPage";
import cartComponent from "../pages/components/cartComponent";

describe("Cart Flow - Add product and validate cart content", () => {
  beforeEach(() => {
    cy.visit("https://www.grizly.cz");
    cy.get(".fancybox-slide");
    cy.get("#btn-cookie-accept-all").click();
    //cy.get('#onesignal-slidedown-allow-button').click()
    homePage.getAkce();
  });

  it("Should add product to cart and verify it on the cart page", () => {
    const itemCard = new akceComponent("18089"); // produkt: Extra virgine olivový olej

    // Přidání produktu do košíkus
    itemCard.buyItemButton().should("be.visible").click();

    // Přejít do košíku přes navBar + Ověření, že jsme na stránce košíku + Delší timeout na načtení

    homePage.navBar.getCartLink().click();
    cy.url({ timeout: 10000 }).should("include", "/basket-1");


    // Nastavení komponenty košíku
    const cartComp = new cartComponent("baskItems_1");
    cartPage.setCartComponent(cartComp);

    // Ověření základních prvků košíku
    cartPage.verifyCartElements();

    // Ověření, že správný produkt je v tabulce
    cartComp.nameItem().should("contain.text", "Jahody lyofilizované XXL");
    cartComp.priceItem().should("contain.text", "169");
  });
});
