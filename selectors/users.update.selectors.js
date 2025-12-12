/**
 * Users Update Page Selectors
 * Contains selectors specific to updating user details
 */
module.exports = {
  // User row and action links
  userRow: (userId) => `#user_${userId}`,
  editLink: { role: 'link', name: 'Edit' },
  
  // Form fields
  firstNameField: { role: 'textbox', name: 'First Name*' },
  lastNameField: { role: 'textbox', name: 'Last Name*' },
  dateOfBirthField: { role: 'textbox', name: 'Date of Birth' },
  phoneNumberField: { role: 'textbox', name: 'Phone number' },
  positionField: { role: 'textbox' }, // dynamic - current position value as name
  rolesField: { role: 'textbox' }, // dynamic - current role value as name
  
  // Buttons
  updateUserButton: { role: 'button', name: 'Update User' },
  
  // Success messages
  userUpdatedText: 'User was successfully updated.',
  
  // User detail heading and fields
  userDetailHeading: { role: 'heading' }, // dynamic - name provided at runtime
  dateOfBirthRowHeader: { role: 'rowheader', name: 'Date Of Birth' },
  dateOfBirthCell: { role: 'cell' }, // dynamic - partial name match at runtime
  positionRowHeader: { role: 'rowheader', name: 'Position' },
  positionCell: { role: 'cell' }, // dynamic - position value as name
  rolesRowHeader: { role: 'rowheader', name: 'Roles' },
  rolesCell: { role: 'cell' }, // dynamic - role value as name, use .first() if multiple
  phoneCell: { role: 'cell' },
};
