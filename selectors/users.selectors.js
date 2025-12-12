/**
 * Users Page Selectors
 * Contains all selectors used in the users management pages
 */

module.exports = {
  // Navigation
  usersLink: { role: 'link', name: 'Users' },
  newUserLink: { role: 'link', name: 'New User' },
  deleteUserLink: { role: 'link', name: 'Delete User' },
  deleteLink: { role: 'link', name: 'Delete' },
  logoutLink: { role: 'link', name: 'Logout' },
  systemAdminLink: { role: 'link', name: 'System Admin' },
  adminLink: { role: 'link', name: 'Admin 26' },
  instructorLink: { role: 'link', name: 'Instructor' },
  clockHourCommitteeLink: { role: 'link', name: 'Clock Hour Committee' },
  rolesGroup: { role: 'group', name: 'Roles' },
  addRoleLink: { role: 'link', name: 'Add a Role' },
  removeRoleLink: { role: 'link', name: 'Remove' },
  
  // Page headings
  dashboardHeading: { role: 'heading', name: 'Dashboard' },
  usersHeading: { role: 'heading', name: 'Users' },
  newUserHeading: { role: 'heading', name: 'New User' },
  loginPageHeading: { role: 'heading', name: 'WEA Log in' },
  scopeHeading: { role: 'heading', name: 'Scope:' },
  
  // Form fields
  emailField: { role: 'textbox', name: 'Personal E-Mail (Non-Work)*' },
  passwordField: { role: 'textbox', name: 'Password*' },
  passwordConfirmationField: { role: 'textbox', name: 'Password Confirmation*' },
  firstNameField: { role: 'textbox', name: 'First Name*' },
  lastNameField: { role: 'textbox', name: 'Last Name*' },
  phoneNumberField: { role: 'textbox', name: 'Phone number' },
  dateOfBirthField: { role: 'textbox', name: 'Date of Birth' },
  imsIdField: { role: 'textbox', name: 'IMS ID' },
  
  // Dropdowns and selects
  schoolDropdown: '#user_school_id_input',
  schoolDropdownArrow: '#user_school_id_input >> label[aria-label=""][exact=true]',
  localAssociationDropdown: '#user_local_association_id_input',
  localAssociationDropdownArrow: '#user_local_association_id_input >> label[aria-label=""][exact=true]',
  workLocationDropdown: '#user_work_location_id_input',
  workLocationDropdownArrow: '#user_work_location_id_input >> label[aria-label=""][exact=true]',
  gradeLevelDropdown: '#user_grade_level_ids_input',
  gradeLevelDropdownCombobox: '#user_grade_level_ids_input >> role=combobox',
  gradeLevelList: 'list[hasText=/^$/]',
  uniservCouncilDropdown: '#user_uniserv_council_id_input',
  uniservCouncilDropdownArrow: '#user_uniserv_council_id_input >> label[aria-label=""][exact=true]',
  jobCategoryDropdown: 'group[name="Personal Information"] >> label[aria-label=""][exact=true]',
  roleDropdown: '#user_user_sub_roles_attributes_0_role_input',
  roleDropdownArrow: '#user_user_sub_roles_attributes_0_role_input >> label[aria-label=""][exact=true]',
  statusDropdown: 'label[aria-label=""][exact=true]',
  
  // Buttons
  createUserButton: { role: 'button', name: 'Create User' },
  updateUserButton: { role: 'button', name: 'Update User' },
  
  // Error messages
  emailBlankError: "can't be blank and Email",
  passwordBlankError: "can't be blank",
  firstNameBlankError: "can't be blank",
  lastNameBlankError: "can't be blank",
  schoolBlankError: "can't be blank",
  localAssociationBlankError: "can't be blank",
  workLocationBlankError: "can't be blank",
  gradeLevelError: '#user_grade_level_ids_input > .inline-errors',
  uniservCouncilError: '#user_uniserv_council_id_input > .inline-errors',
  jobCategoryError: '#user_job_category_id_input > .inline-errors',
  roleError: '#user_user_sub_roles_attributes_0_role_input > .inline-errors',
  
  // Success messages
  userCreatedText: 'User was successfully created.',
  userUpdatedText: 'User was successfully updated.',
  searchStatusText: 'Search status: Scope: System',
  scopeCurrentText: 'Scope: System Admin Current',
  systemAdminText: 'System Admin',
  searchStatusAdminText: 'Search status: Scope: Admin',
  scopeAdminCurrentText: 'Scope: Admin Current filters',
  adminText: 'Admin',
  searchStatusScopeText: 'Search status: Scope:',
  scopeInstructorCurrentText: 'Scope: Instructor Current',
  instructorText: 'Instructor',
  searchStatusClockHourText: 'Search status: Scope: Clock',
  scopeClockHourCurrentText: 'Scope: Clock Hour Committee',
  clockHourCommitteeText: 'Clock Hour Committee',
  // Filters and collection
  nameField: { role: 'textbox', name: 'Name' },
  filterButton: { role: 'button', name: 'Filter' },
  clearFiltersLink: { role: 'link', name: 'Clear Filters' },
  collectionSelection: '#collection_selection',
  // User detail wrapper
  userWrapper: '#wrapper',
  // Edit user wrapper
  editUserWrapper: '#edit_user',
  
  // Specific user row
  // Active column and toggle helper
  activeColumn: { role: 'columnheader', name: 'Active' },
  toggleUserActiveLocator: (userId) => `#toggle-user-${userId}-active`,
  userRow: (userId) => `#user_${userId}`,
  userDeleteButton: (userId) => `#user_${userId} >> link[name="Delete"]`,
  
  // Breadcrumb navigation
  usersBreadcrumb: '#titlebar_left >> link[name="Users"]',
  
  // View user detail
  viewUserLink: { role: 'link', name: 'View' },
  traineeTest7Heading: { role: 'heading', name: 'Trainee Test7' }
};
