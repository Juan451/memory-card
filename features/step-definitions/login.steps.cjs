const { By } = require('selenium-webdriver');
const { expect } = require('chai');

const { Given, When, Then } = require('@cucumber/cucumber');

Given('I am on the login page', async function () {
  await this.driver.get('http://localhost:8000/view-login');
});

When('I enter {string} in the username field', async function (username) {
  const usernameInput = await this.driver.findElement(By.id('usernameInput'));
  await usernameInput.sendKeys(username);
});

When('I click the login button', async function () {
  const loginButton = await this.driver.findElement(By.className('login-button'));
  await loginButton.click();
});

Then('I should be redirected to the card view', async function () {
  const cardView = await this.driver.findElement(By.tagName('view-card'));
  expect(await cardView.isDisplayed()).to.be.true;
});

module.exports = {
  Given,
  When,
  Then,
};
