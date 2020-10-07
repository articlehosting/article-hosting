@article
Feature: Article page

  Scenario Outline: Article body and supplemental data are displayed(bioRxiv)
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    And title and author are displayed
    And following sections are displayed:
      | Abstract       |
      | References     |
      | Author details |
    And all tables are displayed
    And article metadata has the correct format
    Examples:
      | ArticleId                 |
      | 10.1101/2020.01.14.905919 |
      | 10.1101/828533            |
      | 10.1101/2020.01.06.895854 |
      | 10.1101/2020.01.23.916809 |
      | 10.1101/2020.01.24.918482 |
      | 10.1101/2020.01.06.895847 |

  Scenario: Verify articles from the list
    Given user navigates to "Home" page
    And user is on the Home page
    When list of articles is displayed
    Then main content and inner sections are displayed
      | Abstract       |
      | References     |
      | Author details |

  @Ci
  Scenario: Images in article are displayed
    Given user navigates to "Home" page
    And user is on the Home page
    When list of articles is displayed
    Then images are loaded in the article

  @Ci
  Scenario: Authors references links redirect to author information
    Given user navigates to "Home" page
    And user is on the Home page
    When list of articles is displayed
    Then user is redirected to the "Author reference" page

  @Ci
  Scenario Outline: Download PDF article option
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    When user clicks on "Article PDF"
    Then a "Article PDF" file is downloaded
    Examples:
      | ArticleId                 |
      | 10.1101/2020.01.06.895854 |
      | 10.1101/2020.01.23.916809 |


  @Ci
  Scenario: Download article citations options
    Given user navigates to "Home" page
    And user is on the Home page
    When list of articles is displayed
    Then user download article in:
      | Article PDF |
      | BibTex      |
      | RIS         |


    Scenario: Check the supplementary data from bioRxiv article
      Given user navigates to "Home" page
      And user is on the Home page
      When list of articles is displayed
      Then "Supplementary files" are downloaded

  Scenario Outline: Article sections are displayed (IJM)
    Given user navigates to "Home" page
    And user is on the Home page
    When user navigates to "<ArticleId>"
    Then "Article" page is displayed
    And title and author are displayed
    And following sections are displayed:
      | Abstract       |
      | References     |
      | Author details |
    And all tables are displayed
    And Images are loaded
    And citation has the correct format
    Examples:
      | ArticleId          |
      | 10.34196/ijm.00214 |
      | 10.34196/ijm.00160 |
      | 10.34196/ijm.00202 |
      | 10.34196/ijm.00208 |
      | 10.34196/ijm.00196 |




