const UsersPage = require('./users.page');
const deleteSelectors = require('../selectors/users.delete.selectors');
const { expect } = require('@playwright/test');

/**
 * Users Delete Page Object
 * Handles deleting users and confirmation dialog
 */
class UsersDeletePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usersPage = new UsersPage(page);
    this.selectors = deleteSelectors;
  }

  /**
   * Click Delete link for a specific user and accept the confirmation dialog
   * @param {number|string} userId
   */
  async deleteUserWithConfirmation(userId) {
    // Prepare dialog acceptance before clicking delete
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });

    const row = this.page.locator(this.selectors.userRow(userId));
    const deleteLink = row.getByRole(this.selectors.deleteLink.role, { name: this.selectors.deleteLink.name });
    await expect(deleteLink).toBeVisible();
    await deleteLink.click();

    // Confirm row disappears after deletion
    await expect(row).toBeHidden({ timeout: 10000 });
  }
}

module.exports = UsersDeletePage;
