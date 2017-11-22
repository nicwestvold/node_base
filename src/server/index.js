// @flow

import R from 'ramda';
import path from 'path';
import express from 'express';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import exphbs from 'express-handlebars';

import config, { getConfigForClient } from './config';
import logger from './logger';

const { assetsDir, publicDir, viewsDir } = require('../../config/paths');

const app = express();

// if (config.isDevelopment()) {
//   var webpack = require('webpack');
//   var devMiddleware = require('webpack-dev-middleware');
//   var hotMiddleware = require('webpack-hot-middleware');
//   var webpackConfig = require('../../config/webpack.config');

//   var compiler = webpack(webpackConfig);
//   var webpackDevMiddleware = devMiddleware(compiler, {
//     // publicPath: webpackConfig.output.publicPath,
//     publicPath: '/js',
//     contentBase: 'src',
//     stats: {
//       colors: true,
//       hash: false,
//       timings: true,
//       chunks: false,
//       chunkModules: false,
//       modules: false,
//     },
//   });
//   var webpackHotMiddleware = hotMiddleware(compiler);
//   // convert to koaMiddleware!
//   app.use(webpackDevMiddleware);
//   app.use(webpackHotMiddleware);
// }

// view engine setup
app.set('views', viewsDir);
// app.set('view engine', 'hbs');
app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'layout', layoutsDir: viewsDir }));
app.set('view engine', '.hbs');

// const router = new Router();
const port = config.port;

app.use(favicon(path.join(assetsDir, 'images', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(publicDir));

// app.keys = [config.secretKeyBase];
// app.use(session(config.koaSessionConfig, app));
// app.use(bodyParser());
// app.use(
//   views(__dirname + '/views', {
//     extension: 'hbs',
//     map: { hbs: 'handlebars' },
//   }),
// );

app.get('/status', (req, res, next) => {
  res.json({ status: 'ok' });
});

/* GET home page. */
app.get('*', function(req, res, next) {
  res.render('index/index', { layout: false, title: 'hi', config: JSON.stringify(getConfigForClient(config)) });
});

app.use(function(req, res, next) {
  console.log('=============> req: ', req.url);

  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(port);
logger.info(`listening on port ${port}`);
