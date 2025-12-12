const { test, expect } = require('@playwright/test');
const UsersDeletePage = require('../pages/users.delete.page');
const UsersCreatePage = require('../pages/users.create.page');
const LoginPage = require('../pages/login.page');
const userData = require('../utils/userData.json');
require('dotenv').config();

/**
 * Users Delete Test Suite
 * Tests user deletion functionality
 */

// Use saved authentication state for all tests
test.use({ storageState: 'fixtures/auth.json' });

test.describe('User Delete Tests', () => {
  let usersDeletePage;
  let usersCreatePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    usersDeletePage = new UsersDeletePage(page);
    usersCreatePage = new UsersCreatePage(page);
    loginPage = new LoginPage(page);

    // Navigate to admin root
    await page.goto('http://weadev.epicbusinessapps.com/admin');

    // If not authenticated (no Dashboard), login via credentials
    const onDashboard = await page.getByRole('heading', { name: 'Dashboard' }).isVisible().catch(() => false);
    if (!onDashboard) {
      await loginPage.navigate();
      await loginPage.login(process.env.USER_EMAIL, process.env.USER_PASSWORD);
      await loginPage.verifySuccessfulLogin();
    }

    // Navigate to users list
    await usersDeletePage.usersPage.navigateToUsersPage();
  });

  /**
   * Test Case 1: Create and delete user - Test1
   */
  test('TC-001: Delete user - Test1', async ({ page }) => {
    const user = userData.users[0];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 2: Create and delete user - Test2
   */
  test('TC-002: Delete user - Test2', async ({ page }) => {
    const user = userData.users[1];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 3: Create and delete user - Test3
   */
  test('TC-003: Delete user - Test3', async ({ page }) => {
    const user = userData.users[2];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 4: Create and delete user - Test4
   */
  test('TC-004: Delete user - Test4', async ({ page }) => {
    const user = userData.users[3];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 5: Create and delete user - Test5
   */
  test('TC-005: Delete user - Test5', async ({ page }) => {
    const user = userData.users[4];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 6: Create and delete user - Test6
   */
  test('TC-006: Delete user - Test6', async ({ page }) => {
    const user = userData.users[5];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 7: Create and delete user - Test7
   */
  test('TC-007: Delete user - Test7', async ({ page }) => {
    const user = userData.users[6];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });
});
