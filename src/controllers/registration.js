const {v4: uuid} = require('uuid');
const User = require('../models/User');
const {sendMail} = require('../libs/sendMail');

module.exports.register = async (ctx) => {
  const {email, password, username} = ctx.request.body;
  const verificationToken = uuid();

  const user = new User({email, username, verificationToken});
  await user.setPassword(password);
  await user.save();

  await sendMail({
    template: 'confirmation',
    locals: {token: verificationToken},
    to: email,
    subject: 'Подтвердите почту',
  });

  ctx.status = 200;
  ctx.body = {status: 'ok'};
}

module.exports.confirm = async (ctx) => {
  const {verificationToken} = ctx.request.body;

  const user = await User.findOneAndUpdate({verificationToken}, {$unset: {verificationToken}});

  if (user) {
    const token = await ctx.login(user)

    ctx.body = {token}
  } else {
    ctx.status = 400;
    ctx.body = {error: 'Ссылка подтверждения недействительна или устарела'};
  }
};
