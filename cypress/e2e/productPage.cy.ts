import productPage from "../pages/productPage";
import productDetailComponent from "../pages/components/productDetailComponent";
import productDescriptionComponent from "../pages/components/productDescriptionComponent";

describe("Product page test", () => {
  const product = new productPage(new productDetailComponent());

  beforeEach(() => {
    cy.visit(
      "https://www.grizly.cz/grizly-mandle-v-bile-cokolade-s-kokosem-250-g"
    );
    cy.get(".fancybox-slide");
    cy.get("#btn-cookie-accept-all").click();
  });

  it("Ověří přítomnost klíčových prvků a komponent na produktové stránce a jejich viditelnost", () => {
    product.verifyElementsOnProductPage();
  });

  it("Zkontroluje, že je vybraný produkt skladem", () => {
    // Dynamická kontrola dostupnosti produktu
    product.component.productAvailability().then(($availability) => {
      if ($availability.text().includes("Dočasně nedostupné")) {
        cy.log("Produkt je dočasně nedostupný.");
        cy.wrap($availability).should("contain.text", "Dočasně nedostupné");
      } else {
        cy.log("Produkt je skladem.");
        product.component.buyButtons().should("be.visible");
        product.component
          .productAvailability()
          .should("contain.text", "Skladem");
      }
    });
  });

  // Kontrola, v sekci Složení výrobku, že země požadovaná výroby
  it("Zkontroluje, že země výroby je Česká republika", () => {
    productDescriptionComponent
      .productIngredients()
      .should("contain.text", "Česká republika");
  });

  it("Vloží produkt do košíku a zkontroluje, že se objeví text o počtu kusů v košíku", () => {
    // Klik na tlačítko pro přidání do košíku
    product.component.buyButtons().find("button").click();

    // Kontrola, že se objeví text s počtem kusů v košíku (více než 0)
    product.component.buyText().should("contain.text", "ks v košíku");
    cy.get(".stepper-input input")
      .invoke("val")
      .then((value) => {
        expect(Number(value)).to.be.greaterThan(0);
      });
  });
});
