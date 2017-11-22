import R from 'ramda';
import appConfig from '../../../config';

require('dotenv').config();

const secretKeyBase = process.env.SECRET_KEY_BASE;

const config = {
  koaSessionConfig: {
    key: process.env.KOA_SESSION_KEY || 'koa:sess',
    maxAge: 86400000, // maxAge of 1 day
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
  },
  secretKeyBase,
};

export default Object.assign({}, appConfig, config);

export function getConfigForClient(config) {
  const attrsForClient = ['env', 'host', 'port'];
  return R.pick(attrsForClient, config);
}
