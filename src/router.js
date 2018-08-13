const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const User = require('./user');
const Token = require('./token');

const router = new Router();

router.post('/', bodyParser(), async ctx => {
  ctx.status = 401;

  const isAuthorized = await User.isAuthorized(ctx.request.body);

  if (isAuthorized) {
    const tokens = await Token.generatePair(ctx.request.body.username);

    ctx.status = 200;
    ctx.body = tokens;
  }
});

router.get('/', async ctx => {
  ctx.status = 403;

  const { authorization } = ctx.headers;
  if (!authorization || !authorization.match(/^Bearer\s/)) return;

  const refreshToken = authorization.replace(/^Bearer\s/, '');
  const { username } = await Token.getPayload(refreshToken);
  const hasValidRefreshToken = await User.hasValidRefreshToken(refreshToken);

  if (hasValidRefreshToken) {
    const tokens = await Token.generatePair(username);

    ctx.status = 200;
    ctx.body = tokens;
  }
})

module.exports = router;
