Feature: Figures and Data

  Scenario Outline: Check figures and data of articles
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    When user clicks on "Figures and data"
    Then "Figures" page is displayed
    And Images are loaded
    And all tables are displayed
    When user clicks on "Article button"
    Then "Article" page is displayed
    Examples:
      | ArticleId            |
      | 10.34196%2Fijm.00202 |
      | 10.34196%2Fijm.00214 |
      | 10.34196%2Fijm.00160 |

  Scenario Outline: Download article PDF on Figures page
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    When user clicks on "Figures and data"
    Then "Figures" page is displayed
    When user clicks on "Article PDF"
    Then Article PDF file is downloaded
    Examples:
      | ArticleId            |
      | 10.34196%2Fijm.00202 |
      | 10.34196%2Fijm.00214 |
      | 10.34196%2Fijm.00160 |

  Scenario Outline: Check citation on the Figures page
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    When user clicks on "Figures and data"
    Then "Figures" page is displayed
    And citation has the correct format
    Examples:
      | ArticleId            |
      | 10.34196%2Fijm.00202 |
      | 10.34196%2Fijm.00214 |
      | 10.34196%2Fijm.00160 |
