Feature: Converter from XML to Json validation

  Scenario: Load about page
    Given the conversion endpoint
    When user calls the endpoint
    Then json is generated
