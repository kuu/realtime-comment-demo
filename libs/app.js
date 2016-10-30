const path = require('path');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swig = require('swig');

const app = express();
const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env === 'development';

// view engine setup
app.engine('html', swig.renderFile);
app.set('view cache', false);
swig.setDefaults({cache: false});
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'html');

// other middleware
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '../dist/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../dist'))); // Should be done by a reverse proxy

module.exports = app;
