export default class itemCardComponent {
  constructor(private root?: Cypress.Chainable<JQuery<HTMLElement>>) {}

   static getAllCards() {
    return cy.get('div[class="product f-carousel__slide flytobasket  main-param rating item-bestsellers"]');
  }

  productHeaderProducer() {
    return cy.get('span[class="product__header-producer"]');
  }
  productHeaderName() {
    return cy.get('span[class="product__header-name"]');
  }
  productHeaderWeight() {
    return cy.get('span[class="product__header-weight-value"]');
  }
  productImage() {
    return cy.get('div[class="product__image"]');
  }
  productPrice() {
    return cy.get('div[class="product__prices"]');
  }
  buyButton() {
    return cy.get('div[class="product__order-btn pm_plus"]');
  }
}
