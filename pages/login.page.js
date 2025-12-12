const { expect } = require('@playwright/test');
const loginSelectors = require('../selectors/login.selectors');

/**
 * Login Page Object Model
 * Handles all login page interactions
 */
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.selectors = loginSelectors;
  }

  /**
   * Navigate to the login page
   */
  async navigate() {
    await this.page.goto(process.env.BASE_URL || 'http://weadev.epicbusinessapps.com/admin/login');
  }

  /**
   * Fill email field
   * @param {string} email - User email address
   */
  async fillEmail(email) {
    await this.page.getByRole(this.selectors.emailInput.role, { name: this.selectors.emailInput.name }).fill(email);
  }

  /**
   * Fill password field
   * @param {string} password - User password
   */
  async fillPassword(password) {
    await this.page.getByRole(this.selectors.passwordInput.role, { name: this.selectors.passwordInput.name }).fill(password);
  }

  /**
   * Click login button
   */
  async clickLoginButton() {
    await this.page.getByRole(this.selectors.loginButton.role, { name: this.selectors.loginButton.name }).click();
  }

  /**
   * Perform complete login action
   * @param {string} email - User email address
   * @param {string} password - User password
   */
  async login(email, password) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Verify invalid credentials error message
   */
  async verifyInvalidCredentialsError() {
    await expect(this.page.getByText(this.selectors.invalidCredentialsText)).toBeVisible();
  }

  /**
   * Verify successful login message
   */
  async verifySuccessfulLogin() {
    await expect(this.page.getByText(this.selectors.signedInSuccessText)).toBeVisible();
  }

  /**
   * Verify dashboard is displayed
   */
  async verifyDashboard() {
    await expect(this.page.getByRole(this.selectors.dashboardHeading.role, { name: this.selectors.dashboardHeading.name })).toBeVisible();
  }

  /**
   * Verify Users link is visible after successful login
   */
  async verifyUsersLink() {
    await expect(this.page.getByRole(this.selectors.usersLink.role, { name: this.selectors.usersLink.name })).toBeVisible();
  }

  /**
   * Navigate to Users page via Users link
   */
  async openUsersPage() {
    await this.page.getByRole(this.selectors.usersLink.role, { name: this.selectors.usersLink.name }).click();
  }

  /**
   * Verify Users page key elements are visible
   */
  async verifyUsersPageElements() {
    await expect(this.page.getByRole(this.selectors.usersHeading.role, { name: this.selectors.usersHeading.name })).toBeVisible();
    await expect(this.page.locator(this.selectors.usersCollectionSelect.locator)).toBeVisible();
    await expect(this.page.getByRole(this.selectors.newUserLink.role, { name: this.selectors.newUserLink.name })).toBeVisible();
    await expect(this.page.getByText(this.selectors.usersFiltersText)).toBeVisible();
  }

  /**
   * Perform logout action
   */
  async logout() {
    await this.page.getByRole(this.selectors.logoutLink.role, { name: this.selectors.logoutLink.name }).click();
  }

  /**
   * Verify login page is displayed
   */
  async verifyLoginPage() {
    await expect(this.page.getByRole(this.selectors.loginPageHeading.role, { name: this.selectors.loginPageHeading.name })).toBeVisible();
  }

  /**
   * Open forgot password page from login
   */
  async openForgotPassword() {
    await expect(this.page.getByRole(this.selectors.forgotPasswordLink.role, { name: this.selectors.forgotPasswordLink.name })).toBeVisible();
    await this.page.getByRole(this.selectors.forgotPasswordLink.role, { name: this.selectors.forgotPasswordLink.name }).click();
  }

  /**
   * Verify forgot password page is displayed
   */
  async verifyForgotPasswordPage() {
    await expect(this.page.getByRole(this.selectors.forgotPasswordHeading.role, { name: this.selectors.forgotPasswordHeading.name })).toBeVisible();
  }

  /**
   * Attempt password reset without providing email
   */
  async submitEmptyForgotPassword() {
    await expect(this.page.getByRole(this.selectors.resetPasswordButton.role, { name: this.selectors.resetPasswordButton.name })).toBeVisible();
    await this.page.getByRole(this.selectors.resetPasswordButton.role, { name: this.selectors.resetPasswordButton.name }).click();
  }

  /**
   * Validate error messages on forgot password when email missing
   */
  async verifyForgotPasswordErrors() {
    await expect(this.page.getByText(this.selectors.blankErrorText.exactText, { exact: true })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: this.selectors.errorHeadingText })).toBeVisible();
    await expect(this.page.getByText(this.selectors.emailBlankText)).toBeVisible();
  }

  /**
   * Return back to login page
   */
  async returnToLogin() {
    await this.navigate();
  }

  /**
   * Toggle password visibility multiple times
   * @param {number} times - Number of times to toggle visibility
   */
  async togglePasswordVisibility(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.page.locator(this.selectors.passwordVisibilityToggle.selector).click();
    }
  }

  /**
   * Verify Remember me checkbox is visible
   */
  async verifyRememberMeCheckbox() {
    await expect(this.page.getByText(this.selectors.rememberMeText)).toBeVisible();
  }

  /**
   * Check Remember me checkbox
   */
  async checkRememberMe() {
    await this.page.getByRole(this.selectors.rememberMeCheckbox.role, { name: this.selectors.rememberMeCheckbox.name }).check();
  }

  /**
   * Uncheck Remember me checkbox
   */
  async uncheckRememberMe() {
    await this.page.getByRole(this.selectors.rememberMeCheckbox.role, { name: this.selectors.rememberMeCheckbox.name }).uncheck();
  }

  /**
   * Verify login page elements are visible and loaded correctly
   */
  async verifyLoginPageElements() {
    await expect(this.page.getByText(this.selectors.loginPageText)).toBeVisible();
    await expect(this.page.getByRole(this.selectors.loginPageHeading.role, { name: this.selectors.loginPageHeading.name })).toBeVisible();
    await expect(this.page.getByText(this.selectors.emailInput.name)).toBeVisible();
    await expect(this.page.getByRole(this.selectors.emailInput.role, { name: this.selectors.emailInput.name })).toBeVisible();
    await expect(this.page.getByText(this.selectors.passwordInput.name)).toBeVisible();
    await expect(this.page.getByRole(this.selectors.passwordInput.role, { name: this.selectors.passwordInput.name })).toBeVisible();
    await expect(this.page.getByRole(this.selectors.loginButton.role, { name: this.selectors.loginButton.name })).toBeVisible();
  }

  /**
   * Attempt login with email only (no password) and expect invalid credentials
   * @param {string} email - User email
   */
  async loginWithEmailOnly(email) {
    await this.fillEmail(email);
    await this.clickLoginButton();
    await this.verifyInvalidCredentialsError();
  }

  /**
   * Attempt login with password only (no email) and expect invalid credentials
   * @param {string} password - User password
   */
  async loginWithPasswordOnly(password) {
    await this.fillPassword(password);
    await this.clickLoginButton();
    await this.verifyInvalidCredentialsError();
  }

  /**
   * Test login with invalid credentials
   */
  async testInvalidLogin() {
    await this.page.getByRole(this.selectors.emailInput.role, { name: this.selectors.emailInput.name }).click();
    await this.page.getByRole(this.selectors.passwordInput.role, { name: this.selectors.passwordInput.name }).click();
    await this.clickLoginButton();
    await this.verifyInvalidCredentialsError();
  }
}

module.exports = LoginPage;
