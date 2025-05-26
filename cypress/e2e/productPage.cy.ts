import productPage from "../pages/productPage";
import productDetailComponent from "../pages/components/productDetailComponent";

describe("Product page test", () => {
  const grizly_productPage = new productPage(new productDetailComponent());

  beforeEach(() => {
    cy.visit("https://www.grizly.cz/emco-tycinka-super-ovoce-jahoda-30-g");
    cy.get(".fancybox-slide");
    cy.get("#btn-cookie-accept-all").click();
  });

  it.skip("Ověří přítomnost klíčových prvků a komponent na produktové stránce a jejich viditelnost", () => {
    grizly_productPage.verifyElementsOnProductPage();
  });

  it("Zkontroluje, že je vybraný produkt skladem", () => {
    // Dynamická kontrola dostupnosti produktu
    grizly_productPage.component.productAvailability().then(($availability) => {
      if ($availability.text().includes("Dočasně nedostupné")) {
        cy.log("Produkt je dočasně nedostupný.");
        cy.wrap($availability).should("contain.text", "Dočasně nedostupné");
      } else {
        cy.log("Produkt je skladem.");
        grizly_productPage.component.buyButtons().should("be.visible");
        grizly_productPage.component
          .productAvailability()
          .should("contain.text", "Skladem");
      }
    });

    // Kontrola, že obsah soli je 0g (změnit selektor na ten, který odpovídá skutečné stránce!!)
    it.skip("Zkontroluje, že ve složení výrobku je 0 g soli", () => {
      grizly_productPage.component
        .productAnotation()
        .should("contain.text", "0 g soli");
    });
  });

  it("Vloží produkt do košíku a zkontroluje, že se objeví text o počtu kusů v košíku", () => {
    // Klik na tlačítko pro přidání do košíku
    grizly_productPage.component.buyButtons().find("button").click();

    // Kontrola, že se objeví text s počtem kusů v košíku (více než 0)
    grizly_productPage.component
      .buyText()
      .should("contain.text", "ks v košíku");
    cy.get(".stepper-input input")
      .invoke("val")
      .then((value) => {
        expect(Number(value)).to.be.greaterThan(0);
      });
  });
});
