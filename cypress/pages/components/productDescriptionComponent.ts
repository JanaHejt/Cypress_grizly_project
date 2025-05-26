export default class productDescriptionComponent {

    productDescription = () => { cy.get('div[class="pd-body__description"]') }
    descriptionSelector = () => { cy.get('ul[class="pd-body__selector"]') }
    bodyDescription = () => { cy.get('div[class="pd-body__pack"]') }
    titleInDescription = () => { cy.get('h3') }
    productReviews = () => { cy.get('div[id="cDetailReview"]') }
}

//NENÍ HOTOVÉ ANI SPRÁVNĚ