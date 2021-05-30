const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const dotenv = require('dotenv')
const { v4: uuid } = require('uuid');
const Session = require('./models/Session');
const handleMongooseValidationError = require('./middleware/validationErrors');
const {register, confirm} = require('./controllers/registration');
const {login} = require('./controllers/login');
const {users} = require('./controllers/users')

dotenv.config({path: '.env'})

const app = new Koa();

app.use(cors());
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

app.use((ctx, next) => {
  ctx.login = async function(user) {
    const token = uuid();
    await Session.create({token, user, lastVisit: new Date()});

    return token;
  };

  return next();
});

const router = new Router({prefix: '/api'})

router.post('/register', handleMongooseValidationError, register)
router.post('/confirm', handleMongooseValidationError, confirm)
router.post('/login', handleMongooseValidationError, login);
router.get('/users', handleMongooseValidationError, users)

app.use(router.routes())

module.exports = app;
