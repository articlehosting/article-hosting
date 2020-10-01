Feature: Hypermedia API scenarios

  Scenario: All articles endpoint
    Given endpoint "" with parameters
    ||
    When the request is send
    Then the list of articles is returned

  @api
  Scenario: Metadata for an article
    Given endpoint "rdf" with parameters
    When the request is send
    Then metada of article is returned

  Scenario: Article body endpoint
    Given endpoint "" with parameters
    ||
    When the request is send
    Then article body is returned

  Scenario: Article back matter endpoint
    Given endpoint "" with parameters
    ||
    When the request is send
    Then article back matter is returned

  Scenario: Downloading article related materials endpoint
    Given endpoint "" with parameters
      ||
    When the request is send
    Then related materials are downloaded

  Scenario: Retrieve images endpoint
    Given endpoint "" with parameters
      ||
    When the request is send
    Then list of images is returned
