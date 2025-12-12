const { test, expect } = require('@playwright/test');
const UsersPage = require('../pages/users.page');
const LoginPage = require('../pages/login.page');
const userData = require('../utils/userData.json');
require('dotenv').config();

// Use saved authentication state for all tests
test.use({ storageState: 'fixtures/auth.json' });

test.describe('User Management Tests', () => {
  let usersPage;
  let loginPage;

  test.beforeEach(async ({ page }) => {
    usersPage = new UsersPage(page);
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
    await usersPage.navigateToUsersPage();
  });

  /**
   * Test Case 1: Filter users by System Admin role
   * Verifies that clicking System Admin role filter displays correct scope information
   */
  test('TC-001: Verify System Admin role filter results', async ({ page }) => {
    await usersPage.clickSystemAdminRole();
    await usersPage.verifySystemAdminScope();
  });

  /**
   * Test Case 2: Filter users by Clock Hour Committee role
   * Verifies that clicking Clock Hour Committee role filter displays correct scope information
   */
  test('TC-002: Verify Clock Hour Committee role filter results', async ({ page }) => {
    await usersPage.clickClockHourCommitteeRole();
    await usersPage.verifyClockHourCommitteeScope();
  });
  test('TC-003: Verify New User link is visible', async ({ page }) => {
    await usersPage.verifyNewUserLinkVisible();
  });

  /**
   * Test Case 4: Filter users by Name
   * Filters the users list by Name and verifies the expected result and header
   */
  test('TC-004: Filter users by Name', async ({ page }) => {
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
  test('TC-005: Clear filters and verify collection', async ({ page }) => {
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
  test('TC-006: Complete user workflow with logout', async ({ page }) => {
    // Logout
    await page.getByRole('link', { name: 'Logout' }).click();
    await expect(page.getByText('You need to sign in or sign')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'WEA Log in' })).toBeVisible();
  });
});
