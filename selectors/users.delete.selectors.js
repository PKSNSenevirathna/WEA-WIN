/**
 * Users Delete Selectors
 * Contains selectors used for deleting users
 */
module.exports = {
  userRow: (userId) => `#user_${userId}`,
  deleteLink: { role: 'link', name: 'Delete' },
};
