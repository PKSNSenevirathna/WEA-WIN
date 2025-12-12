const { test, expect } = require('@playwright/test');
const UsersViewPage = require('../pages/users.view.page');
const UsersCreatePage = require('../pages/users.create.page');
const UsersDeletePage = require('../pages/users.delete.page');
const LoginPage = require('../pages/login.page');
const userData = require('../utils/userData.json');
require('dotenv').config();

/**
 * Users View Test Suite
 * Tests user detail viewing functionality
 * All tests use saved authentication state from login.setup.js
 */

// Use saved authentication state for all tests
test.use({ storageState: 'fixtures/auth.json' });

test.describe('User View Tests', () => {
  let usersViewPage;
  let usersCreatePage;
  let usersDeletePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    usersViewPage = new UsersViewPage(page);
    usersCreatePage = new UsersCreatePage(page);
    usersDeletePage = new UsersDeletePage(page);
    loginPage = new LoginPage(page);
    // Navigate to admin root
    await page.goto('http://weadev.epicbusinessapps.com/admin');
    
    // If not authenticated (no Dashboard), try to login using env credentials as fallback
    const onDashboard = await page.getByRole('heading', { name: 'Dashboard' }).isVisible().catch(() => false);
    if (!onDashboard) {
      await loginPage.navigate();
      await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
      await loginPage.verifySuccessfulLogin();
    }
    // Navigate to users list
    await usersViewPage.usersPage.navigateToUsersPage();
  });

  /**
   * Test Case 1: Create, view, and delete user (Test1)
   * Creates a user, views it, and cleans up by deleting
   */
  test('TC-001: Verify View user detail page navigation - Test1', async ({ page }) => {
    const user = userData.users[0];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersViewPage.viewUserByIdAndVerify(userId, `${user.firstName} ${user.lastName}`);
    await usersViewPage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 2: Create, view, and delete user (Test2)
   */
  test('TC-002: Verify View user detail page navigation - Test2', async ({ page }) => {
    const user = userData.users[1];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersViewPage.viewUserByIdAndVerify(userId, `${user.firstName} ${user.lastName}`);
    await usersViewPage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 3: Create, view, and delete user (Test3)
   */
  test('TC-003: Verify View user detail page navigation - Test3', async ({ page }) => {
    const user = userData.users[2];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersViewPage.viewUserByIdAndVerify(userId, `${user.firstName} ${user.lastName}`);
    await usersViewPage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 4: Create, view, and delete user (Test4)
   */
  test('TC-004: Verify View user detail page navigation - Test4', async ({ page }) => {
    const user = userData.users[3];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersViewPage.viewUserByIdAndVerify(userId, `${user.firstName} ${user.lastName}`);
    await usersViewPage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 5: Create, view, and delete user (Test5)
   */
  test('TC-005: Verify View user detail page navigation - Test5', async ({ page }) => {
    const user = userData.users[4];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersViewPage.viewUserByIdAndVerify(userId, `${user.firstName} ${user.lastName}`);
    await usersViewPage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 6: Create, view, and delete user (Test6)
   */
  test('TC-006: Verify View user detail page navigation - Test6', async ({ page }) => {
    const user = userData.users[5];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersViewPage.viewUserByIdAndVerify(userId, `${user.firstName} ${user.lastName}`);
    await usersViewPage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 7: Create, view, and delete user (Test7)
   */
  test('TC-007: Verify View user detail page navigation - Test7', async ({ page }) => {
    const user = userData.users[6];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersViewPage.viewUserByIdAndVerify(userId, `${user.firstName} ${user.lastName}`);
    await usersViewPage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });
});
