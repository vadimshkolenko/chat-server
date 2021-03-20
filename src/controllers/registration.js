const {v4: uuid} = require('uuid');
const User = require('../models/User');

module.exports.register = async (ctx) => {
  const {email, password, username} = ctx.request.body;
  const verificationToken = uuid();

  const user = new User({email, username, verificationToken});
  await user.setPassword(password);
  await user.save();

  ctx.body = {status: 'ok'};
}
