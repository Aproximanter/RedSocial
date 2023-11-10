const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const passport = require('passport');

const { database } = require('./keys');

//inits
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//middleware
app.use(session({
  secret: 'sessionfelixmysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

//global vars
app.use((req, res, next) => {
  // TODO: user is always undefined, fix
  app.locals.user = req.user;
  next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/chat'));
app.use(require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/posts', require('./routes/posts'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//app start
app.listen(app.get('port'), () => {
  console.log('Server iniciado', app.get('port'));
});