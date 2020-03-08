const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')
const indexRoutes = require('./routes/index.routes');
const notesRoutes = require('./routes/notes.routes');
const usersRoutes = require('./routes/users.routes');

const morgan = require('morgan');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
// Initializations
const app = express();
require('./config/passport')
// Settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get(`views`) + `/layouts`),
  partialsDir: path.join(app.get(`views`) + `/partials`),
  extname: '.hbs'
}))
app.set('view engine', '.hbs')
// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global variales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
})
// Routes
app.use(indexRoutes);
app.use(notesRoutes)
app.use(usersRoutes)

// Static Files
// app.set('views',path.join(__dirname,'wiews'));
app.use(express.static(path.join(__dirname, 'public')))
module.exports = app;

