const { test, expect } = require('../shared/fixtures/baseTest');
const UsersDeletePage = require('../../pages/users.delete.page');
const UsersCreatePage = require('../../pages/users.create.page');
const userData = require('../../utils/userData.json');

/**
 * Users Delete Test Suite
 * Tests user deletion functionality
 */

test.describe('User Delete Tests', () => {
  let usersDeletePage;
  let usersCreatePage;

  test.beforeEach(async ({ authenticatedPage }) => {
    usersDeletePage = new UsersDeletePage(authenticatedPage);
    usersCreatePage = new UsersCreatePage(authenticatedPage);
    // Navigate to users list
    await usersDeletePage.usersPage.navigateToUsersPage();
  });

  /**
   * Test Case 1: Create and delete user - Test1
   */
  test('UD-001: Delete user - Test1', async ({ authenticatedPage }) => {
    await authenticatedPage.waitForTimeout(30000);
    const user = userData.users[0];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 2: Create and delete user - Test2
   */
  test('UD-002: Delete user - Test2', async ({ authenticatedPage }) => {
    const user = userData.users[1];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 3: Create and delete user - Test3
   */
  test('UD-003: Delete user - Test3', async ({ authenticatedPage }) => {
    await authenticatedPage.waitForTimeout(30000);
    const user = userData.users[2];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 4: Create and delete user - Test4
   */
  test('UD-004: Delete user - Test4', async ({ authenticatedPage }) => {
    const user = userData.users[3];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 5: Create and delete user - Test5
   */
  test('UD-005: Delete user - Test5', async ({ authenticatedPage }) => {
    const user = userData.users[4];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 6: Create and delete user - Test6
   */
  test('UD-006: Delete user - Test6', async ({ authenticatedPage }) => {
    const user = userData.users[5];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });

  /**
   * Test Case 7: Create and delete user - Test7
   */
  test('UD-007: Delete user - Test7', async ({ authenticatedPage }) => {
    const user = userData.users[6];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });
});
