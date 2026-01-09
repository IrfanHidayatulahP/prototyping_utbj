// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const dashboardController = require('../controllers/dashboardController');
const requireAuth = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
    res.redirect('/login');
});

router.get('/login', authController.showLogin);
router.post('/login', authController.postLogin);

router.get('/register', authController.showRegister);
router.post('/register', authController.postRegister);

router.get('/logout', authController.logout);

// Dashboard dispatcher — hanya untuk user yang sudah login
router.get('/dashboard', requireAuth, dashboardController.showDashboard);

module.exports = router;
