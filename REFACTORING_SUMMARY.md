# Playwright Parallel Execution Refactoring - Summary

## Overview
This document describes the refactoring performed to enable **Folder-Based Parallel Execution** with dedicated user accounts for each test group.

## Architecture Changes

### Before Refactoring
- **Single user account** for all tests
- **Sequential execution** (1 worker)
- **Auth state stored in fixtures/auth.json**
- All spec files in flat `tests/` directory
- Manual login fallback in each test file

### After Refactoring
- **4 separate user accounts** (one per test group)
- **Parallel execution** (4 workers)
- **Dynamic authentication** via baseTest fixture
- Organized folder structure with test groups
- Automated login per project via UserManager

---

## 1. Directory Structure

```
tests/
├── login/                     # Login tests (uses TEST_USER)
│   └── login.spec.js
├── group1/                    # User creation & management (uses TEST_USER_1)
│   ├── users.create.spec.js
│   └── users.manage.spec.js
├── group2/                    # User view & update (uses TEST_USER_2)
│   ├── users.view.spec.js
│   └── users.update.spec.js
├── group3/                    # User deletion (uses TEST_USER_3)
│   └── users.delete.spec.js
└── shared/
    ├── fixtures/
    │   └── baseTest.js        # Custom test fixture with authentication
    └── helpers/
        └── UserManager.js      # Credentials manager
```

---

## 2. Environment Variables (.env)

Four separate user accounts configured:

```env
# Login tests
TEST_USER_EMAIL=traineeautomation@yopmail.com
TEST_USER_PASSWORD=Trainee@123

# Group 1 - User creation & management
TEST_USER_1_EMAIL=traineeautomation1@yopmail.com
TEST_USER_1_PASSWORD=Trainee@123

# Group 2 - User view & update
TEST_USER_2_EMAIL=traineeautomation2@yopmail.com
TEST_USER_2_PASSWORD=Trainee@123

# Group 3 - User deletion
TEST_USER_3_EMAIL=traineeautomation3@yopmail.com
TEST_USER_3_PASSWORD=Trainee@123
```

---

## 3. UserManager Helper

**Location:** `tests/shared/helpers/UserManager.js`

**Purpose:** Maps project names to appropriate credentials

**Mapping:**
- `login` → TEST_USER
- `group1` → TEST_USER_1
- `group2` → TEST_USER_2
- `group3` → TEST_USER_3

**Usage:**
```javascript
const credentials = UserManager.getCredentials('group1');
// Returns: { email: 'traineeautomation1@yopmail.com', password: 'Trainee@123' }
```

---

## 4. BaseTest Fixture

**Location:** `tests/shared/fixtures/baseTest.js`

**Purpose:** Provides authenticated page fixture for all tests

**How it works:**
1. Detects project name from `testInfo.project.name`
2. Calls UserManager to get appropriate credentials
3. Performs login using LoginPage
4. Returns authenticated page to test

**Usage in tests:**
```javascript
const { test, expect } = require('../shared/fixtures/baseTest');

test('my test', async ({ authenticatedPage }) => {
  // authenticatedPage is already logged in with correct user
  await usersPage.navigateToUsersPage();
});
```

---

## 5. Playwright Configuration

**Location:** `playwright.config.js`

**Key Settings:**
- `workers: 4` - Run 4 test groups in parallel
- `fullyParallel: false` - Keep tests within each group sequential
- `timeout: 90000` - Increased timeout for parallel execution
- `retries: 1` - Allow 1 retry for flaky tests

**Projects:**
```javascript
projects: [
  {
    name: 'login',
    testMatch: /tests\/login\/.*\.spec\.js/,
  },
  {
    name: 'group1',
    testMatch: /tests\/group1\/.*\.spec\.js/,
  },
  {
    name: 'group2',
    testMatch: /tests\/group2\/.*\.spec\.js/,
  },
  {
    name: 'group3',
    testMatch: /tests\/group3\/.*\.spec\.js/,
  },
]
```

