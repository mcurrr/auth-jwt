const Koa = require('koa');
const serve = require('koa-static');
const logger = require('koa-morgan');
const helmet = require('koa-helmet');
const env = require('dotenv');
const path = require('path');

const router = require('./router');

env.config();

const port = process.env.PORT;
const server = new Koa();
const staticPath = path.join(__dirname, '..', 'build');

server
  .use(helmet())
  .use(logger('tiny'))
  .use(serve(staticPath))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, () => {
    console.log(`Auth is good to go on port ${port}`)
  });
