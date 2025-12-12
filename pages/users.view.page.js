const UsersPage = require('./users.page');
const viewSelectors = require('../selectors/users.view.selectors');
const { expect } = require('@playwright/test');

/**
 * Users View Page Object
 * Handles viewing user details and related operations
 */
class UsersViewPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usersPage = new UsersPage(page);
    this.selectors = viewSelectors;
  }

  /**
   * View a user by user ID from the users list
   * @param {number|string} userId
   */
  async viewUser(userId) {
    const row = this.page.locator(this.selectors.userRow(userId));
    const viewLink = row.getByRole(this.selectors.viewUserLink.role, { name: this.selectors.viewUserLink.name });
    await expect(viewLink).toBeVisible();
    await viewLink.click();
  }

  /**
   * Verify user detail heading is visible with given name
   * @param {string} userName
   */
  async verifyUserDetailHeading(userName) {
    await expect(this.page.getByRole('heading', { name: userName })).toBeVisible();
  }

  /**
   * Verify the user detail wrapper is visible
   */
  async verifyUserWrapperVisible() {
    await expect(this.page.locator(this.selectors.userWrapper)).toBeVisible();
  }

  /**
   * View a user and verify user detail heading and wrapper are visible
   * @param {number|string} userId
   * @param {string} userName
   */
  async viewUserByIdAndVerify(userId, userName) {
    await this.viewUser(userId);
    await this.verifyUserDetailHeading(userName);
    await this.verifyUserWrapperVisible();
  }
}

module.exports = UsersViewPage;
