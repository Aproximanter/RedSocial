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
var server = app.listen(app.get('port'), () => {
  console.log('Server iniciado', app.get('port'));
});

// SOCKET CHAT INITS
const io = require("socket.io")(server);
app.set('socketio', io);
const list_users = {};
//

//SOCKET CHAT CODE
io.on("connection", (socket) => {
  socket.on("register", (nickname) => {
    if (list_users[nickname]) {
      socket.emit("userExists");
      return;
    } else {
      list_users[nickname] = socket.id;
      socket.nickname = nickname;
      socket.emit("login");
      io.emit("activeSessions", list_users);
    }
  });

  socket.on("disconnect", () => {
    delete list_users[socket.nickname];
    io.emit("activeSessions", list_users);
  });

  socket.on("sendMessage", ({ message, image }) => {
    io.emit("sendMessage", { message, user: socket.nickname, image });
  });

  socket.on("sendMessagesPrivate", ({ message, image, selectUser }) => {
    if (list_users[selectUser]) {
      io.to(list_users[selectUser]).emit("sendMessage", {
        message,
        user: socket.nickname,
        image,
      });
      io.to(list_users[socket.nickname]).emit("sendMessage", {
        message,
        user: socket.nickname,
        image,
      });
    } else {
      alert("El usuario al que intentas enviar el mensaje no existe!");
    }
  });
});
