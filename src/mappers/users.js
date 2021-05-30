module.exports = function mapUsers(users) {
  return {
    id: users._id,
    email: users.email,
    username: users.username,
  };
};
