const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { ManagerPage } = require('../pages/ManagerPage');
const { CustomerPage } = require('../pages/CustomerPage');
const data = require('./config.json'); 

test('Bank Manager and customer', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const manager = new ManagerPage(page);
  const customer = new CustomerPage(page);

  // Extract values from JSON
  const firstName = data.fname;
  const lastName = data.lname;
  const postCode = data.postcode;
  const customerFullName = `${firstName} ${lastName}`;

  await loginPage.goto();
  await loginPage.clickManagerLogin();

  // Add customer
  await manager.addCustomer(firstName, lastName, postCode);
  page.once('dialog', dialog => dialog.accept());

  // Open account
  await manager.openAccount(customerFullName, 'Dollar');
  page.once('dialog', dialog => dialog.accept());

  await manager.goHome();
  await loginPage.clickCustomerLogin();

  // Customer login
  await customer.loginAs(customerFullName);

  // Deposit and withdraw
  await customer.deposit('1000');
  await customer.withdraw('500');

  await customer.logout();
  await expect(page.getByText('Your Name :')).toBeVisible();

  // Delete customer
  await manager.goHome();
  await loginPage.clickManagerLogin();
  await manager.deleteCustomerByName(firstName, lastName);
});


