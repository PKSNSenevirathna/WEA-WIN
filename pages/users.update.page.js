const UsersPage = require('./users.page');
const updateSelectors = require('../selectors/users.update.selectors');
const { expect } = require('@playwright/test');

/**
 * Users Update Page Object
 * Handles updating user details and related operations
 */
class UsersUpdatePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usersPage = new UsersPage(page);
    this.selectors = updateSelectors;
  }

  /**
   * Click Edit link for a specific user
   * @param {number|string} userId
   */
  async clickEditUser(userId) {
    const row = this.page.locator(this.selectors.userRow(userId));
    const editLink = row.getByRole(this.selectors.editLink.role, { name: this.selectors.editLink.name });
    await expect(editLink).toBeVisible();
    await editLink.click();
  }

  /**
   * Update the first name field
   * @param {string} firstName
   */
  async updateFirstName(firstName) {
    const firstNameField = this.page.getByRole(this.selectors.firstNameField.role, { name: this.selectors.firstNameField.name });
    await firstNameField.click();
    await firstNameField.fill(firstName);
  }

  /**
   * Update the last name field
   * @param {string} lastName
   */
  async updateLastName(lastName) {
    const lastNameField = this.page.getByRole(this.selectors.lastNameField.role, { name: this.selectors.lastNameField.name });
    await lastNameField.click();
    await lastNameField.fill(lastName);
  }

  /**
   * Click Update User button
   */
  async clickUpdateUserButton() {
    await this.page.getByRole(this.selectors.updateUserButton.role, { name: this.selectors.updateUserButton.name }).click();
  }

  /**
   * Verify user was successfully updated
   */
  async verifyUserUpdatedSuccess() {
    await expect(this.page.getByText(this.selectors.userUpdatedText)).toBeVisible();
  }

  /**
   * Verify user detail heading with updated name
   * @param {string} fullName
   */
  async verifyUserDetailHeading(fullName) {
    await expect(this.page.getByRole('heading', { name: fullName })).toBeVisible();
  }

  /**
   * Complete flow: Edit user, update first name, save, and verify
   * @param {number|string} userId
   * @param {string} newFirstName
   * @param {string} expectedFullName
   */
  async editAndUpdateUserFirstName(userId, newFirstName, expectedFullName) {
    await this.clickEditUser(userId);
    await this.updateFirstName(newFirstName);
    await this.clickUpdateUserButton();
    await this.verifyUserUpdatedSuccess();
    await this.verifyUserDetailHeading(expectedFullName);
  }

  /**
   * Complete flow: Edit user, update last name, save, and verify
   * @param {number|string} userId
   * @param {string} newLastName
   * @param {string} expectedFullName
   */
  async editAndUpdateUserLastName(userId, newLastName, expectedFullName) {
    await this.clickEditUser(userId);
    await this.updateLastName(newLastName);
    await this.clickUpdateUserButton();
    await this.verifyUserUpdatedSuccess();
    await this.verifyUserDetailHeading(expectedFullName);
  }

  /**
   * Update date of birth by clicking the field and selecting a day
   * @param {string} day - The day to select (e.g., '28')
   */
  async updateDateOfBirth(day) {
    const dateOfBirthField = this.page.getByRole(this.selectors.dateOfBirthField.role, { name: this.selectors.dateOfBirthField.name });
    await dateOfBirthField.click();
    
    // Wait for calendar picker to be visible and interactive
    await this.page.waitForTimeout(1000);
    
    // Wait for the day link to be visible before clicking
    const dayLink = this.page.getByRole('link', { name: day });
    await expect(dayLink).toBeVisible({ timeout: 20000 });
    await dayLink.click();
  }

  /**
   * Verify date of birth field is visible on detail page
   */
  async verifyDateOfBirthVisible() {
    await expect(this.page.getByRole(this.selectors.dateOfBirthRowHeader.role, { name: this.selectors.dateOfBirthRowHeader.name })).toBeVisible();
  }

  /**
   * Verify date of birth cell contains expected partial text
   * @param {string} partialDate - Partial date text to verify (e.g., '/28')
   */
  async verifyDateOfBirthCell(partialDate) {
    await expect(this.page.getByRole('cell', { name: partialDate })).toBeVisible();
  }

  /**
   * Complete flow: Edit user, update date of birth, save, and verify
   * @param {number|string} userId
   * @param {string} day - The day to select
   * @param {string} expectedPartialDate - Expected partial date in cell (e.g., '/28')
   */
  async editAndUpdateUserDateOfBirth(userId, day, expectedPartialDate) {
    await this.clickEditUser(userId);
    await this.updateDateOfBirth(day);
    await this.clickUpdateUserButton();
    await this.verifyUserUpdatedSuccess();
    await this.verifyDateOfBirthVisible();
    await this.verifyDateOfBirthCell(expectedPartialDate);
  }

  /**
   * Update position by clicking the field and selecting an option
   * @param {string} currentPosition - Current position value to identify the field
   * @param {string} newPosition - The position to select
   */
  async updatePosition(currentPosition, newPosition) {
    await this.page.getByRole('textbox', { name: currentPosition }).click();
    await this.page.getByRole('option', { name: newPosition }).click();
  }

  /**
   * Verify position row header is visible on detail page
   */
  async verifyPositionVisible() {
    await expect(this.page.getByRole(this.selectors.positionRowHeader.role, { name: this.selectors.positionRowHeader.name })).toBeVisible();
  }

  /**
   * Verify position cell contains expected value
   * @param {string} position - Position value to verify
   */
  async verifyPositionCell(position) {
    await expect(this.page.getByRole('cell', { name: position })).toBeVisible();
  }

  /**
   * Complete flow: Edit user, update position, save, and verify
   * @param {number|string} userId
   * @param {string} currentPosition - Current position value
   * @param {string} newPosition - New position to select
   */
  async editAndUpdateUserPosition(userId, currentPosition, newPosition) {
    await this.clickEditUser(userId);
    await this.updatePosition(currentPosition, newPosition);
    await this.clickUpdateUserButton();
    await this.verifyUserUpdatedSuccess();
    await this.verifyPositionVisible();
    await this.verifyPositionCell(newPosition);
  }

  /**
   * Update role by clicking the field and selecting an option
   * @param {string} currentRole - Current role value to identify the field
   * @param {string} newRole - The role to select
   */
  async updateRole(currentRole, newRole) {
    await this.page.getByRole('textbox', { name: currentRole }).click();
    await this.page.getByRole('option', { name: newRole }).click();
  }

  /**
   * Verify roles row header is visible on detail page
   */
  async verifyRolesVisible() {
    await expect(this.page.getByRole(this.selectors.rolesRowHeader.role, { name: this.selectors.rolesRowHeader.name })).toBeVisible();
  }

  /**
   * Verify roles cell contains expected value
   * @param {string} role - Role value to verify
   */
  async verifyRoleCell(role) {
    await expect(this.page.getByRole('cell', { name: role }).first()).toBeVisible();
  }

  /**
   * Complete flow: Edit user, update role, save, and verify
   * @param {number|string} userId
   * @param {string} currentRole - Current role value
   * @param {string} newRole - New role to select
   */
  async editAndUpdateUserRole(userId, currentRole, newRole) {
    await this.clickEditUser(userId);
    await this.updateRole(currentRole, newRole);
    await this.clickUpdateUserButton();
    await this.verifyUserUpdatedSuccess();
    await this.verifyRolesVisible();
    await this.verifyRoleCell(newRole);
  }

  /**
   * Update phone number field
   * @param {string} phoneNumber
   */
  async updatePhoneNumber(phoneNumber) {
    const phoneField = this.page.getByRole(this.selectors.phoneNumberField.role, { name: this.selectors.phoneNumberField.name });
    await phoneField.click();
    await phoneField.fill(phoneNumber);
  }

  /**
   * Verify phone number is visible on the user detail page
   * @param {string} phoneNumber
   */
  async verifyPhoneNumberVisible(phoneNumber) {
    await expect(this.page.getByText(phoneNumber)).toBeVisible();
  }

  /**
   * Complete flow: Edit user, update phone number, save, and verify
   * @param {number|string} userId
   * @param {string} phoneNumber
   */
  async editAndUpdateUserPhoneNumber(userId, phoneNumber) {
    await this.clickEditUser(userId);
    await this.updatePhoneNumber(phoneNumber);
    await this.clickUpdateUserButton();
    await this.verifyUserUpdatedSuccess();
    await this.verifyPhoneNumberVisible(phoneNumber);
  }
}

module.exports = UsersUpdatePage;
