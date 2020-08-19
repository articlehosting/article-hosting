@article
Feature: Article page

  Scenario: Article main sections are displayed
    Given user navigates to "Home" page
    When user is on the Home page
    Then following sections are displayed:
      | Introduction                |
      | Traits of Uruguayan economy |
      | Data and methods            |
      | Results                     |
      | Conclusions                 |
    And all tables are displayed

Scenario: Images in article are displayed
  Given user navigates to "Home" page
  When user is on the Home page
  Then Images in article are loaded

 Scenario: Authors references links redirect to author information
   Given user navigates to "Home" page
   And user is on the Home page
   When user clicks on author name
   Then user is redirected to the "Author reference" page




