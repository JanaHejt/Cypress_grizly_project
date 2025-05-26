export default class akceComponent {

    public akceItemSelector: string;
    public position: number;

  constructor(dataId3: string) {
    this.akceItemSelector = dataId3;
    this.position = 0; // Defaultně první prvek
  }

  //NADRAZENY ELEMENT ZAPOUZDRI JEDNU MENU POLOŽKU
  nadradenyElementAkce() {
    return cy.get(`[data-id="${this.akceItemSelector}"]`).eq(this.position);
  }

    //TOTO VŠE JE V KAŽDÉ JEDNÉ KARTĚ

    nameItem() {
        return this.nadradenyElementAkce().find('span[class="product__header-name"]')
    }
    weightItem() {
        return this.nadradenyElementAkce().find('span[class="product__header-weight"]')
    }
    addToFavouritesItem() {
        return this.nadradenyElementAkce().find('a[class="add-favorites fav860"]')// title="Přidat do oblíbených"??
    }
    imageItem() {
        return this.nadradenyElementAkce().find('div[class="product__image"]')

    }
    imageItemAttributes() {
        return this.nadradenyElementAkce().find('div[class="product__image-attributes"]')
    }

    linkItem() {
        return this.nadradenyElementAkce().find('a href')//.click()
    }
    itemPrice() {
        return this.nadradenyElementAkce().find('strong[class="pricevat price"]')
    }
    buyItemButton() {
        return this.nadradenyElementAkce().find('form[class="frmBuyItem pmDiv"]')//.click()
    }
}
