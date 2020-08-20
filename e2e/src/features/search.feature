Feature: Search functionality

  Scenario Outline: List shows 10 most relevant results
    Given user navigates to "Home" page
    When user is on the Home page
    And user clicks on "Search button"
    And user searches for "<searchWord>"
    Then "<searchPage>" is displayed
    Examples:
      | searchWord                 | searchPage                      |
      | consumption-savings-wealth | Consumption, savings and wealth |
      | demography                 | Demography                      |
      | dynamic-microsimulation    | Dynamic microsimulation         |
      | education                  | Education                       |
