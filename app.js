var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var vigRouter = require('./routes/vigilante');
var mariaRouter = require('./routes/maria');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('./public/views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/css", express.static(__dirname+"/public/css"));
app.use("/Floppy", express.static(__dirname+"/Floppy"));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/vig', vigRouter);
app.use('/maria', mariaRouter);
// catch 404 and forward to error handler

/*app.use(function(req, res, next) {
  next(createError(404));
});*/

app.use(function(req, res, next) {
	if(res.status(404)){
		res.sendFile("404.html", {root: path.join(__dirname, "./public/html")});
	}
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
