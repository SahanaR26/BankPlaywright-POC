const data= require('../tests/config.json');
class ManagerPage {
  constructor(page) {
    this.page = page;
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' });
    this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.postCodeInput = page.locator('input[placeholder="Post Code"]');
    this.addCustomerFormBtn = page.locator('form').getByRole('button', { name: 'Add Customer' });
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processBtn = page.getByRole('button', { name: 'Process' });
    this.homeBtn = page.getByRole('button', { name: 'Home' });
    this.customersTab = page.getByRole('button', { name: 'Customers' });
  }

  async addCustomer() {
    await this.addCustomerTab.click();
    await this.firstNameInput.fill(data.fname);
    await this.lastNameInput.fill(data.lname);
    await this.postCodeInput.fill(data.postcode);
    await this.addCustomerFormBtn.click();
  }

  async openAccount(customerName, currency) {
    await this.openAccountTab.click();
    await this.customerSelect.selectOption({ label: customerName });
    await this.currencySelect.selectOption({ label: currency });
    await this.processBtn.click();
  }

  async deleteCustomerByName(firstName, lastName) {
    await this.customersTab.click();
    const customerRow = this.page.locator('table').getByRole('row', {
      name: new RegExp(`${firstName}\\s+${lastName}`, 'i'),
    });
    const deleteBtn = customerRow.getByRole('button', { name: 'Delete' });
    await deleteBtn.click();
  }

  async goHome() {
    await this.homeBtn.click();
  }
}

module.exports = { ManagerPage };
