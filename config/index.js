require('dotenv').config();

const DEFAULT_PORT = 3030;

const host = process.env.HOST || 'localhost';
const env = process.env.NODE_ENV || 'development';
const port = parseInt(process.env.PORT, 10) || DEFAULT_PORT;
const paths = require('./paths');

const config = {
  host,
  port,
  env,
  paths,
  isProduction,
  isDevelopment,
};

module.exports = config;

function isProduction() {
  return env === 'production';
}
function isDevelopment() {
  return env === 'development';
}
