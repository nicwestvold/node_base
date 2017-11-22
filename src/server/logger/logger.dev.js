import winston from 'winston';
import loggerWrapper from './wrapper';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.simple(),
  transports: [new winston.transports.Console()],
});

export default loggerWrapper(logger);
