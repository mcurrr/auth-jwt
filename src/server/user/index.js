const Joi = require('joi');
const schema = require('./schema');
const redis = require('../redis');
const Token = require('../token');

async function isAuthorized(request) {
  const { error, value } = Joi.validate(request, schema);

  if (error) return false;

  const providedPassword = value.password;
  const correctPassword = await redis.getAsync(value.username);

  return providedPassword == correctPassword;
}

async function hasValidRefreshToken(token) {
  const { username } = await Token.getPayload(token);
  const correctRefreshToken = await redis.getAsync(`${username}_refresh_token`);

  return correctRefreshToken == token;
}

module.exports = { isAuthorized, hasValidRefreshToken };
