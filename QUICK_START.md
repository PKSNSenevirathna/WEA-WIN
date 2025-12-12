# 🚀 QUICK START GUIDE - WEA-WIN Automation Framework

## ✅ Setup Complete!

Your Playwright automation framework has been successfully organized with the following structure:

```
WEA-WIN/
├── tests/
│   ├── login.setup.js      ✅ Authentication setup
│   ├── login.spec.js       ✅ 3 login test cases
│   └── users.spec.js       ✅ 9 user management test cases
├── pages/
│   ├── login.page.js       ✅ Login page object
│   └── users.page.js       ✅ Users page object
├── selectors/
│   ├── login.selectors.js  ✅ Login selectors
│   └── users.selectors.js  ✅ Users selectors
├── utils/
│   └── userData.json       ✅ Test data for 7 user profiles
├── fixtures/
│   └── auth.json           ⏳ Will be auto-generated on first run
├── .env                    ✅ Environment variables configured
├── playwright.config.js    ✅ Framework configuration
└── README.md              ✅ Complete documentation
```

## 🎯 What's Next?

### Step 1: Run Tests Immediately
```bash
npx playwright test
```

This will:
1. Run `login.setup.js` first (creates auth.json)
2. Run all test specs using saved authentication
3. Generate HTML report

### Step 2: View Test Report
```bash
npx playwright show-report
```

### Step 3: Run Specific Tests
```bash
# Login tests only
npx playwright test login.spec.js

# User management tests only
npx playwright test users.spec.js

# Run with visible browser
npx playwright test --headed

# Debug mode
npx playwright test --debug
```

## 🔑 Key Features Implemented

✅ **Page Object Model (POM)** - Clean separation of concerns
✅ **Authentication Reuse** - Login once, use everywhere (via auth.json)
✅ **Separate Selectors** - All selectors in dedicated files
✅ **Reusable Methods** - Common actions as methods in page objects
✅ **Test Data Management** - External JSON for user data
✅ **Environment Variables** - Credentials in .env file
✅ **Professional Structure** - Industry-standard organization
✅ **Comprehensive Comments** - Well-documented code
✅ **12 Test Cases** - 3 login + 9 user management tests

## 📊 Test Cases Summary

### Login Tests (login.spec.js):
- TC-001: Empty credentials validation
- TC-002: Successful login
- TC-003: Logout functionality

### User Management Tests (users.spec.js):
- TC-004: Form validation errors
- TC-005 to TC-012: Create users with different configurations
  - STATE SCHOOL
  - CHARTER SCHOOL
  - TRIBAL SCHOOL
  - INNOVATION SCHOOL
  - NOT LISTED HERE school
  - ABERDEEN SD
  - None school type
  - Complete workflow with logout

## ⚙️ Configuration

### .env file (already configured):
```env
BASE_URL=http://weadev.epicbusinessapps.com
USER_EMAIL=traineeautomation@yopmail.com
USER_PASSWORD=Trainee@123
```

Update if you need different credentials.

### playwright.config.js (already configured):
- Setup project runs first
- Authentication state reuse
- Screenshots on failure
- Videos on failure
- HTML + JSON reporting
- Sequential test execution

## 🏗️ Framework Architecture

```
Test Specs (login.spec.js, users.spec.js)
    ↓ imports
Page Objects (login.page.js, users.page.js)
    ↓ imports
Selectors (login.selectors.js, users.selectors.js)
    ↓ uses
Element Locators
```

## 📝 Adding New Tests

1. **Add Selector** (in selectors/*.selectors.js):
```javascript
newButton: 'button[name="New"]',
```

2. **Add Method** (in pages/*.page.js):
```javascript
async clickNewButton() {
  await this.page.getByRole(this.selectors.newButton).click();
}
```

3. **Use in Test** (in tests/*.spec.js):
```javascript
test('New test', async ({ page }) => {
  await usersPage.clickNewButton();
});
```

## 🐛 Debugging

### View test execution:
```bash
npx playwright test --headed
```

### Debug specific test:
```bash
npx playwright test login.spec.js --debug
```

### View trace:
```bash
npx playwright show-trace test-results/trace.zip
```

## 📚 Documentation

- **README.md**: Complete framework documentation
- **PROJECT_STRUCTURE.txt**: Detailed structure overview
- **Code Comments**: Every file is well-commented

## 🎉 You're Ready to Go!

Run your first test:
```bash
npx playwright test
```

## 💡 Pro Tips

1. Tests run sequentially for reliability
2. Authentication is handled automatically
3. Test data is in `utils/userData.json`
4. All credentials are in `.env` file
5. Page objects make tests easy to maintain
6. Add new tests by following the POM pattern

## 📞 Need Help?

- Check README.md for detailed documentation
- Use `--debug` flag for troubleshooting
- Review PROJECT_STRUCTURE.txt for architecture details

---

**Framework Status**: ✅ Ready to Run
**Total Test Cases**: 12
**Authentication**: ✅ Automated with auth.json
**Reporting**: ✅ HTML + JSON

Happy Testing! 🚀
