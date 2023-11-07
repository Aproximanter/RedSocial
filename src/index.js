const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { engine } = require('express-handlebars');


//inits
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.engine('.hbs', engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./lib/handlebars')
}))
app.set('view engine', '.hbs');

//global vars
app.use((req, res, next) => {

  next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use(require('./routes/chat'));
app.use('/link', require('./routes/link'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//app start
app.listen(app.get('port'), () => {
  console.log('Server iniciado', app.get('port'));
});