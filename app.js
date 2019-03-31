const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
require('./config/passport')(passport);
var path = require("path");
var grid = require("gridfs-stream");
var fs = require("fs");




mongoose.Promise = global.Promise;
mongoose.connect(config.database);


const app = express();
let Article = require('./models/article');
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'pug');
app.use(express.static('resources'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

app.get('/', function(req, res){
  Article.find({}, function(err, articles){
    if(err){
      console.log(err);
    } else {
      res.render('index', {
        title:'Articles',
        articles: articles
      });
    }
  });


});

let articles = require('./routes/articles');
let users = require('./routes/users');
let about = require('./routes/abouts');
let find_article = require('./routes/find');
app.use('/articles', articles);
app.use('/users', users);
app.use('/about', about);
app.use('/find', find_article);

app.listen(8080, function(){
  console.log('Server start');
});
