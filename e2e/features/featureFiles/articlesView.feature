@Ci
Feature: Articles are displayed on HomePage

  Scenario: Articles are viewable on homepage
    Given user is not authenticated
    When homepage is loaded
    Then articles are loaded