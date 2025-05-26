import cartComponent from "./components/cartComponent";

export default new class cartPage {
  public cartComponent!: cartComponent; // Non-null assertion operator


  //Elements
  deliverySumPrice() {
    return cy.get('section[id="basketSumPrice"]');
  }

  nextStep() {
    return cy.get('a[href="/basket-2/"]');
  }
  basketEmptyMessage(){
    return cy.get('div[id="basketcommodity"]')
  }
  spanText(){
    return cy.get('span[Váš košík neobsahuje žádnou položku.]')
  }

  // Metoda pro dynamické nastavení komponenty
  setCartComponent(cartComponent: cartComponent) {
    this.cartComponent = cartComponent;
  }

  //Metoda pro kontrolu prvků na stránce prázdného košíku
  verifyEmptyCartElements(){
     cy.get('div[id="basketBoxLite"]').click();
    //this.cartComponent.titleCart().should('not.be.visible');
     //this.cartComponent.navigationSteps().should('be.visible');
    //this.cartComponent.basketItemsTable().should('not.be.visible');
    this.basketEmptyMessage().should('be.visible')
    this.spanText().should('contain.text', 'Váš košík neobsahuje žádnou položku.')
  }

  // Metoda pro kontrolu prvků v košíku
  verifyCartElements() {
    this.cartComponent.titleCart().should('be.visible');
    this.cartComponent.navigationSteps().should('be.visible');
    this.cartComponent.basketItemsTable().should('be.visible');
    this.cartComponent.imageItem().should('be.visible');
    this.cartComponent.nameItem().should('be.visible');
    this.cartComponent.availabilityItem().should('be.visible');
    this.cartComponent.countItem().should('be.visible');
    this.cartComponent.priceItem().should('be.visible');
    this.cartComponent.deleteItem().should('be.visible');
    this.deliverySumPrice().should('be.visible');
    this.nextStep().should('be.visible');
  }
}