require('dotenv').config();

/**
 * UserManager - Manages user credentials for parallel test execution
 * Maps project names to specific user credentials from environment variables
 * 
 * This allows different test groups to run in parallel with separate user accounts,
 * preventing session conflicts and authentication issues.
 */
class UserManager {
  /**
   * Get user credentials based on project name
   * @param {string} projectName - The name of the test project (login, group1, group2, group3)
   * @returns {{email: string, password: string}} User credentials object
   */
  static getCredentials(projectName) {
    // Map project names to environment variable prefixes
    const userMap = {
      'login': 'TEST_USER',
      'group1': 'TEST_USER_1',
      'group2': 'TEST_USER_2',
      'group3': 'TEST_USER_3'
    };

    // Get the environment variable prefix for this project
    const userPrefix = userMap[projectName] || 'TEST_USER';

    // Construct the environment variable names
    const emailKey = userPrefix === 'TEST_USER' ? `${userPrefix}_EMAIL` : `${userPrefix}_EMAIL`;
    const passwordKey = userPrefix === 'TEST_USER' ? `${userPrefix}_PASSWORD` : `${userPrefix}_PASSWORD`;

    // Retrieve credentials from environment
    const email = process.env[emailKey];
    const password = process.env[passwordKey];

    // Validate that credentials exist
    if (!email || !password) {
      throw new Error(
        `Missing credentials for project "${projectName}". ` +
        `Expected environment variables: ${emailKey}, ${passwordKey}`
      );
    }

    console.log(`[UserManager] Using credentials for project "${projectName}": ${email}`);

    return {
      email,
      password
    };
  }

  /**
   * Get all available users for debugging or setup purposes
   * @returns {Object} Object containing all user credentials
   */
  static getAllUsers() {
    return {
      testUser: {
        email: process.env.TEST_USER_EMAIL,
        password: process.env.TEST_USER_PASSWORD
      },
      testUser1: {
        email: process.env.TEST_USER_1_EMAIL,
        password: process.env.TEST_USER_1_PASSWORD
      },
      testUser2: {
        email: process.env.TEST_USER_2_EMAIL,
        password: process.env.TEST_USER_2_PASSWORD
      },
      testUser3: {
        email: process.env.TEST_USER_3_EMAIL,
        password: process.env.TEST_USER_3_PASSWORD
      }
    };
  }
}

module.exports = UserManager;
