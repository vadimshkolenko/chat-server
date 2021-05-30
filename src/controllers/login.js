const {v4: uuid} = require('uuid');
const passport = require('../libs/passport');

module.exports.login = async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      ctx.status = 400;
      ctx.body = {error: info};
      return;
    }

    const token = await ctx.login(user);

    ctx.body = {token, id: user._id};
  })(ctx, next);
};
