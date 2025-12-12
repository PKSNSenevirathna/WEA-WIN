const { test: base, expect } = require('@playwright/test');
const UserManager = require('../helpers/UserManager');
const LoginPage = require('../../../pages/login.page');

/**
 * Custom Base Test Fixture with Authenticated Page
 * 
 * This fixture extends the base Playwright test and provides an authenticatedPage
 * that is automatically logged in based on the project name.
 * 
 * Usage in test files:
 *   const { test, expect } = require('../shared/fixtures/baseTest');
 *   
 *   test('my test', async ({ authenticatedPage }) => {
 *     // Use authenticatedPage - it's already logged in
 *   });
 */

/**
 * Custom test fixture that provides an authenticated page
 */
const test = base.extend({
  /**
   * Authenticated Page Fixture
   * 
   * This fixture:
   * 1. Detects the current project name from testInfo
   * 2. Gets appropriate credentials from UserManager
   * 3. Performs login
   * 4. Returns the logged-in page
   * 
   * @param {Object} context - Fixture context
   * @param {import('@playwright/test').Page} context.page - Base page object
   * @param {import('@playwright/test').TestInfo} testInfo - Test information
   * @param {Function} use - Fixture use function
   */
  authenticatedPage: async ({ page }, use, testInfo) => {
    // Get the project name from testInfo
    const projectName = testInfo.project.name;
    
    console.log(`[BaseTest] Setting up authenticated page for project: ${projectName}`);

    // Get credentials for this project
    const credentials = UserManager.getCredentials(projectName);

    // Create LoginPage instance
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.navigate();
    
    // Perform login
    console.log(`[BaseTest] Logging in as: ${credentials.email}`);
    await loginPage.login(credentials.email, credentials.password);

    // Wait for successful login
    try {
      // Wait for the success message or dashboard
      await loginPage.verifySuccessfulLogin();
      console.log(`[BaseTest] Login successful for ${credentials.email}`);
    } catch (error) {
      console.error(`[BaseTest] Login verification failed for ${credentials.email}`);
      // Try alternative verification - check if dashboard is visible
      try {
        await loginPage.verifyDashboard();
        console.log(`[BaseTest] Dashboard visible, login appears successful`);
      } catch (dashError) {
        // Take a screenshot for debugging
        await page.screenshot({ path: `login-failure-${projectName}-${Date.now()}.png`, fullPage: true });
        throw new Error(`Login failed for project ${projectName} with email ${credentials.email}`);
      }
    }

    // Use the authenticated page in the test
    await use(page);

    // Cleanup: Logout or close context
    // Note: The page/context will be automatically closed by Playwright
    console.log(`[BaseTest] Cleaning up authenticated page for project: ${projectName}`);
  },

  /**
   * Page fixture override - provides a fresh page with increased timeouts
   * This helps with potential timeout issues during parallel execution
   */
  page: async ({ context }, use) => {
    const page = await context.newPage();
    
    // Set increased timeouts for parallel execution reliability
    page.setDefaultTimeout(60000); // 60 seconds
    page.setDefaultNavigationTimeout(60000); // 60 seconds
    
    await use(page);
    
    await page.close();
  }
});

// Export the custom test and expect
module.exports = { test, expect };
