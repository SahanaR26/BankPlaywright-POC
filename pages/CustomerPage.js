class CustomerPage {
  constructor(page) {
    this.page = page;
    this.userSelect = page.locator('#userSelect');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.depositTab = page.getByRole('button', { name: 'Deposit' }).first();
    this.withdrawTab = page.getByRole('button', { name: 'Withdrawl' });
    this.amountInput = page.locator('input[ng-model="amount"]');
    this.depositBtn = page.locator('form').getByRole('button', { name: 'Deposit' });
    this.withdrawBtn = page.locator('form').getByRole('button', { name: 'Withdraw' });
    this.message = page.locator('span[ng-show="message"]');
    this.logoutBtn = page.getByRole('button', { name: 'Logout' });
  }

  async loginAs(customerName) {
    await this.userSelect.selectOption({ label: customerName });
    await this.loginBtn.click();
  }

  async deposit(amount) {
    await this.depositTab.click();
    await this.amountInput.fill(amount);
    await this.depositBtn.click();
  }

  async withdraw(amount) {
    await this.withdrawTab.click();
    await this.amountInput.fill(amount);
    await this.withdrawBtn.click();
  }

  async logout() {
    await this.logoutBtn.click();
  }

  async expectMessage(text) {
    await expect(this.message).toHaveText(text);
  }
}

module.exports = { CustomerPage };