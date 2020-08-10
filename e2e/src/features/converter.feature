Feature: Converter from XML to Json validation

  Scenario: Convert a valid XML to JSON
    Given following XML file "ijm-00202.xml"
    When user calls the endpoint
    Then json is generated

  Scenario: Convert an invalid XML
    Given following XML file "ijmN-0020.xml"
    When user calls the endpoint
    Then json is not generated
