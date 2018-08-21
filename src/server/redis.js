const Redis = require('redis');
const bluebird = require('bluebird');
const env = require('dotenv');

env.config();

bluebird.promisifyAll(Redis.RedisClient.prototype);
bluebird.promisifyAll(Redis.Multi.prototype);


const redis = Redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

module.exports = redis;
