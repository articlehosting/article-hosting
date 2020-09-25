@article
Feature: Article page

  Scenario: Article main sections are displayed
    Given user navigates to "Home" page
    And user is on the Home page
    When user clicks on "First article" from the list
    Then "First Article" page header is displayed
    And following sections are displayed:
      | Abstract                    |
      | Introduction                |
      | Traits of Uruguayan economy |
      | Data and methods            |
      | Results                     |
      | Conclusions                 |
    And all tables are displayed

  @Ci
  Scenario Outline: Article sections are displayed
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    And title and author are displayed
    And following sections are displayed:
      | Abstract       |
      | Introduction   |
      | References     |
      | Author details |
    And all tables are displayed
    Examples:
      | ArticleId            |
      | 10.34196%2Fijm.00202 |
      | 10.34196%2Fijm.00214 |
      | 10.34196%2Fijm.00160 |


  Scenario: Verify articles from the list
    Given user navigates to "Home" page
    And user is on the Home page
    When list of articles is displayed
    Then main content and inner sections are displayed
      | Abstract       |
      | Introduction   |
      | References     |
      | Author details |

  @Ci
  Scenario: Images in article are displayed
    Given user navigates to "Home" page
    And user is on the Home page
    When user clicks on "First article" from the list
    Then "First Article" page header is displayed
    And Images are loaded

  @Ci
  Scenario: Authors references links redirect to author information
    Given user navigates to "Home" page
    And user is on the Home page
    When user clicks on "First article" from the list
    Then "First Article" page is displayed
    When user clicks on author name
    Then user is redirected to the "Author reference" page

  @Ci
  Scenario: Download PDF article option (one article)
    Given user navigates to "Home" page
    And user is on the Home page
    When user clicks on "First article" from the list
    Then "First Article" page header is displayed
    When user clicks on "Article PDF"
    Then a "Article PDF" file is downloaded

  Scenario: Download article citations options
    Given user navigates to "Home" page
    And user is on the Home page
    When user clicks on "First article" from the list
    Then "First Article" page header is displayed
    When user clicks on "BibTex"
    Then a "BibTex" file is downloaded
    When user clicks on "RIS"
    Then a "RIS" file is downloaded

  Scenario Outline: Check citation within the article
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    And citation has the correct format
    Examples:
      | ArticleId            |
      | 10.34196%2Fijm.00202 |
      | 10.34196%2Fijm.00214 |
      | 10.34196%2Fijm.00160 |

  Scenario Outline: Download PDF article option
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    When user clicks on "Article PDF"
    Then a "Article PDF" file is downloaded
    Examples:
      | ArticleId            |
      | 10.34196%2Fijm.00202 |
      | 10.34196%2Fijm.00214 |
      | 10.34196%2Fijm.00160 |

  Scenario: Download article citations options
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    When user clicks on "Download"
    And user selects "BibTeX"
    Then a "BibTeX" file is downloaded
    When user selects "RIS"
    Then a "RIS" file is downloaded



