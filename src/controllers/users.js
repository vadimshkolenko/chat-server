const User = require('../models/User');
const mapUsers = require('../mappers/users');

module.exports.users = async (ctx) => {
  const users = await User.find({});
  ctx.body = {users: users.map(mapUsers)};
}
