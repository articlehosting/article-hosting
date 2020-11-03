Feature: Hypermedia API scenarios

  Scenario: Entry point is displayed
    Given endpoint "rdf"
    When the request is send
    Then the context is returned

  Scenario: All articles endpoint
    Given endpoint "rdf/articles"
    When the request is send
    Then the list of articles is returned

  Scenario Outline: Error handling endpoint
    Given endpoint "<endpoint>" with parameters
      | <parameter> |
    When the request is send
    Then the error is returned
    Examples:
      | endpoint  | parameter                 |
      | /metadata | 10.1101/2020.01.06.891147 |
      | /body     | 10.1101/2020.01.891147    |

  Scenario: Metadata for an article
    Given endpoint "rdf/articles"
    When the request is send
    Then metada of article is returned

  Scenario: Article body endpoint
    Given endpoint "rdf/articles"
    When the request is send
    Then article body is returned

  Scenario: Article back matter endpoint
    Given endpoint "rdf/articles"
    When the request is send
    Then article back matter is returned

  Scenario: Downloading article related materials endpoint
    Given endpoint "rdf/articles"
    When the request is send
    Then related materials are downloaded

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
