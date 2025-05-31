import navBarComponent from "./components/navBarComponent"
import productDetailComponent from './components/productDetailComponent'
import productDescriptionComponent from "./components/productDescriptionComponent";


 export default class productPage {
 public component: productDetailComponent;

  constructor(component: productDetailComponent) {
    this.component = component;

   
  }
   //Selektory

   breadcrumbs() { return cy.get('nav[id="CategoryPar"]') }
   similarProducts() {
      return cy.get('div[class="pgm-carousel similar-products"]')
   }
   productReview () {return cy.get('div[id="cDetailReview"]')
   }

  //Metoda pro ověření elementů na stránce
   verifyElementsOnProductPage() {
      this.breadcrumbs().should('be.visible')
      this.component.productImage().should('be.visible')
      this.component.productProducer().should('be.visible')
      this.component.productName().should('be.visible')
      this.component.productRating().should('be.visible')
      //this.component.addToFavorites().should('be.visible')
      this.component.productPrice().should('be.visible')
      this.component.buyButtons().should('be.visible')
      this.component.productAvailability().should('be.visible')
      this.component.daterDelivery().should('be.visible')
      this.component.deliveryPrice().should('be.visible')
      this.component.productAnotation().should('be.visible')
      this.similarProducts().should('be.visible')
      this.productReview().should('be.visible')
   }
//Metoda pro ověření sekce productDescription

verifyElementsOnProductDescription(){
    
}

}