const { test, expect } = require('@playwright/test');
const UsersUpdatePage = require('../pages/users.update.page');
const UsersCreatePage = require('../pages/users.create.page');
const UsersDeletePage = require('../pages/users.delete.page');
const LoginPage = require('../pages/login.page');
const userData = require('../utils/userData.json');
require('dotenv').config();

/**
 * Users Update Test Suite
 * Tests user update functionality
 * All tests use saved authentication state from login.setup.js
 */

// Use saved authentication state for all tests
test.use({ storageState: 'fixtures/auth.json' });

test.describe('User Update Tests', () => {
  let usersUpdatePage;
  let usersCreatePage;
  let usersDeletePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    usersUpdatePage = new UsersUpdatePage(page);
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
    await usersUpdatePage.usersPage.navigateToUsersPage();
  });

  /**
   * Test Case 1: Create, update user first name, and delete
   */
  test('TC-001: Update user first name - Test1', async ({ page }) => {
    const user = userData.users[0];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersUpdatePage.editAndUpdateUserFirstName(userId, 'Automation', 'Automation Test1');
    await usersUpdatePage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 2: Create, update user last name, and delete
   */
  test('TC-002: Update user last name - Test2', async ({ page }) => {
    const user = userData.users[1];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersUpdatePage.editAndUpdateUserLastName(userId, 'Testing2', 'Trainee Testing2');
    await usersUpdatePage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 3: Create, update user phone number, and delete
   */
  test('TC-003: Update user phone number - Test3', async ({ page }) => {
    const user = userData.users[2];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersUpdatePage.editAndUpdateUserPhoneNumber(userId, '0705555555');
    await usersUpdatePage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 4: Create, update user position, and delete
   */
  test('TC-004: Update user position - Test4', async ({ page }) => {
    const user = userData.users[3];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersUpdatePage.editAndUpdateUserPosition(userId, 'Administrator', 'Community Member');
    await usersUpdatePage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 5: Create, update user role, and delete
   */
  test('TC-005: Update user role - Test5', async ({ page }) => {
    const user = userData.users[4];
    await usersCreatePage.createUser(user);

    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersUpdatePage.editAndUpdateUserRole(userId, 'Non-member', 'Clock hour committee');
    await usersUpdatePage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });
});
