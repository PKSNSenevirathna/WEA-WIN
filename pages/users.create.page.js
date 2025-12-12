const UsersPage = require('./users.page');
const createSelectors = require('../selectors/users.create.selectors');
const { expect } = require('@playwright/test');

/**
 * Users Create Page Object
 * Delegates to the main UsersPage for shared flows but exposes
 * a creation-focused API and keeps creation selectors isolated.
 */
class UsersCreatePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usersPage = new UsersPage(page);
    this.selectors = createSelectors;
  }

  async navigateToCreatePage() {
    await this.usersPage.navigateToUsersPage();
    await this.usersPage.clickNewUser();
    await expect(this.page.getByRole(this.selectors.newUserHeading.role, { name: this.selectors.newUserHeading.name })).toBeVisible();
  }

  /**
   * Reuse the createUser implementation from UsersPage
   * @param {Object} userData
   */
  async createUser(userData) {
    // UsersPage.createUser already handles navigation to new user and form fill
    return this.usersPage.createUser(userData);
  }

  async verifyUserCreated(userName) {
    await expect(this.page.getByText(this.selectors.userCreatedText)).toBeVisible();
    await expect(this.page.getByRole('heading', { name: userName })).toBeVisible();
  }

  /**
   * Verify New User page is displayed with breadcrumb and form elements
   */
  async verifyNewUserPageVisible() {
    await expect(this.page.getByText('Admin / Users / New User')).toBeVisible();
    await expect(this.page.locator('#new_user')).toBeVisible();
  }

  /**
   * Verify Roles group is visible on the New User page
   */
  async verifyRolesGroupVisible() {
    return this.usersPage.verifyRolesGroupVisible();
  }

  /**
   * Click 'Add a Role' link
   */
  async clickAddRole() {
    return this.usersPage.clickAddRole();
  }

  /**
   * Click the nth 'Remove' link (0-based index)
   * @param {number} index
   */
  async clickRemoveRoleNth(index = 0) {
    return this.usersPage.clickRemoveRoleNth(index);
  }

  /**
   * Click the first 'Remove' link
   */
  async clickRemoveRoleFirst() {
    return this.usersPage.clickRemoveRoleFirst();
  }

  /**
   * Click the Create User button on the New User page
   */
  async clickCreateUser() {
    await this.page.getByRole(this.selectors.createUserButton.role, { name: this.selectors.createUserButton.name }).click();
  }

  /**
   * Verify all expected validation errors are visible on the New User page
   */
  async verifyAllValidationErrors() {
    await expect(this.page.getByText(this.selectors.emailBlankError)).toBeVisible();
    await expect(this.page.locator('#user_password_input').getByText(this.selectors.passwordBlankError)).toBeVisible();
    await expect(this.page.locator('#user_first_name_input').getByText(this.selectors.firstNameBlankError)).toBeVisible();
    await expect(this.page.locator('#user_last_name_input').getByText(this.selectors.lastNameBlankError)).toBeVisible();
    await expect(this.page.locator('#user_school_id_input').getByText(this.selectors.schoolBlankError)).toBeVisible();
    await expect(this.page.locator('#user_local_association_id_input').getByText(this.selectors.localAssociationBlankError)).toBeVisible();
    await expect(this.page.locator('#user_work_location_id_input').getByText(this.selectors.workLocationBlankError, { exact: true })).toBeVisible();
    await expect(this.page.locator(this.selectors.uniservCouncilError)).toBeVisible();
    await expect(this.page.locator(this.selectors.jobCategoryError)).toBeVisible();
    await expect(this.page.locator(this.selectors.roleError)).toBeVisible();
  }
}

module.exports = UsersCreatePage;
