Feature: Figures and Data

  Scenario: Check figures and data of articles
    Given user navigates to "Home" page
    And user is on the Home page
    When list of articles is displayed
    Then "Figures and data" with required elements is displayed

  Scenario: Download article PDF on Figures page
    Given user navigates to "Home" page
    And user is on the Home page
    When list of articles is displayed
    Then user downloads article form "Figures" page

  Scenario: Check citation on the Figures page
    Given user navigates to "Home" page
    And user is on the Home page
    When list of articles is displayed
    Then user check the citation on "Figures" page

  Scenario: Check Download and View buttons for images
    Given user navigates to "Home" page
    And user is on the Home page
    When list of articles is displayed
    Then user check Download and View buttons for image