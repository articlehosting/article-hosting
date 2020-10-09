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


  Scenario Outline: Check Download and View buttons for images
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    When user clicks on "Figures and data"
    Then "Figures" page is displayed
    When user clicks on "Download img"
    Then a "Download img" file is downloaded
    When user clicks on "View"
    Then "View" page is displayed
    Examples:
      | ArticleId          |
      | 10.34196/ijm.00214 |
      | 10.34196/ijm.00160 |
      | 10.34196/ijm.00202 |
