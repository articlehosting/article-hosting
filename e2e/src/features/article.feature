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





