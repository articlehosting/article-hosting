Feature: Home Page main elements

  @Ci
  Scenario: List of articles are displayed
    Given user navigates to "Home" page
    When user is on the Home page
    Then list of articles is displayed

  Scenario: Verify the articles contain all required elements
    Given user navigates to "Home" page
    When user is on the Home page
    Then list of articles is displayed
    And all required elements of article are displayed
