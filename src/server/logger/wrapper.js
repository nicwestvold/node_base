// @flow

function loggerWrapper(logger: Object): Logger {
  return {
    debug: (msg: string, obj?: Object) => {
      logger.log('debug', msg, obj);
    },
    info: (msg: string, obj?: Object) => {
      logger.log('info', msg, obj);
    },
    warn: (msg: string, obj?: Object) => {
      logger.log('warn', msg, obj);
    },
    error: (msg: string, obj?: Object) => {
      logger.log('error', msg, obj);
    },
  };
}

export default loggerWrapper;
