# Quick Start Guide - Parallel Execution

## Prerequisites
Ensure you have the following 4 user accounts created in your test environment:
- traineeautomation@yopmail.com (TEST_USER)
- traineeautomation1@yopmail.com (TEST_USER_1)
- traineeautomation2@yopmail.com (TEST_USER_2)
- traineeautomation3@yopmail.com (TEST_USER_3)

All with password: `Trainee@123`

## Running Tests

### 1. Run All Tests in Parallel (Recommended)
```bash
npx playwright test
```
This will run all 4 test groups in parallel using 4 workers.

### 2. Run Specific Test Group
```bash
# Run login tests only
npx playwright test --project=login

# Run group1 tests (user creation & management)
npx playwright test --project=group1

# Run group2 tests (user view & update)
npx playwright test --project=group2

# Run group3 tests (user deletion)
npx playwright test --project=group3
```

### 3. Run in UI Mode (Interactive)
```bash
npx playwright test --ui
```

### 4. Run with Headed Browser (See Browser)
```bash
npx playwright test --headed
```

### 5. Debug Mode
```bash
npx playwright test --debug
```

## View Test Results

### HTML Report
```bash
npx playwright show-report
```

### JSON Results
Results are saved in `test-results/results.json`

## Test Organization

### Login Tests (`tests/login/`)
- Uses: TEST_USER
- Tests login functionality
- Does not require pre-authentication

### Group 1 (`tests/group1/`)
- Uses: TEST_USER_1
- Tests: User creation & management
- Files: users.create.spec.js, users.manage.spec.js

### Group 2 (`tests/group2/`)
- Uses: TEST_USER_2
- Tests: User viewing & updating
- Files: users.view.spec.js, users.update.spec.js

### Group 3 (`tests/group3/`)
- Uses: TEST_USER_3
- Tests: User deletion
- Files: users.delete.spec.js

## Configuration

### Adjust Parallel Workers
Edit `playwright.config.js`:
```javascript
workers: 4  // Change to 2 for less parallelism, or 8 for more
```

### Adjust Timeouts
Edit `playwright.config.js`:
```javascript
timeout: 90 * 1000,          // Test timeout
actionTimeout: 20 * 1000,     // Action timeout
navigationTimeout: 45 * 1000  // Navigation timeout
```

## Common Commands

```bash
# Install Playwright browsers (if needed)
npx playwright install

# List all tests
npx playwright test --list

# Run tests matching a pattern
npx playwright test users.create

# Run with specific browser
npx playwright test --project=chromium

# Generate test report
npx playwright test --reporter=html
```

## Troubleshooting

### Tests fail with "User not found" or login errors
- Verify all 4 user accounts exist
- Check `.env` file has correct credentials
- Ensure users have appropriate permissions

### Timeout errors
- Increase timeout values in `playwright.config.js`
- Reduce number of workers if system is overloaded

### Port conflicts
- Ensure no other instances of Playwright are running
- Check if test server is accessible

## Environment Variables

Check your `.env` file contains:
```
TEST_USER_EMAIL=traineeautomation@yopmail.com
TEST_USER_PASSWORD=Trainee@123

TEST_USER_1_EMAIL=traineeautomation1@yopmail.com
TEST_USER_1_PASSWORD=Trainee@123

TEST_USER_2_EMAIL=traineeautomation2@yopmail.com
TEST_USER_2_PASSWORD=Trainee@123

TEST_USER_3_EMAIL=traineeautomation3@yopmail.com
TEST_USER_3_PASSWORD=Trainee@123
```

---

**Happy Testing! 🚀**
