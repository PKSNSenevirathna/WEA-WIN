# WEA-WIN Admin Automation Framework

## 📋 Overview
Professional Playwright automation framework for WEA-WIN admin website using **Page Object Model (POM)** design pattern. This framework provides clean, scalable, and maintainable test automation with reusable components.

## 🏗️ Project Structure

```
WEA-WIN/
├── tests/
│   ├── login.setup.js          # Authentication setup (creates auth.json)
│   ├── login.spec.js           # Login test cases
│   └── users.spec.js           # User management test cases
├── pages/
│   ├── login.page.js           # Login page object with methods
│   └── users.page.js           # Users page object with methods
├── selectors/
│   ├── login.selectors.js      # Login page selectors
│   └── users.selectors.js      # Users page selectors
├── utils/
│   └── userData.json           # Test data for user creation
├── fixtures/
│   └── auth.json               # Saved authentication state (auto-generated)
├── .env                        # Environment variables (credentials)
├── playwright.config.js        # Playwright configuration
└── package.json                # Project dependencies
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Configure Environment
The `.env` file is already created with default values:
```env
BASE_URL=http://weadev.epicbusinessapps.com
USER_EMAIL=traineeautomation@yopmail.com
USER_PASSWORD=Trainee@123
```

Update credentials if needed.

### 3. Run Tests

#### Run all tests (includes setup + all specs):
```bash
npx playwright test
```

#### Run specific test suite:
```bash
# Login tests only
npx playwright test login.spec.js

# User management tests only
npx playwright test users.spec.js
```

#### Run with UI mode:
```bash
npx playwright test --ui
```

#### Run in headed mode (visible browser):
```bash
npx playwright test --headed
```

#### Generate and view HTML report:
```bash
npx playwright show-report
```

## 🔑 Authentication Flow

### How It Works:
1. **login.setup.js** runs FIRST (defined in playwright.config.js)
2. It logs in using credentials from `.env`
3. Saves authentication state to `fixtures/auth.json`
4. All other tests reuse this auth state (NO re-login needed)

### Benefits:
- ✅ Faster test execution (login once, reuse everywhere)
- ✅ No redundant login actions in test cases
- ✅ Tests can focus on actual functionality

## 📝 Test Cases

### Login Tests (login.spec.js)
- **TC-001**: Verify login validation with empty credentials
- **TC-002**: Verify successful login with valid credentials
- **TC-003**: Verify logout functionality

### User Management Tests (users.spec.js)
- **TC-004**: Verify user creation form validation errors
- **TC-005**: Create new user - Test1 (STATE SCHOOL)
- **TC-006**: Create new user - Test2 (CHARTER SCHOOL)
- **TC-007**: Create new user - Test3 (TRIBAL SCHOOL)
- **TC-008**: Create new user - Test4 (INNOVATION SCHOOL with Active status)
- **TC-009**: Create new user - Test5 (NOT LISTED HERE school)
- **TC-010**: Create new user - Test6 (ABERDEEN SD)
- **TC-011**: Create new user - Test7 (None school type)
- **TC-012**: Complete user workflow with logout

## 🎯 Page Object Model (POM)

### LoginPage Methods:
```javascript
- navigate()                    // Navigate to login page
- fillEmail(email)              // Fill email field
- fillPassword(password)        // Fill password field
- clickLoginButton()            // Click login button
- login(email, password)        // Complete login flow
- verifyInvalidCredentialsError() // Verify error message
- verifySuccessfulLogin()       // Verify success message
- logout()                      // Perform logout
- verifyLoginPage()             // Verify on login page
```

### UsersPage Methods:
```javascript
- navigateToUsersPage()         // Navigate from dashboard to users
- clickNewUser()                // Click new user button
- clickCreateUser()             // Click create user button
- verifyAllValidationErrors()   // Verify all form errors
- fillBasicUserInfo(userData)   // Fill name, email, password, phone
- selectDateOfBirth(day)        // Select DOB from calendar
- selectSchool(schoolName)      // Select school dropdown
- selectLocalAssociation(name)  // Select local association
- selectWorkLocation(location)  // Select work location
- selectGradeLevel(grade)       // Select grade level
- selectUniservCouncil(council) // Select UniServ council
- selectJobCategory(category)   // Select job category
- selectRole(role)              // Select role
- fillUserForm(userData)        // Fill complete form
- verifyUserCreated(userName)   // Verify user creation
- createUser(userData)          // Complete user creation flow
- deleteUserById(userId)        // Delete user from list
```

## 📦 Test Data

User test data is stored in `utils/userData.json` with 7 pre-configured user profiles covering different scenarios:
- Different school types
- Different roles and job categories
- Different grade levels
- Different association configurations

## 🔧 Configuration

### playwright.config.js Features:
- ✅ Sequential test execution (fullyParallel: false)
- ✅ Setup project runs first (creates auth state)
- ✅ Authentication state reuse for all tests
- ✅ Screenshots on failure
- ✅ Video recording on failure
- ✅ Trace on failure
- ✅ HTML and JSON reporting
- ✅ Configurable timeouts

## 📊 Reporting

After test execution, reports are available:
- **HTML Report**: `playwright-report/index.html`
- **JSON Results**: `test-results/results.json`
- **Screenshots**: `test-results/` (on failure)
- **Videos**: `test-results/` (on failure)

View HTML report:
```bash
npx playwright show-report
```

## 🛠️ Best Practices Implemented

1. ✅ **Page Object Model** - Separates test logic from page interactions
2. ✅ **Selector Isolation** - All selectors in separate files
3. ✅ **Reusable Methods** - Common actions as reusable methods
4. ✅ **Test Data Management** - External JSON for test data
5. ✅ **Authentication Reuse** - Login once, use everywhere
6. ✅ **Environment Variables** - Sensitive data in .env
7. ✅ **Clear Comments** - Well-documented code
8. ✅ **Modular Structure** - Easy to extend and maintain
9. ✅ **Error Handling** - Proper assertions and validations
10. ✅ **Clean Architecture** - Follows industry standards

## 🐛 Debugging

### Debug specific test:
```bash
npx playwright test login.spec.js --debug
```

### Debug from specific line:
Add `await page.pause()` in your test code

### View trace:
```bash
npx playwright show-trace test-results/trace.zip
```

## 📝 Adding New Tests

### 1. Add selectors to appropriate selector file
```javascript
// selectors/users.selectors.js
newButton: 'button[name="New Button"]',
```

### 2. Add method to page object
```javascript
// pages/users.page.js
async clickNewButton() {
  await this.page.getByRole(this.selectors.newButton).click();
}
```

### 3. Use in test
```javascript
// tests/users.spec.js
test('New test case', async ({ page }) => {
  await usersPage.clickNewButton();
});
```

## 🔐 Security Notes

- Never commit `.env` file with real credentials
- `auth.json` contains session data - keep it secure
- Use environment variables for sensitive data

## 📞 Support

For issues or questions:
1. Check Playwright documentation: https://playwright.dev
2. Review test execution logs
3. Use `--debug` flag for troubleshooting

---

**Framework Version**: 1.0.0  
**Last Updated**: December 2025  
**Playwright Version**: Latest

## 🎉 Quick Start

```bash
# Install and run everything
npm install
npx playwright install chromium
npx playwright test
npx playwright show-report
```

Happy Testing! 🚀
