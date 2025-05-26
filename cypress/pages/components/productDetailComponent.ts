export default class productDetailComponent {

    constructor(){

    }

    productImage() { return cy.get('div[class="pd__images"]') }
    productProducer() { return cy.get('p[class="pd__header-producer"]') }
    productName() { return cy.get('h1[itemprop="name"]') }
    productRating() { return cy.get('div[itemprop="aggregateRating"]') }
    addToFavorites() { return cy.get('a[class="add-favorites fav26593 active"]') }
    productPrice() { return cy.get('p[class="pricevat pd__data-price-regular"]') }
    buyButtons() { return cy.get('div[class="detail-buy-buttons"]') }
    buyText() { return cy.get('span[class="stepper-input__text"]') }
    productAvailability () { return cy.get('div[class="pd__data-order-info-avail"]') }
    daterDelivery() { return cy.get('div[class="DaterDelivery"]') }
    deliveryPrice() { return cy.get('p[class="pd__icon pd__icon--delivery-price"]') }
    productAnotation(){return cy.get('div[class="pd__data-anotation"]')} 


}