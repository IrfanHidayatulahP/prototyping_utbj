const express = require('express');
const router = express.Router();

// 1. Panggil "Otak" yang sudah dipecah-pecah
const gelombangController = require('../controllers/admin/gelombangController');
const proposalController = require('../controllers/admin/proposalController');
const penelitianController = require('../controllers/admin/penelitianController');
const reviewerController = require('../controllers/admin/reviewerController');

// 2. Pasang Satpam (Middleware)
const isAdmin = (req, res, next) => {
    if (req.session.user && req.session.user.role === 'admin') {
        return next();
    }
    req.flash('error', 'Akses ditolak.');
    res.redirect('/login');
};
router.use(isAdmin);

// 3. Arahkan URL ke "Otak" yang sesuai
router.get('/kelola-gelombang', gelombangController.index);
router.get('/kelola-proposal', proposalController.index);
router.get('/kelola-penelitian', penelitianController.index);
router.get('/kelola-reviewer', reviewerController.index);

module.exports = router;