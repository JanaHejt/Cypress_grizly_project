# Cypress Test Suite Overview
This document summarizes the structure and purpose of automated end-to-end tests written with Cypress for the Grizly.cz website. The tests are organized using the Page Object Model (POM) structure and utilize reusable components.

# Feature: Homepage Display and Navigation

  Scenario: Verify presence of key elements on homepage
    Given I am on the homepage of Grizly.cz
    Then I should see all key homepage elements
    And I should see the navigation bar

  Scenario: Verify visibility of Category Menu and main titles
    Given I am on the homepage of Grizly.cz
    When I look under the navigation bar
    Then I should see the Category Menu with correct item titles

# Feature: Item Card Interactions

  Scenario: Verify all visible elements in item cards
    Given I am on the homepage
    Then I should see the "Akce" section
    And each item card should display basic visible elements

  Scenario: Add a specific product from item card to cart
    Given I am in the "Akce" section
    When I locate the item card for the specific product
    Then it should display the correct title and price
    And I should be able to click the Add to Cart button

  Scenario: Verify cart updates and navigate to cart page
    Given I added a product to the cart
    Then the cart icon should display the correct item count
    When I click the cart icon
    Then I should be redirected to the cart page

# Feature: Cart Flow – Add product and validate cart content

  Scenario: Add product to cart and verify cart content
    Given I add a product to the cart
    When I am redirected to the cart page
    Then the cart page should display the correct structure
    And the added item should appear in the table with correct name and price
    And I should see key elements of the item in the cart

# Feature: User Login and Logout

  Scenario: Successful login with valid credentials
    Given a registered user with valid credentials
    When the user logs in
    Then their name should be visible in the navigation bar
    When the user logs out
    Then the logout should complete successfully

  Scenario: Failed login with invalid credentials
    Given a user with invalid credentials
    When the user attempts to log in
    Then an error message should be displayed

  Note: This scenario may fail in headless mode due to visibility issues.

# Feature: Product Search

  Scenario: Search for a product and navigate to product page
    Given I am on the homepage
    When I search for "mandle"
    Then relevant products should appear
    And I filter results by "250g" and manufacturer "Grizly"
    When I click on the first matching item
    Then I should be redirected to the correct product page

# Feature: Product Detail Page Verification

  Scenario: Verify presence of key product page elements
    Given I am on the product detail page
    Then I should see all key components and elements

  Scenario: Verify that the product is in stock
    Given I am on the product detail page
    Then I should see a message indicating the product is in stock

  Scenario: Verify country of origin is Czech Republic
    Given I am viewing the product description
    Then it should indicate the product was made in Czech Republic

  Scenario: Add product to cart and verify quantity message
    When I add the product to the cart
    Then I should see a message showing the quantity added    
