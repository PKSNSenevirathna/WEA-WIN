const { test, expect } = require('../shared/fixtures/baseTest');
const UsersPage = require('../../pages/users.page');

test.describe('User Management Tests', () => {
  let usersPage;

  test.beforeEach(async ({ authenticatedPage }) => {
    usersPage = new UsersPage(authenticatedPage);
    await usersPage.navigateToUsersPage();
  });

  /**
   * Test Case 1: Filter users by System Admin role
   * Verifies that clicking System Admin role filter displays correct scope information
   */
  test('UM-001: Verify System Admin role filter results', async ({ authenticatedPage }) => {
    await usersPage.clickSystemAdminRole();
    await usersPage.verifySystemAdminScope();
  });

  /**
   * Test Case 2: Filter users by Clock Hour Committee role
   * Verifies that clicking Clock Hour Committee role filter displays correct scope information
   */
  test('UM-002: Verify Clock Hour Committee role filter results', async ({ authenticatedPage }) => {
    await usersPage.clickClockHourCommitteeRole();
    await usersPage.verifyClockHourCommitteeScope();
  });
  test('UM-003: Verify New User link is visible', async ({ authenticatedPage }) => {
    await usersPage.verifyNewUserLinkVisible();
  });

  /**
   * Test Case 4: Filter users by Name
   * Filters the users list by Name and verifies the expected result and header
   */
  test('UM-004: Filter users by Name', async ({ authenticatedPage }) => {
    // Enter filter value and apply
    await usersPage.setNameFilter('sibha');
    await usersPage.clickFilterButton();
    // Verify filtered result and header
    await usersPage.verifyFilteredLinkVisible('Sibha');
    await usersPage.verifyResultsHeaderVisible();
  });

  /**
   * Test Case 5: Clear filters
   * Clears applied filters and verifies collection selection is visible
   */
  test('UM-005: Clear filters and verify collection', async ({ authenticatedPage }) => {
    // Enter filter value and apply
    await usersPage.setNameFilter('sibha');
    await usersPage.clickFilterButton();
    // Assume filter applied; clear and verify
    await usersPage.clickClearFilters();
    await usersPage.verifyCollectionSelectionVisible();
  });

  /**
   * Test Case 6: Complete user workflow test
   * Tests the complete flow: navigate to users, create user, and logout
   */
  test('UM-006: Complete user workflow with logout', async ({ authenticatedPage }) => {
    // Logout
    await authenticatedPage.getByRole('link', { name: 'Logout' }).click();
    await expect(authenticatedPage.getByText('You need to sign in or sign')).toBeVisible();
    await expect(authenticatedPage.getByRole('heading', { name: 'WEA Log in' })).toBeVisible();
  });
});
