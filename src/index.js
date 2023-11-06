const express = require('express');
const morgan = require('morgan');
const path = require('path');


//inits
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//global vars
app.use((req, res, next) => {

  next();
});

//routes
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use('/chat/', require('./routes/chat'));
app.use('/link/', require('./routes/link'));

//public
app.use(express.static(path.join(__dirname, 'views')));

//app start
app.listen(app.get('port'), () => {
  console.log('Server iniciado', app.get('port'));
});