class LoginPage {
  constructor(page) {
    this.page = page;
    this.managerLoginBtn = page.getByRole('button', { name: 'Bank Manager Login' });
    this.customerLoginBtn = page.getByRole('button', { name: 'Customer Login' });
  }

  async goto() {
    await this.page.goto('https://globalsqa.com/angularJs-protractor/BankingProject/#/login');
  }

  async clickManagerLogin() {
    await this.managerLoginBtn.click();
  }

  async clickCustomerLogin() {
    await this.customerLoginBtn.click();
  }
}

module.exports = { LoginPage };