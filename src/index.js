const Koa = require('koa');
const logger = require('koa-morgan');
const helmet = require('koa-helmet');
const env = require('dotenv');
const router = require('./router');

env.config();

const port = process.env.PORT;
const server = new Koa();

server
  .use(helmet())
  .use(logger('tiny'))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log('Auth is good to go')
  });
