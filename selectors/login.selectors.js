/**
 * Login Page Selectors
 * Contains all selectors used in the login page
 */

module.exports = {
  // Input fields
  emailInput: { role: 'textbox', name: 'Email*' },
  passwordInput: { role: 'textbox', name: 'Password*' },
  
  // Buttons
  loginButton: { role: 'button', name: 'Log in' },
  logoutLink: { role: 'link', name: 'Logout' },
  passwordVisibilityToggle: { selector: 'i' },
  forgotPasswordLink: { role: 'link', name: 'Forgot your password?' },
  resetPasswordButton: { role: 'button', name: 'Reset My Password' },
  rememberMeCheckbox: { role: 'checkbox', name: 'Remember me' },
  usersLink: { role: 'link', name: 'Users' },
  usersHeading: { role: 'heading', name: 'Users' },
  usersCollectionSelect: { locator: '#collection_selection' },
  newUserLink: { role: 'link', name: 'New User' },
  usersFiltersText: 'Filters KeywordNameRoleAny',
  
  // Messages
  invalidCredentialsText: 'Invalid Email or password.',
  signedInSuccessText: 'Signed in successfully.',
  blankErrorText: { exactText: "can't be blank" },
  emailBlankText: "Email can't be blank",
  errorHeadingText: '1 error prohibited this user',
  rememberMeText: 'Remember me',
  loginPageText: 'WEA Log in Email* Password*',
  
  // Page heading
  loginPageHeading: { role: 'heading', name: 'WEA Log in' },
  forgotPasswordHeading: { role: 'heading', name: 'WEA-WIN Forgot your password?' },
  dashboardHeading: { role: 'heading', name: 'Dashboard' }
};
