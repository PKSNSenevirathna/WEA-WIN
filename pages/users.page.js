const { expect } = require('@playwright/test');
const usersSelectors = require('../selectors/users.selectors');

/**
 * Users Page Object Model
 * Handles all user management page interactions
 */
class UsersPage {
  /**
   * @param {import('@playwright/test').Page} page - Playwright page object
   */
  constructor(page) {
    this.page = page;
    this.selectors = usersSelectors;
  }

  /**
   * Navigate to Users page from dashboard
   */
  async navigateToUsersPage() {
    // Ensure page is loaded
    await this.page.waitForLoadState('domcontentloaded');
    // Sometimes redirect happens; give it a moment
    await this.page.waitForLoadState('networkidle').catch(() => {});

    // Two Users links can exist (breadcrumb and header). Prefer breadcrumb when present; fallback to header.
    const breadcrumbUsers = this.page.locator('#titlebar_left').getByRole(this.selectors.usersLink.role, { name: this.selectors.usersLink.name });
    const headerUsers = this.page.locator('#users').getByRole(this.selectors.usersLink.role, { name: this.selectors.usersLink.name });

    let usersLink = breadcrumbUsers;
    const breadcrumbVisible = await breadcrumbUsers.isVisible().catch(() => false);
    if (!breadcrumbVisible) {
      usersLink = headerUsers;
    }

    await expect(usersLink).toBeVisible({ timeout: 15000 });
    await usersLink.click();
    await expect(this.page.getByRole(this.selectors.usersHeading.role, { name: this.selectors.usersHeading.name })).toBeVisible({ timeout: 15000 });
  }

  /**
   * Click on System Admin role filter
   */
  async clickSystemAdminRole() {
    await expect(this.page.getByRole(this.selectors.systemAdminLink.role, { name: this.selectors.systemAdminLink.name })).toBeVisible();
    await this.page.getByRole(this.selectors.systemAdminLink.role, { name: this.selectors.systemAdminLink.name }).click();
  }

  /**
   * Verify System Admin scope filter results
   */
  async verifySystemAdminScope() {
    await expect(this.page.getByText(this.selectors.searchStatusText)).toBeVisible();
    await expect(this.page.getByText(this.selectors.scopeCurrentText)).toBeVisible();
    await expect(this.page.getByRole(this.selectors.scopeHeading.role, { name: this.selectors.scopeHeading.name })).toBeVisible();
    await expect(this.page.getByText(this.selectors.systemAdminText, { exact: true })).toBeVisible();
  }

  /**
   * Click on Admin role filter
   */
  async clickAdminRole() {
    await expect(this.page.getByRole(this.selectors.adminLink.role, { name: this.selectors.adminLink.name })).toBeVisible();
    await this.page.getByRole(this.selectors.adminLink.role, { name: this.selectors.adminLink.name }).click();
  }

  /**
   * Verify Admin scope filter results
   */
  async verifyAdminScope() {
    await expect(this.page.getByText(this.selectors.searchStatusAdminText)).toBeVisible();
    await expect(this.page.getByText(this.selectors.scopeAdminCurrentText)).toBeVisible();
    await expect(this.page.getByRole(this.selectors.scopeHeading.role, { name: this.selectors.scopeHeading.name })).toBeVisible();
    await expect(this.page.getByText(this.selectors.adminText, { exact: true })).toBeVisible();
  }

  /**
   * Click on Instructor role filter
   */
  async clickInstructorRole() {
    await expect(this.page.getByRole(this.selectors.instructorLink.role, { name: this.selectors.instructorLink.name })).toBeVisible();
    await this.page.getByRole(this.selectors.instructorLink.role, { name: this.selectors.instructorLink.name }).click();
  }

  /**
   * Verify Instructor scope filter results
   */
  async verifyInstructorScope() {
    await expect(this.page.getByText(this.selectors.searchStatusScopeText)).toBeVisible();
    await expect(this.page.getByText(this.selectors.scopeInstructorCurrentText)).toBeVisible();
    await expect(this.page.getByRole(this.selectors.scopeHeading.role, { name: this.selectors.scopeHeading.name })).toBeVisible();
    await expect(this.page.getByText(this.selectors.instructorText, { exact: true })).toBeVisible();
  }

