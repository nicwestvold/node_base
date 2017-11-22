import config from '../config';

if (config.isProduction()) {
  module.exports = require('./logger.prod');
} else {
  module.exports = require('./logger.dev');
}
