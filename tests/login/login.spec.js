const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/login.page');
require('dotenv').config();

/**
 * Login Test Suite
 * Tests login functionality including invalid and valid login scenarios
 * NOTE: These tests do NOT use saved auth state as they test login itself
 */

test.describe('Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  /**
   * Test Case 1: Login page elements visibility
   * Verifies that all login page elements are visible and properly loaded
   */
  test('UL-001: Verify login page elements are visible', async ({ page }) => {
    await loginPage.verifyLoginPageElements();
  });

  /**
   * Test Case 2: Login with empty credentials
   * Verifies that validation error is shown when attempting to login without credentials
   */
  test('UL-002: Verify login validation when both fields are empty', async ({ page }) => {
    await loginPage.testInvalidLogin();
  });

  /**
   * Test Case 3: Login with email only
   * Verifies that login fails when password is missing
   */
  test('UL-003: Verify login fails with email only', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'traineeautomation@yopmail.com';
    await loginPage.loginWithEmailOnly(email);
  });

  /**
   * Test Case 4: Login with password only
   * Verifies that login fails when email is missing
   */
  test('UL-004: Verify login fails with password only', async ({ page }) => {
    const password = process.env.TEST_USER_PASSWORD || 'Trainee@123';
    await loginPage.loginWithPasswordOnly(password);
  });

  /**
   * Test Case 5: Login with invalid email and valid password
   * Verifies login fails when using an unknown email with a valid password
   */
  test('UL-005: Verify login fails with invalid email and valid password', async ({ page }) => {
    const email = 'traineeautomation123@yopmail.com';
    const password = process.env.TEST_USER_PASSWORD || 'Trainee@123';
    await loginPage.login(email, password);
    await loginPage.verifyInvalidCredentialsError();
  });

  /**
  /**
   * Test Case 6: Login with valid email and incorrect password
   * Verifies that login fails when password is incorrect
   */
  test('UL-006: Verify login fails with valid email and incorrect password', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'traineeautomation@yopmail.com';
    const password = 'Trainee@456';
    await loginPage.login(email, password);
    await loginPage.verifyInvalidCredentialsError();
  });

  /**
   * Test Case 7: Password visibility toggle functionality
   * Verifies that password visibility can be toggled multiple times
   */
  test('UL-007: Verify password visibility toggle functionality', async ({ page }) => {
    const password = process.env.TEST_USER_PASSWORD || 'Trainee@123';
    
    // Fill password field
    await loginPage.fillPassword(password);
    
    // Toggle password visibility 3 times
    await loginPage.togglePasswordVisibility(3);
  });

  /**
   * Test Case 8: Forgot password navigation
   * Verifies forgot password link opens the page and user can return to login
   */
  test('UL-008: Verify forgot password page accessibility', async ({ page }) => {
    await loginPage.openForgotPassword();
    await loginPage.verifyForgotPasswordPage();
    await loginPage.returnToLogin();
    await loginPage.verifyLoginPage();
  });

  /**
   * Test Case 9: Forgot password validation without email
   * Verifies error messages appear when submitting reset with blank email
   */
  test('UL-009: Verify forgot password validation when email is blank', async ({ page }) => {
    await loginPage.openForgotPassword();
    await loginPage.verifyForgotPasswordPage();
    await loginPage.submitEmptyForgotPassword();
    await loginPage.verifyForgotPasswordErrors();
    await loginPage.returnToLogin();
    await loginPage.verifyLoginPage();
  });

  /**
   * Test Case 10: Remember me checkbox functionality
   * Verifies remember me checkbox can be checked and unchecked
   */
  test('UL-010: Verify remember me checkbox functionality', async ({ page }) => {
    await loginPage.verifyRememberMeCheckbox();
    await loginPage.checkRememberMe();
    await loginPage.uncheckRememberMe();
    await loginPage.uncheckRememberMe();
  });

  /**
   * Test Case 11: Login with valid credentials
   * Verifies successful login with correct email and password
   */
  test('UL-011: Verify successful login with valid credentials', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'traineeautomation@yopmail.com';
    const password = process.env.TEST_USER_PASSWORD || 'Trainee@123';
    
    await loginPage.login(email, password);
    await loginPage.verifySuccessfulLogin();
    
    // Verify dashboard is displayed after successful login
    await loginPage.verifyDashboard();
  });

  /**
   * Test Case 12: Users link visibility after login
   * Verifies that Users link is visible after successful login
   */
  test('UL-012: Verify Users link is visible after login', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'traineeautomation@yopmail.com';
    const password = process.env.TEST_USER_PASSWORD || 'Trainee@123';
    
    await loginPage.login(email, password);
    await loginPage.verifySuccessfulLogin();
    await loginPage.verifyUsersLink();
  });

  /**
   * Test Case 13: Users page visibility after navigation
   * Verifies Users page elements are visible after navigating via Users link
   */
  test('UL-013: Verify Users page elements are visible', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'traineeautomation@yopmail.com';
    const password = process.env.TEST_USER_PASSWORD || 'Trainee@123';
    
    await loginPage.login(email, password);
    await loginPage.verifySuccessfulLogin();
    await loginPage.verifyUsersLink();
    await loginPage.openUsersPage();
    await loginPage.verifyUsersPageElements();
  });

  /**
   * Test Case 14: Logout functionality
   * Verifies user can successfully logout
   */
  test('UL-014: Verify logout functionality', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL || 'traineeautomation@yopmail.com';
    const password = process.env.TEST_USER_PASSWORD || 'Trainee@123';
    
    // Login first
    await loginPage.login(email, password);
    await loginPage.verifySuccessfulLogin();
    
    // Perform logout
    await loginPage.logout();
    
    // Verify login page is displayed after logout
    await loginPage.verifyLoginPage();
  });

});
