const { test, expect } = require('@playwright/test');
const UsersCreatePage = require('../pages/users.create.page');
const UsersDeletePage = require('../pages/users.delete.page');
const LoginPage = require('../pages/login.page');
const userData = require('../utils/userData.json');
require('dotenv').config();

// Use saved authentication state for all create-user tests
test.use({ storageState: 'fixtures/auth.json' });

test.describe('User Creation Tests', () => {
  let usersCreatePage;
  let usersDeletePage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
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
    // Ensure we're on Users page
    await usersCreatePage.usersPage.navigateToUsersPage();
  });

  test('TC-001: Verify New User page navigation', async ({ page }) => {
    await usersCreatePage.usersPage.clickNewUser();
    await usersCreatePage.verifyNewUserPageVisible();
  });

  test('TC-002: Verify Roles add/remove interactions', async ({ page }) => {
    // Navigate to New User page
    await usersCreatePage.usersPage.clickNewUser();
    // Verify Roles group visible
    await usersCreatePage.verifyRolesGroupVisible();
    // Add a role, then remove two roles, then add again
    await usersCreatePage.clickAddRole();
    await usersCreatePage.clickRemoveRoleNth(1);
    await usersCreatePage.clickRemoveRoleFirst();
    await usersCreatePage.clickAddRole();
  });

  test('TC-003: Verify user creation form validation errors', async ({ page }) => {
    // Navigate to New User page and submit empty form to assert validations
    await usersCreatePage.navigateToCreatePage();
    await usersCreatePage.clickCreateUser();
    await usersCreatePage.verifyAllValidationErrors();
  });

  test('TC-004: Create new user - Test1 (Accounting)', async ({ page }) => {
    const user = userData.users[0];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('TC-005: Create new user - Test2 (Admin)', async ({ page }) => {
    const user = userData.users[1];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('TC-006: Create new user - Test3 (Clock hour committee)', async ({ page }) => {
    const user = userData.users[2];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('TC-007: Create new user - Test4 (Member)', async ({ page }) => {
    const user = userData.users[3];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('TC-008: Create new user - Test5 (Non-member)', async ({ page }) => {
    const user = userData.users[4];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('TC-009: Create new user - Test6 (Staff)', async ({ page }) => {
    const user = userData.users[5];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('TC-010: Create new user - Test7 (System admin)', async ({ page }) => {
    const user = userData.users[6];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = page.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });
});
