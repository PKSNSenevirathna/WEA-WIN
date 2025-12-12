const { test, expect } = require('../shared/fixtures/baseTest');
const UsersUpdatePage = require('../../pages/users.update.page');
const UsersCreatePage = require('../../pages/users.create.page');
const UsersDeletePage = require('../../pages/users.delete.page');
const userData = require('../../utils/userData.json');

/**
 * Users Update Test Suite
 * Tests user update functionality
 */

test.describe('User Update Tests', () => {
  let usersUpdatePage;
  let usersCreatePage;
  let usersDeletePage;

  test.beforeEach(async ({ authenticatedPage }) => {
    usersUpdatePage = new UsersUpdatePage(authenticatedPage);
    usersCreatePage = new UsersCreatePage(authenticatedPage);
    usersDeletePage = new UsersDeletePage(authenticatedPage);
    // Navigate to users list
    await usersUpdatePage.usersPage.navigateToUsersPage();
  });

  /**
   * Test Case 1: Create, update user first name, and delete
   */
  test('UU-001: Update user first name - Test1', async ({ authenticatedPage }) => {
    const user = userData.users[0];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UU-002: Update user last name - Test2', async ({ authenticatedPage }) => {
    const user = userData.users[1];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UU-003: Update user phone number - Test3', async ({ authenticatedPage }) => {
    const user = userData.users[2];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UU-004: Update user position - Test4', async ({ authenticatedPage }) => {
    const user = userData.users[3];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
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
  test('UU-005: Update user role - Test5', async ({ authenticatedPage }) => {
    const user = userData.users[4];
    await usersCreatePage.createUser(user);

    const url = authenticatedPage.url();
    const userId = url.match(/\/admin\/users\/(\d+)/)?.[1];
    expect(userId).toBeDefined();

    await usersCreatePage.usersPage.navigateToUsersListViaBreadcrumb();
    await usersUpdatePage.editAndUpdateUserRole(userId, 'Non-member', 'Clock hour committee');
    await usersUpdatePage.usersPage.navigateToUsersPage();
    await usersDeletePage.deleteUserWithConfirmation(userId);
  });
});
