const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');


// Import Rute
const authRoutes = require('./routes/authRoutes');  
const proposalRoutes = require('./routes/reviewer/proposalRoutes');
<<<<<<< HEAD
const dosenRoutes = require('./routes/dosen/dosenRoutes');
=======
const adminGelombangRoutes = require('./routes/admin/gelombangRoutes');
const adminProposalRoutes = require('./routes/admin/proposalRoutes');
const adminPenelitianRoutes = require('./routes/admin/penelitianRoutes');
const adminReviewerRoutes = require('./routes/admin/reviewerRoutes');
>>>>>>> b84df3a2a9f9150d9d7fc6f9ff67135bbc2c996b

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware setup
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    req.flash('error', 'Akses ditolak.');
    res.redirect('/login');
};
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
app.use('/dosen', dosenRoutes);

app.use('/admin/gelombang', isAdmin, adminGelombangRoutes);
app.use('/admin/proposal', isAdmin, adminProposalRoutes);
app.use('/admin/penelitian', isAdmin, adminPenelitianRoutes);
app.use('/admin/reviewer', isAdmin, adminReviewerRoutes);

app.listen(PORT, () => console.log(`Server berjalan pada http://localhost:${PORT}`));