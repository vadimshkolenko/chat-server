const Koa = require('koa');
const Router = require('koa-router');
const handleMongooseValidationError = require('./libs/validationErrors');
const {register} = require('./controllers/registration');

const app = new Koa();

app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
})

const router = new Router({prefix: '/api'})

router.post('/register', handleMongooseValidationError, register)

app.use(router.routes())

module.exports = app;
