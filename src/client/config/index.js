const appConfig = window.__appConfig__;

function isDevelopment() {
  return appConfig.env === 'development';
}
function isProduction() {
  return appConfig.env === 'production';
}

export default Object.assign({}, appConfig, {
  isDevelopment,
  isProduction,
});
