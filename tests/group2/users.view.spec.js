const { test, expect } = require('../shared/fixtures/baseTest');
const UsersViewPage = require('../../pages/users.view.page');
const UsersCreatePage = require('../../pages/users.create.page');
const UsersDeletePage = require('../../pages/users.delete.page');
const userData = require('../../utils/userData.json');

/**
 * Users View Test Suite
 * Tests user detail viewing functionality
 */

test.describe('User View Tests', () => {
  let usersViewPage;
  let usersCreatePage;
  let usersDeletePage;

  test.beforeEach(async ({ authenticatedPage }) => {
    usersViewPage = new UsersViewPage(authenticatedPage);
    usersCreatePage = new UsersCreatePage(authenticatedPage);
    usersDeletePage = new UsersDeletePage(authenticatedPage);
    // Navigate to users list
    await usersViewPage.usersPage.navigateToUsersPage();
  });

  /**
   * Test Case 1: Create, view, and delete user (Test1)
   * Creates a user, views it, and cleans up by deleting
   */
  test('UV-001: Verify View user detail page navigation - Test1', async ({ authenticatedPage }) => {
    const user = userData.users[0];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UV-002: Verify View user detail page navigation - Test2', async ({ authenticatedPage }) => {
    const user = userData.users[1];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UV-003: Verify View user detail page navigation - Test3', async ({ authenticatedPage }) => {
    const user = userData.users[2];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UV-004: Verify View user detail page navigation - Test4', async ({ authenticatedPage }) => {
    const user = userData.users[3];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UV-005: Verify View user detail page navigation - Test5', async ({ authenticatedPage }) => {
    const user = userData.users[4];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UV-006: Verify View user detail page navigation - Test6', async ({ authenticatedPage }) => {
    const user = userData.users[5];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UV-007: Verify View user detail page navigation - Test7', async ({ authenticatedPage }) => {
    const user = userData.users[6];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersViewPage.viewUserByIdAndVerify(userId, `${user.firstName} ${user.lastName}`);
    await usersViewPage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });
});
