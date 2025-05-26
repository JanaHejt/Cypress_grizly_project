export default class cartComponent {
  public basketItems: string;
  public position: number;

  constructor(dataId: string) {
    this.basketItems = dataId;
    this.position = 0; // Defaultně první prvek
  }

  titleCart() {
    return cy.get('h1');
  }
  navigationSteps(){
    return cy.get('div[id="navistep"]')
  }

  //nadrazenyElement
  basketItemsTable() {
    return cy.get(`[id="${this.basketItems}"]`).eq(this.position);
  }

  //Itemy v table

  imageItem() {
    return this.basketItemsTable().find('td[class="img"]');
  }

  nameItem() {
    return this.basketItemsTable().find('td[class="name"]');
  }
  availabilityItem() {
    return this.basketItemsTable().find('td[class="avail"]');
  }

   countItem() {
    return this.basketItemsTable().find('td[class="count"]');
  }
   priceItem() {
    return this.basketItemsTable().find('td[class="withvat"]');
  }
    deleteItem() {
    return this.basketItemsTable().find('td[class="delete"]');
  }
 
}
