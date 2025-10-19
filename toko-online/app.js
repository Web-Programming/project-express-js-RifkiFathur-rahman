var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var engine = require('ejs-blocks'); // menggunakan ejs-blocks untuk template

// Inisialisasi express
var app = express();

// Koneksi ke database MongoDB
require('./app_toko_online/models/db');

// ROUTER IMPORTS
var indexRouter = require('./app_toko_online/routes/index');
var usersRouter = require('./app_toko_online/routes/users');
var productRouter = require('./app_toko_online/routes/product');
var apiProductRouter = require('./app_toko_online/routes/api/product');
var apiUserRouter = require('./app_toko_online/routes/api/user');
var apiOrderRouter = require('./app_toko_online/routes/api/order');

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'app_toko_online', 'views'));
app.engine('ejs', engine); // daftar engine ejs-blocks
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serving Bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produk', productRouter);

// API Routes
app.use('/api/product', apiProductRouter);
app.use('/api/users', apiUserRouter);
app.use('/api/orders', apiOrderRouter);

// ERROR HANDLING

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
// Set locals, only providing error in development
res.locals.message = err.message;
res.locals.error = req.app.get('env') === 'development' ? err : {};

// Render the error page
res.status(err.status || 500);
res.render('error');
});

module.exports = app;
