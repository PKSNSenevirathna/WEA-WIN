// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

/**
 * Playwright Configuration for WEA-WIN Admin Application
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  
  /* Maximum time one test can run for */
  timeout: 60 * 1000,
  
  /* Run tests in files in parallel */
  fullyParallel: false,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  
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
    actionTimeout: 15 * 1000,
    
    /* Maximum time for navigation */
    navigationTimeout: 30 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project - runs first to create auth state
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },
    
    // Chromium login tests - do NOT use auth state
    {
      name: 'chromium-login',
      testMatch: /.*login\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
      },
    },

    // Chromium user creation tests - depend on setup and use auth state
    {
      name: 'chromium-users-create',
      testMatch: /.*users\.create\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'fixtures/auth.json',
      },
      dependencies: ['setup'],
    },
    
    // Chromium user management tests - depend on setup and use auth state
    {
      name: 'chromium-users',
      testMatch: /.*users\.manage\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'fixtures/auth.json',
      },
      dependencies: ['setup'],
    },
    
    // Chromium user view tests - depend on setup and use auth state
    {
      name: 'chromium-users-view',
      testMatch: /.*users\.view\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'fixtures/auth.json',
      },
      dependencies: ['setup'],
    },
    
    // Chromium user update tests - depend on setup and use auth state
    {
      name: 'chromium-users-update',
      testMatch: /.*users\.update\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'fixtures/auth.json',
      },
      dependencies: ['setup'],
    },

    // Chromium user delete tests - depend on setup and use auth state
    {
      name: 'chromium-users-delete',
      testMatch: /.*users\.delete\.spec\.js/,
      use: { 
        ...devices['Desktop Chrome'],
        storageState: 'fixtures/auth.json',
      },
      dependencies: ['setup'],
    },
  ],
});

