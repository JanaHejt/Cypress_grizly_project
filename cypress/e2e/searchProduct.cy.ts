import navBarComponent from "../pages/components/navBarComponent";
import itemCardComponent from "../pages/components/itemCardComponent";
import productPage from "../pages/productPage";
import productDetailComponent from "../pages/components/productDetailComponent";
import homePage from "../pages/homePage";

describe("Vyhledání produktu", () => {
  //const page = new productPage(new productDetailComponent());
  

  beforeEach(() => {
    cy.visit("https://www.grizly.cz/");
    cy.get(".fancybox-slide");
    cy.get("#btn-cookie-accept-all").click();
  });

  it("Vyhledá produkty s názvem mandle a přesměruje na odpovídající produkt", () => {
    // Act: Vyhledání
    homePage.navBar.getSearchInput().click().type("mandle");
    homePage.navBar.getSubmitButton().click();

    // Assert: Ověření URL po vyhledávání
    cy.url({ timeout: 10000 }).should("include", "/?search=mandle");

    // Najít první odpovídající produkt (Grizly + 250g) a kliknout na jeho název
    cy.get("div.product").each(($el) => {
      const producer = $el.find("span.product__header-producer").text().trim();
      const weight = $el
        .find("span.product__header-weight-value")
        .text()
        .trim();

      if (producer === "GRIZLY" && weight === "250") {
        cy.wrap($el).find("span.product__header-name").click();

        // Assert: přesměrování na detail produktu
        cy.url({ timeout: 10000 }).should("include", "grizly-mandle");
        return false; // přerušení .each()
      }


    });
    
 });


});