// middleware/requireAuth.js
module.exports = function requireAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        req.flash('error', 'Silakan masuk terlebih dahulu');
        return res.redirect('/login');
    }
    next();
};
