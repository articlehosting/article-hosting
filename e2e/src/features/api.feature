Feature: Hypermedia API scenarios

  Scenario: Entry point is displayed
    Given endpoint "rdf"
    When the request is send
    Then the context is returned

  Scenario: All articles endpoint
    Given endpoint "rdf/articles"
    When the request is send
    Then the list of articles is returned

  Scenario: Metadata for an article
    Given endpoint "rdf/articles"
    When the request is send
    Then metada of article is returned


  Scenario: Article body endpoint
    Given endpoint "/body" with parameters
      | 10.1101/2020.01.24.918482 |
    When the request is send
    Then article body is returned

  Scenario Outline: Article back matter endpoint
    Given endpoint "/back-matter" with parameters
      | <id> |
    When the request is send
    Then article back matter is returned
    Examples:
      | id                        |
      | 10.1101/2020.01.06.895854 |
      | 10.1101/2020.01.24.918482 |
      | 10.1101/2020.01.06.895847 |

  Scenario Outline: Downloading article related materials endpoint
    Given endpoint "/files" with parameters
      | <id> |
    When the request is send
    Then related materials are downloaded
    Examples:
      | id                        |
      | 10.1101/2020.01.06.895854 |
      | 10.1101/2020.01.24.918482 |
      | 10.1101/2020.01.06.895847 |

  Scenario Outline: Retrieve images endpoint
    Given endpoint "/files" with parameters
      | <id> |
    When the request is send
    Then list of images is returned
    Examples:
      | id                        |
      | 10.1101/2020.01.06.895854 |
      | 10.1101/2020.01.24.918482 |
      | 10.1101/2020.01.06.895847 |


  Scenario Outline: Retrieve tables endpoint
    Given endpoint "/body" with parameters
      | <id> |
    When the request is send
    Then list of tables is returned
    Examples:
      | id                        |
      | 10.1101/2020.01.06.895854 |
      | 10.1101/2020.01.24.918482 |
      | 10.1101/2020.01.06.895847 |
      | 10.34196/ijm.00160        |
