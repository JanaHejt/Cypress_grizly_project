export default new class productDescriptionComponent {
  productDescription() {
    return cy.get('div[class="pd-body__description"]');
  }
  descriptionSelector() {
    return cy.get('ul[class="pd-body__selector"]');
  }
  //bodyDescription () {return cy.get('div[class="pd-body__pack"]') }
  titleInDescription = () => {
    cy.get("h2");
  };
  nutritionalData() {
    return cy.get(
      'div[class="pd-body__ingredients-left pd-body__ingredients--nutritional"]'
    );
  }
  productIngredients() {
    return cy.get(
      'div[class="pd-body__ingredients-right pd-body__ingredients--inclusion"]'
    );
  }
  productReviews() {
    return cy.get('div[id="cDetailReview"]');
  }
}