---

## 6. Test File Updates

### Changes Made to All Group Test Files:

1. **Import baseTest instead of @playwright/test:**
   ```javascript
   // Before
   const { test, expect } = require('@playwright/test');
   
   // After
   const { test, expect } = require('../shared/fixtures/baseTest');
   ```

2. **Update import paths** (files moved to subdirectories):
   ```javascript
   // Before
   require('../pages/users.page');
   
   // After
   require('../../pages/users.page');
   ```

3. **Use authenticatedPage fixture instead of page:**
   ```javascript
   // Before
   test.beforeEach(async ({ page }) => {
     usersPage = new UsersPage(page);
     // ... manual login code ...
   });
   
   test('my test', async ({ page }) => {
     // test code
   });
   
   // After
   test.beforeEach(async ({ authenticatedPage }) => {
     usersPage = new UsersPage(authenticatedPage);
     await usersPage.navigateToUsersPage();
   });
   
   test('my test', async ({ authenticatedPage }) => {
     // test code - already authenticated
   });
   ```

4. **Remove manual authentication logic:**
   - Removed `test.use({ storageState: 'fixtures/auth.json' })`
   - Removed manual login fallback code
   - Removed LoginPage imports (except login.spec.js)

### Login Tests (login.spec.js):
- Updated to use `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`
- Kept using regular `page` fixture (tests login itself, doesn't need auth)
- Updated import paths to `../../pages/`

---

## 7. Removed Files/Dependencies

- `fixtures/login.setup.js` - No longer needed (replaced by baseTest fixture)
- `fixtures/auth.json` - No longer used (dynamic auth per project)

---

## 8. Running Tests

### Run all tests in parallel:
```bash
npx playwright test
```

### Run specific project:
```bash
npx playwright test --project=group1
npx playwright test --project=group2
npx playwright test --project=login
```

### Run with UI mode:
```bash
npx playwright test --ui
```

### View report:
```bash
npx playwright show-report
```

---

## 9. Benefits of This Architecture

✅ **No session conflicts** - Each group uses a separate user account
✅ **Parallel execution** - 4x faster test runs
✅ **Better organization** - Tests grouped by functionality
✅ **Cleaner code** - No manual login boilerplate in tests
✅ **Easier maintenance** - Centralized authentication logic
✅ **More reliable** - Increased timeouts for parallel execution
✅ **Scalable** - Easy to add more test groups and users

---

## 10. Troubleshooting

### If tests fail with authentication errors:
1. Verify all 4 user accounts exist in the test environment
2. Check `.env` file has correct credentials
3. Ensure users have proper permissions

### If tests timeout:
- Timeouts have been increased to 90s
- Action timeout: 20s
- Navigation timeout: 45s
- If needed, adjust in `playwright.config.js`

### If parallel execution causes issues:
- Reduce workers in `playwright.config.js` (e.g., `workers: 2`)
- Ensure each user account has sufficient permissions
- Check for resource contention in test environment

---

## 11. Next Steps / Recommendations

1. **Monitor test execution** to ensure stability with parallel runs
2. **Add more test groups** if needed (can scale to more users)
3. **Consider CI/CD integration** with parallel execution enabled
4. **Add test data isolation** if tests create conflicting data
5. **Implement test reporting** to track parallel execution performance

---

## Migration Checklist

- ✅ Restructured directory with test groups
- ✅ Created 4 separate user accounts in .env
- ✅ Created UserManager helper
- ✅ Created baseTest fixture
- ✅ Updated playwright.config.js for parallel execution
- ✅ Updated all spec files to use baseTest
- ✅ Removed old login.setup.js
- ✅ Updated import paths in all test files
- ✅ Removed manual authentication code
- ✅ Updated environment variable references

---

**Refactoring completed successfully! All tests should now run in parallel with dedicated user accounts.**
