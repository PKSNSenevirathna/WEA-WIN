/**
 * Users View Page Selectors
 * Contains selectors specific to viewing user details
 */
module.exports = {
  // User row and action links
  userRow: (userId) => `#user_${userId}`,
  viewUserLink: { role: 'link', name: 'View' },
  
  // User detail page
  userDetailHeading: { role: 'heading' }, // dynamic - name provided at runtime
  userWrapper: '#wrapper',
};
