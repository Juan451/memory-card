# login.feature
Feature: Login Feature

  Scenario: Successful login
    Given I am on the login page
    When I enter "Fernando" in the username field
    And I click the login button
    Then I should be redirected to the card view
