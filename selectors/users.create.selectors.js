/**
 * Users Create Page Selectors
 * Contains selectors specific to the user creation flow.
 */
module.exports = {
  // Navigation
  newUserLink: { role: 'link', name: 'New User' },
  // Headings
  newUserHeading: { role: 'heading', name: 'New User' },

  // Form fields
  emailField: { role: 'textbox', name: 'Personal E-Mail (Non-Work)*' },
  passwordField: { role: 'textbox', name: 'Password*' },
  passwordConfirmationField: { role: 'textbox', name: 'Password Confirmation*' },
  firstNameField: { role: 'textbox', name: 'First Name*' },
  lastNameField: { role: 'textbox', name: 'Last Name*' },
  phoneNumberField: { role: 'textbox', name: 'Phone number' },
  dateOfBirthField: { role: 'textbox', name: 'Date of Birth' },

  // Dropdowns used in creation
  schoolDropdown: '#user_school_id_input',
  localAssociationDropdown: '#user_local_association_id_input',
  workLocationDropdown: '#user_work_location_id_input',
  gradeLevelDropdown: '#user_grade_level_ids_input',
  uniservCouncilDropdown: '#user_uniserv_council_id_input',
  jobCategoryDropdown: 'group[name="Personal Information"] >> label[aria-label=""][exact=true]',
  roleDropdown: '#user_user_sub_roles_attributes_0_role_input',

  // Buttons
  createUserButton: { role: 'button', name: 'Create User' },
  // Error messages (validation)
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

  // Success
  userCreatedText: 'User was successfully created.',
  userWrapper: '#wrapper'
};

