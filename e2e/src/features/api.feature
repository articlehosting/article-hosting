Feature: Hypermedia API scenarios

  Scenario: Entry point is displayed
    Given endpoint "rdf"
    When the request is send
    Then the context is returned

  Scenario: All articles endpoint
    Given endpoint "rdf/articles"
    When the request is send
    Then the list of articles is returned


  Scenario Outline: Metadata for an article
    Given endpoint "/metadata" with parameters
      | <id> |
    When the request is send
    Then metada of article is returned
    Examples:
      | id                        |
      | 10.1101/2020.01.06.895854 |

  Scenario: Article body endpoint
    Given endpoint "" with parameters
      |  |
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

  Scenario: Downloading article related materials endpoint
    Given endpoint "/files" with parameters
      | 10.1101/2020.01.06.895854 |
    When the request is send
    Then related materials are downloaded

  Scenario: Retrieve images endpoint
    Given endpoint "" with parameters
      |  |
    When the request is send
    Then list of images is returned
