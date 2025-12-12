// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

/**
 * Playwright Configuration for WEA-WIN Admin Application
 * Folder-Based Parallel Execution Architecture
 * 
 * This configuration supports parallel execution of test groups,
 * where each group uses a dedicated user account to prevent session conflicts.
 * 
 * Architecture:
 * - 4 Workers: Runs test groups in parallel
 * - fullyParallel: false - Tests within each group run sequentially
 * - Each project uses the baseTest fixture with automatic authentication
 * 
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  /* Maximum time one test can run for */
  timeout: 120 * 1000, // Increased to 120s to handle user creation/deletion operations
  
  /* Run tests in files in parallel */
  fullyParallel: false, // Keep tests within a group sequential
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1, // Allow 1 retry locally for flaky tests
  
  /* Number of parallel workers - one per test group */
  workers: 4, // Run 4 test groups in parallel (one worker per project below)
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL || 'http://weadev.epicbusinessapps.com',
    
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Video on failure */
    video: 'retain-on-failure',
    
    /* Maximum time each action such as `click()` can take */
    actionTimeout: 20 * 1000, // Increased to 20s for parallel execution
    
    /* Maximum time for navigation */
    navigationTimeout: 45 * 1000, // Increased to 45s for parallel execution
  },

  /* Configure projects for parallel execution with dedicated users */
  projects: [
    // Login Tests - Uses TEST_USER credentials
    {
      name: 'login',
      testMatch: /tests\/login\/.*\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
      },
      workers: 1, // Run login specs sequentially within this project
    },

    // Group 1 - User Creation & Management Tests - Uses TEST_USER_1 credentials
    {
      name: 'group1',
      testMatch: /tests\/group1\/.*\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
      },
      workers: 1, // Run group1 specs sequentially within this project
    },
    
    // Group 2 - User View & Update Tests - Uses TEST_USER_2 credentials
    {
      name: 'group2',
      testMatch: /tests\/group2\/.*\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
      },
      workers: 1, // Run group2 specs sequentially within this project
    },
    
    // Group 3 - User Delete Tests - Uses TEST_USER_3 credentials
    {
      name: 'group3',
      testMatch: /tests\/group3\/.*\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
      },
      workers: 1, // Run group3 specs sequentially within this project
    },
  ],
});

