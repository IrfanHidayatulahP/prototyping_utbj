const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

// Import Rute
const authRoutes = require('./routes/authRoutes');  
const proposalRoutes = require('./routes/reviewer/proposalRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Setup Session
app.use(session({
    secret: 'keyboard cat utbj secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 } // 1 jam
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user || null; 
    next();
});

app.use('/', authRoutes);
app.use('/reviewer', proposalRoutes);

app.listen(PORT, () => console.log(`Server berjalan pada http://localhost:${PORT}`));