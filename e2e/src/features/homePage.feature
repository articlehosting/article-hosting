Feature: Home Page main elements

  Scenario: List of articles are displayed
    Given user navigates to "Home" page
    When user is on the Home page
    Then list of articles is displayed

  Scenario Outline: Access special type of articles
    Given user navigates to "Home" page
    When user is on the Home page
    And user navigates to "<articleName>"
    Then "<pageName>" page is displayed
    Examples:
      | articleName               | pageName         |
      | scientific-correspondence | Book reviews     |
      | tools-resources           | Data watch       |
      | short-report              | Research notes   |
      | registered-report         | Software reviews |

  Scenario Outline: Access research subjects
    Given user navigates to "Home" page
    When user is on the Home page
    And user navigates to subject "<subjectName>"
    Then "<pageName>" page is displayed
    Examples:
      | subjectName                | pageName                        |
      | consumption-savings-wealth | Consumption, savings and wealth |
      | demography                 | Demography                      |
      | dynamic-microsimulation    | Dynamic microsimulation         |
      | education                  | Education                       |
      | environment                | Environment                     |
      | finance                    | Finance                         |