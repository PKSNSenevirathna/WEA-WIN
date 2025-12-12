const { test } = require('@playwright/test');
const LoginPage = require('../pages/login.page');
require('dotenv').config();

/**
 * Login Setup - Authentication State Management
 * This setup runs once before all tests to create an authenticated session
 * The session is saved to fixtures/auth.json and reused by all test specs
 */

const authFile = 'fixtures/auth.json';

test('authenticate and save session', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
  // Navigate to login page
  await loginPage.navigate();
  
  // Perform login using environment variables
  const email = process.env.USER_EMAIL || 'traineeautomation@yopmail.com';
  const password = process.env.USER_PASSWORD || 'Trainee@123';
  
  console.log(`Logging in with email: ${email}`);
  await loginPage.login(email, password);
  
  // Verify successful login
  await loginPage.verifySuccessfulLogin();
  
  // Save the authenticated state to auth.json
  await page.context().storageState({ path: authFile });
  
  console.log('Authentication state saved successfully to', authFile);
});