  /**
   * Click on Clock Hour Committee role filter
   */
  async clickClockHourCommitteeRole() {
    await expect(this.page.getByRole(this.selectors.clockHourCommitteeLink.role, { name: this.selectors.clockHourCommitteeLink.name })).toBeVisible();
    await this.page.getByRole(this.selectors.clockHourCommitteeLink.role, { name: this.selectors.clockHourCommitteeLink.name }).click();
  }

  /**
   * Verify Clock Hour Committee scope filter results
   */
  async verifyClockHourCommitteeScope() {
    await expect(this.page.getByText(this.selectors.searchStatusClockHourText)).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: this.selectors.scopeClockHourCurrentText }).nth(4)).toBeVisible();
    await expect(this.page.getByRole(this.selectors.scopeHeading.role, { name: this.selectors.scopeHeading.name })).toBeVisible();
    await expect(this.page.getByText(this.selectors.clockHourCommitteeText, { exact: true })).toBeVisible();
  }

  /**
   * Verify New User link is visible
   */
  async verifyNewUserLinkVisible() {
    await expect(this.page.getByRole(this.selectors.newUserLink.role, { name: this.selectors.newUserLink.name })).toBeVisible();
  }

  /**
   * Click New User button
   */
  async clickNewUser() {
    await expect(this.page.getByRole(this.selectors.newUserLink.role, { name: this.selectors.newUserLink.name })).toBeVisible();
    await this.page.getByRole(this.selectors.newUserLink.role, { name: this.selectors.newUserLink.name }).click();
    await expect(this.page.getByRole(this.selectors.newUserHeading.role, { name: this.selectors.newUserHeading.name })).toBeVisible();
  }

  /**
   * Verify New User page is displayed
   */
  async verifyNewUserPageVisible() {
    await expect(this.page.getByText('Admin / Users / New User')).toBeVisible();
    await expect(this.page.locator('#new_user')).toBeVisible();
  }

  /**
   * Verify Roles group is visible on the New User page
   */
  async verifyRolesGroupVisible() {
    await expect(this.page.getByRole(this.selectors.rolesGroup.role, { name: this.selectors.rolesGroup.name })).toBeVisible();
  }

  /**
   * Click 'Add a Role' link
   */
  async clickAddRole() {
    await expect(this.page.getByRole(this.selectors.addRoleLink.role, { name: this.selectors.addRoleLink.name })).toBeVisible();
    await this.page.getByRole(this.selectors.addRoleLink.role, { name: this.selectors.addRoleLink.name }).click();
  }

  /**
   * Click the nth 'Remove' link (0-based index)
   * @param {number} index
   */
  async clickRemoveRoleNth(index = 0) {
    await this.page.getByRole(this.selectors.removeRoleLink.role, { name: this.selectors.removeRoleLink.name }).nth(index).click();
  }

  /**
   * Click the first 'Remove' link
   */
  async clickRemoveRoleFirst() {
    await this.page.getByRole(this.selectors.removeRoleLink.role, { name: this.selectors.removeRoleLink.name }).click();
  }

  /**
   * Set Name filter textbox
   * @param {string} name
   */
  async setNameFilter(name) {
    await expect(this.page.getByRole(this.selectors.nameField.role, { name: this.selectors.nameField.name })).toBeVisible();
    await this.page.getByRole(this.selectors.nameField.role, { name: this.selectors.nameField.name }).click();
    await this.page.getByRole(this.selectors.nameField.role, { name: this.selectors.nameField.name }).fill(name);
  }

  /**
   * Click the Filter button
   */
  async clickFilterButton() {
    await expect(this.page.getByRole(this.selectors.filterButton.role, { name: this.selectors.filterButton.name })).toBeVisible();
    await this.page.getByRole(this.selectors.filterButton.role, { name: this.selectors.filterButton.name }).click();
  }

  /**
   * Verify a filtered link is visible by its name
   * @param {string} linkText
   */
  async verifyFilteredLinkVisible(linkText) {
    await expect(this.page.getByRole('link', { name: linkText })).toBeVisible();
  }

  /**
   * Verify results header row is visible (Id First Name Last Name)
   */
  async verifyResultsHeaderVisible() {
    await expect(this.page.locator('div').filter({ hasText: 'Id First Name Last Name' }).nth(4)).toBeVisible();
  }

  /**
   * Click Clear Filters link
   */
  async clickClearFilters() {
    await expect(this.page.getByRole(this.selectors.clearFiltersLink.role, { name: this.selectors.clearFiltersLink.name })).toBeVisible();
    await this.page.getByRole(this.selectors.clearFiltersLink.role, { name: this.selectors.clearFiltersLink.name }).click();
  }

  /**
   * Verify collection selection is visible
   */
  async verifyCollectionSelectionVisible() {
    await expect(this.page.locator(this.selectors.collectionSelection)).toBeVisible();
  }

  /**
   * Verify Active column header is visible in users table
   */
  async verifyActiveColumnVisible() {
    await expect(this.page.getByRole(this.selectors.activeColumn.role, { name: this.selectors.activeColumn.name })).toBeVisible();
  }

  /**
   * Toggle a user's Active switch by user id a number of times
   * @param {number|string} userId
   * @param {number} times
   */
  async toggleUserActive(userId, times = 1) {
    const locator = this.page.locator(this.selectors.toggleUserActiveLocator(userId));
    await expect(locator).toBeVisible();
    for (let i = 0; i < times; i++) {
      await locator.click();
      // small delay to allow UI to update
      await this.page.waitForTimeout(250);
    }
  }

  /**
   * Click the View link for a user by id
   * @param {number|string} userId
   */
  async viewUser(userId) {
    const row = this.page.locator(this.selectors.userRow(userId));
    const viewLink = row.getByRole('link', { name: 'View' });
    await expect(viewLink).toBeVisible();
    await viewLink.click();
  }

  /**
   * Verify the user detail heading is visible with given name
   * @param {string} name
   */
  async verifyUserDetailHeading(name) {
    await expect(this.page.getByRole('heading', { name })).toBeVisible();
  }

  /**
   * Verify the user detail wrapper is visible
   */
  async verifyUserWrapperVisible() {
    await expect(this.page.locator(this.selectors.userWrapper)).toBeVisible();
  }

  /**
   * Click the Edit link for a user by id
   * @param {number|string} userId
   */
  async editUser(userId) {
    const row = this.page.locator(this.selectors.userRow(userId));
    const editLink = row.getByRole('link', { name: 'Edit' });
    await expect(editLink).toBeVisible();
    await editLink.click();
  }

  /**
   * Verify the edit user page is visible for the given user name
   * @param {string} name - full display name expected in heading/breadcrumb
   */
  async verifyEditUserPageVisible(name) {
    await expect(this.page.getByText(`Admin / Users / ${name} / Edit User`)).toBeVisible();
    await expect(this.page.locator(this.selectors.editUserWrapper)).toBeVisible();
    await expect(this.page.locator(this.selectors.editUserWrapper)).toBeVisible();
  }

  /**
   * Update the first name field on edit page
   * @param {string} firstName
   */
  async updateFirstName(firstName) {
    await this.page.getByRole(this.selectors.firstNameField.role, { name: this.selectors.firstNameField.name }).click();
    await this.page.getByRole(this.selectors.firstNameField.role, { name: this.selectors.firstNameField.name }).fill(firstName);
  }

  /**
   * Click Update User button
   */
  async clickUpdateUser() {
    await this.page.getByRole(this.selectors.updateUserButton.role, { name: this.selectors.updateUserButton.name }).click();
  }

  /**
   * Verify user was successfully updated
   */
  async verifyUserUpdated() {
    await expect(this.page.getByText(this.selectors.userUpdatedText)).toBeVisible();
  }

  /**
   * View a user by specific user id (e.g., 584) and verify user detail heading and wrapper
   * @param {number|string} userId
   * @param {string} userName
   */
  async viewUserByIdAndVerify(userId, userName) {
    await this.viewUser(userId);
    await this.verifyUserDetailHeading(userName);
    await this.verifyUserWrapperVisible();
  }

  /**
   * Delete a user by id and accept the confirmation dialog
   * @param {number|string} userId
   */
  async deleteUserWithConfirmation(userId) {
    // Set up dialog listener BEFORE clicking delete
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });
    
    // Click delete link
    const row = this.page.locator(this.selectors.userRow(userId));
    const deleteLink = row.getByRole('link', { name: 'Delete' });
    await expect(deleteLink).toBeVisible();
    await deleteLink.click();
  }

  /**
   * Click Create User button
   */
  async clickCreateUser() {
    await this.page.getByRole(this.selectors.createUserButton.role, { name: this.selectors.createUserButton.name }).click();
  }

  /**
   * Verify all validation errors are displayed
   */
  async verifyAllValidationErrors() {
    await expect(this.page.getByText(this.selectors.emailBlankError)).toBeVisible();
    await expect(this.page.locator('#user_password_input').getByText(this.selectors.passwordBlankError)).toBeVisible();
    await expect(this.page.locator('#user_first_name_input').getByText(this.selectors.firstNameBlankError)).toBeVisible();
    await expect(this.page.locator('#user_last_name_input').getByText(this.selectors.lastNameBlankError)).toBeVisible();
    await expect(this.page.locator('#user_school_id_input').getByText(this.selectors.schoolBlankError)).toBeVisible();
    await expect(this.page.locator('#user_local_association_id_input').getByText(this.selectors.localAssociationBlankError)).toBeVisible();
    await expect(this.page.locator('#user_work_location_id_input').getByText(this.selectors.workLocationBlankError, { exact: true })).toBeVisible();
    await expect(this.page.locator(this.selectors.gradeLevelError)).toBeVisible();
    await expect(this.page.locator(this.selectors.uniservCouncilError)).toBeVisible();
    await expect(this.page.locator(this.selectors.jobCategoryError)).toBeVisible();
    await expect(this.page.locator(this.selectors.roleError)).toBeVisible();
  }

  /**
   * Fill basic user information
   * @param {Object} userData - User data object
   */
  async fillBasicUserInfo(userData) {
    await this.page.getByRole(this.selectors.emailField.role, { name: this.selectors.emailField.name }).click();
    await this.page.getByRole(this.selectors.emailField.role, { name: this.selectors.emailField.name }).fill(userData.email);
    
    await this.page.getByRole(this.selectors.passwordField.role, { name: this.selectors.passwordField.name }).click();
    await this.page.getByRole(this.selectors.passwordField.role, { name: this.selectors.passwordField.name }).fill(userData.password);
    
    await this.page.getByRole(this.selectors.passwordConfirmationField.role, { name: this.selectors.passwordConfirmationField.name }).click();
    await this.page.getByRole(this.selectors.passwordConfirmationField.role, { name: this.selectors.passwordConfirmationField.name }).fill(userData.password);
    
    await this.page.getByRole(this.selectors.firstNameField.role, { name: this.selectors.firstNameField.name }).click();
    await this.page.getByRole(this.selectors.firstNameField.role, { name: this.selectors.firstNameField.name }).fill(userData.firstName);
    
    await this.page.getByRole(this.selectors.lastNameField.role, { name: this.selectors.lastNameField.name }).click();
    await this.page.getByRole(this.selectors.lastNameField.role, { name: this.selectors.lastNameField.name }).fill(userData.lastName);
    
    await this.page.getByRole(this.selectors.phoneNumberField.role, { name: this.selectors.phoneNumberField.name }).click();
    await this.page.getByRole(this.selectors.phoneNumberField.role, { name: this.selectors.phoneNumberField.name }).fill(userData.phoneNumber);
  }

  /**
   * Select date of birth
   * @param {string} day - Day to select
   */
  async selectDateOfBirth(day) {
    await this.page.getByRole(this.selectors.dateOfBirthField.role, { name: this.selectors.dateOfBirthField.name }).click();
    await this.page.getByRole('link', { name: day }).click();
  }

  /**
   * Select school from dropdown
   * @param {string} schoolName - School name to select
   */
  async selectSchool(schoolName) {
    await this.page.locator('#user_school_id_input').getByLabel('', { exact: true }).click();
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(500);
    try {
      const option = this.page.getByRole('option', { name: schoolName });
      await option.click({ timeout: 5000 });
    } catch (e) {
      // If exact match fails, get all options and click the first match
      const options = this.page.locator('role=option');
      const count = await options.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const text = await options.nth(i).textContent();
          if (text && text.includes(schoolName.split(' ')[0])) {
            await options.nth(i).click();
            return;
          }
        }
        await options.first().click();
      }
    }
  }

  /**
   * Select local association from dropdown
   * @param {string} associationName - Association name to select
   */
  async selectLocalAssociation(associationName) {
    await this.page.locator('#user_local_association_id_input').getByLabel('', { exact: true }).click();
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(500);
    try {
      const option = this.page.getByRole('option', { name: associationName });
      await option.click({ timeout: 5000 });
    } catch (e) {
      // If exact match fails, get all options and click the first match
      const options = this.page.locator('role=option');
      const count = await options.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const text = await options.nth(i).textContent();
          if (text && text.includes(associationName.split(' ')[0])) {
            await options.nth(i).click();
            return;
          }
        }
        await options.first().click();
      }
    }
  }

  /**
   * Select work location from dropdown
   * @param {string} locationName - Work location name to select
   */
  async selectWorkLocation(locationName) {
    await this.page.locator('#user_work_location_id_input').getByLabel('', { exact: true }).click();
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(500);
    try {
      const option = this.page.getByRole('option', { name: locationName });
      await option.click({ timeout: 5000 });
    } catch (e) {
      // If exact match fails, get all options and click the first match
      const options = this.page.locator('role=option');
      const count = await options.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const text = await options.nth(i).textContent();
          if (text && text.includes(locationName.split(' ')[0])) {
            await options.nth(i).click();
            return;
          }
        }
        await options.first().click();
      }
    }
  }

  /**
   * Select work location by locator (for dynamic IDs)
   * @param {string} locatorId - Specific locator ID
   */
  async selectWorkLocationByLocator(locatorId) {
    await this.page.locator('#user_work_location_id_input').getByLabel('', { exact: true }).click();
    await this.page.locator(locatorId).click();
  }

  /**
   * Select grade level from dropdown
   * @param {string} gradeLevel - Grade level to select
   */
  async selectGradeLevel(gradeLevel) {
    await this.page.getByRole('list').filter({ hasText: /^$/ }).click();
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(500);
    try {
      const option = this.page.getByRole('option', { name: gradeLevel });
      await option.click({ timeout: 5000 });
    } catch (e) {
      // If exact match fails, get all options and click the first match
      const options = this.page.locator('role=option');
      const count = await options.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const text = await options.nth(i).textContent();
          if (text && text.includes(gradeLevel.split(' ')[0])) {
            await options.nth(i).click();
            return;
          }
        }
        await options.first().click();
      }
    }
  }

  /**
   * Select grade level using combobox
   * @param {string} gradeLevel - Grade level to select
   */
  async selectGradeLevelViaCombobox(gradeLevel) {
    await this.page.locator('#user_grade_level_ids_input').getByRole('combobox').click();
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(500);
    try {
      const option = this.page.getByRole('option', { name: gradeLevel });
      await option.click({ timeout: 5000 });
    } catch (e) {
      // If exact match fails, get all options and click the first match
      const options = this.page.locator('role=option');
      const count = await options.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const text = await options.nth(i).textContent();
          if (text && text.includes(gradeLevel.split(' ')[0])) {
            await options.nth(i).click();
            return;
          }
        }
        await options.first().click();
      }
    }
  }

  /**
   * Select UniServ Council from dropdown
   * @param {string} councilName - Council name to select
   */
  async selectUniservCouncil(councilName) {
    await this.page.locator('#user_uniserv_council_id_input').getByLabel('', { exact: true }).click();
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(500);
    // Try exact match first, then try partial match, then try first available
    try {
      const option = this.page.getByRole('option', { name: councilName });
      await option.click({ timeout: 5000 });
    } catch (e) {
      // If exact match fails, get all options and click the first one that contains the text
      const options = this.page.locator('role=option');
      const count = await options.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const text = await options.nth(i).textContent();
          if (text && text.includes(councilName.split(' ')[0])) {
            await options.nth(i).click();
            return;
          }
        }
        // If still not found, click the first option
        await options.first().click();
      }
    }
  }

  /**
   * Select job category from dropdown
   * @param {string} jobCategory - Job category to select
   */
  async selectJobCategory(jobCategory) {
    await this.page.getByRole('group', { name: 'Personal Information' }).getByLabel('', { exact: true }).click();
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(500);
    try {
      const option = this.page.getByRole('option', { name: jobCategory });
      await option.click({ timeout: 5000 });
    } catch (e) {
      // If exact match fails, get all options and click the first match
      const options = this.page.locator('role=option');
      const count = await options.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const text = await options.nth(i).textContent();
          if (text && text.includes(jobCategory.split(' ')[0])) {
            await options.nth(i).click();
            return;
          }
        }
        await options.first().click();
      }
    }
  }

  /**
   * Select role from dropdown
   * @param {string} roleName - Role name to select
   */
  async selectRole(roleName) {
    await this.page.locator('#user_user_sub_roles_attributes_0_role_input').getByLabel('', { exact: true }).click();
    // Wait for dropdown options to appear
    await this.page.waitForTimeout(500);
    try {
      const option = this.page.getByRole('option', { name: roleName });
      await option.click({ timeout: 5000 });
    } catch (e) {
      // If exact match fails, get all options and click the first match
      const options = this.page.locator('role=option');
      const count = await options.count();
      if (count > 0) {
        for (let i = 0; i < count; i++) {
          const text = await options.nth(i).textContent();
          if (text && text.includes(roleName.split(' ')[0])) {
            await options.nth(i).click();
            return;
          }
        }
        await options.first().click();
      }
    }
  }

  /**
   * Select status from dropdown
   * @param {string} status - Status to select
   */
  async selectStatus(status) {
    await this.page.getByLabel('', { exact: true }).click();
    await this.page.getByRole('option', { name: status }).click();
  }

  /**
   * Fill complete user form
   * @param {Object} userData - Complete user data object
   */
  async fillUserForm(userData) {
    await this.fillBasicUserInfo(userData);
    await this.selectDateOfBirth(userData.dateOfBirth);
    await this.selectSchool(userData.school);
    await this.selectLocalAssociation(userData.localAssociation);
    
    if (userData.workLocationLocator) {
      await this.selectWorkLocationByLocator(userData.workLocationLocator);
    } else {
      await this.selectWorkLocation(userData.workLocation);
    }
    
    if (userData.gradeLevelViaCombobox) {
      await this.selectGradeLevelViaCombobox(userData.gradeLevel);
    } else {
      await this.selectGradeLevel(userData.gradeLevel);
    }
    
    await this.selectUniservCouncil(userData.uniservCouncil);
    await this.selectJobCategory(userData.jobCategory);
    await this.selectRole(userData.role);
    
    if (userData.status) {
      await this.selectStatus(userData.status);
    }
  }

  /**
   * Verify user was created successfully
   * @param {string} userName - Expected user name in heading
   */
  async verifyUserCreated(userName) {
    await expect(this.page.getByText(this.selectors.userCreatedText)).toBeVisible();
    await expect(this.page.getByRole('heading', { name: userName })).toBeVisible();
  }

  /**
   * Navigate back to Users list via breadcrumb
   */
  async navigateToUsersListViaBreadcrumb() {
    await this.page.locator('#titlebar_left').getByRole('link', { name: 'Users' }).click();
  }

  /**
   * Delete user by ID with dialog handling
   * @param {string} userId - User ID to delete
   */
  async deleteUserById(userId) {
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.page.locator(`#user_${userId}`).getByRole('link', { name: 'Delete' }).click();
  }

  /**
   * Delete user from detail page with dialog handling
   */
  async deleteUserFromDetailPage() {
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await this.page.getByRole(this.selectors.deleteUserLink.role, { name: this.selectors.deleteUserLink.name }).click();
  }

  /**
   * Create a new user with provided data
   * @param {Object} userData - User data object
   * @param {boolean} shouldVerify - Whether to verify creation (default: true)
   */
  async createUser(userData, shouldVerify = true) {
    await this.clickNewUser();
    await this.fillUserForm(userData);
    await this.clickCreateUser();
    
    if (shouldVerify) {
      await this.verifyUserCreated(`${userData.firstName} ${userData.lastName}`);
    }
  }

  /**
   * Logout action
   */
  async logout() {
    await this.page.getByRole(this.selectors.logoutLink.role, { name: this.selectors.logoutLink.name }).click();
  }

  async verifyUsersLinkVisible() {
    await expect(this.page.getByRole('link', { name: 'Users' })).toBeVisible();
  }

  /**
   * Verify login page is displayed
   */
  async verifyLoginPage() {
    await expect(this.page.getByRole(this.selectors.loginPageHeading.role, { name: this.selectors.loginPageHeading.name })).toBeVisible();
  }
}

module.exports = UsersPage;
