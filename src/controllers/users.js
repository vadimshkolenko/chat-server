const User = require('../models/User');
const mapUsers = require('../mappers/users');

module.exports.users = async (ctx) => {
  const {page, pageSize} = ctx.request.query

  const users = await User
    .find()
    .limit(+pageSize)
    .skip((page - 1) * +pageSize);
  ctx.body = {users: users.map(mapUsers)};
}
