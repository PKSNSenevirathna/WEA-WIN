const { test, expect } = require('../shared/fixtures/baseTest');
const UsersCreatePage = require('../../pages/users.create.page');
const UsersDeletePage = require('../../pages/users.delete.page');
const userData = require('../../utils/userData.json');

test.describe('User Creation Tests', () => {
  let usersCreatePage;
  let usersDeletePage;

  test.beforeEach(async ({ authenticatedPage }) => {
    usersCreatePage = new UsersCreatePage(authenticatedPage);
    usersDeletePage = new UsersDeletePage(authenticatedPage);
    // Navigate to users page
    await usersCreatePage.usersPage.navigateToUsersPage();
  });

  test('UC-001: Verify New User page navigation', async ({ authenticatedPage }) => {
    await authenticatedPage.waitForTimeout(50000);
    await usersCreatePage.usersPage.clickNewUser();
    await usersCreatePage.verifyNewUserPageVisible();
  });

  test('UC-002: Verify Roles add/remove interactions', async ({ authenticatedPage }) => {
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

  test('UC-003: Verify user creation form validation errors', async ({ authenticatedPage }) => {
    await authenticatedPage.waitForTimeout(50000);
    // Navigate to New User page and submit empty form to assert validations
    await usersCreatePage.navigateToCreatePage();
    await usersCreatePage.clickCreateUser();
    await usersCreatePage.verifyAllValidationErrors();
  });

  test('UC-004: Create new user - Test1 (Accounting)', async ({ authenticatedPage }) => {
    const user = userData.users[0];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('UC-005: Create new user - Test2 (Admin)', async ({ authenticatedPage }) => {
    await authenticatedPage.waitForTimeout(50000);
    const user = userData.users[1];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('UC-006: Create new user - Test3 (Clock hour committee)', async ({ authenticatedPage }) => {
    const user = userData.users[2];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('UC-007: Create new user - Test4 (Member)', async ({ authenticatedPage }) => {
    await authenticatedPage.waitForTimeout(50000);
    const user = userData.users[3];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('UC-008: Create new user - Test5 (Non-member)', async ({ authenticatedPage }) => {
    const user = userData.users[4];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('UC-009: Create new user - Test6 (Staff)', async ({ authenticatedPage }) => {
    await authenticatedPage.waitForTimeout(50000);
    const user = userData.users[5];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  test('UC-010: Create new user - Test7 (System admin)', async ({ authenticatedPage }) => {
    const user = userData.users[6];
    await usersCreatePage.createUser(user);
    
    // Extract user ID from URL
    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();
    
    // Navigate to users list and delete the created user
    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });
});
