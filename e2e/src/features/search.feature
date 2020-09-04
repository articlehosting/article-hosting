Feature: Search functionality

  Scenario Outline: List shows 10 most relevant results
    Given user navigates to "Home" page
    And user is on the Home page
    When user clicks on "First article" from the list
    Then "First Article" page is displayed
    When user clicks on "Search button"
    And user searches for "<searchWord>"
    Then "<searchPage>" is displayed
    Examples:
      | searchWord                 | searchPage                      |
      | consumption-savings-wealth | Consumption, savings and wealth |
      | demography                 | Demography                      |
      | dynamic-microsimulation    | Dynamic microsimulation         |
      | education                  | Education                       |
