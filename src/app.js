const Koa = require('koa');

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

app.use(async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = {data: 'test'};
})

module.exports = app;
