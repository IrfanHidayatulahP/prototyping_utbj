// controllers/authController.js (tambahkan di atas file Anda yang sudah ada)
const { findByIdentifier, verifyPassword, createUser } = require('../models/users');

exports.showLogin = (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('login');
};

exports.postLogin = (req, res) => {
    const { identifier, password, role } = req.body;
    const user = findByIdentifier(identifier);
    if (!user) {
        req.flash('error', 'Akun tidak ditemukan');
        return res.redirect('/login');
    }
    if (!verifyPassword(user, password)) {
        req.flash('error', 'Kata sandi salah');
        return res.redirect('/login');
    }
    if (role && user.role !== role) {
        req.flash('error', 'Peran tidak sesuai');
        return res.redirect('/login');
    }
    req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role };
    req.flash('success', 'Berhasil masuk');
    res.redirect('/dashboard');
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        res.redirect('/login');
    });
};

// ==== REGISTER ====
exports.showRegister = (req, res) => {
    if (req.session.user) return res.redirect('/dashboard');
    res.render('register'); // buat view register.ejs
};

exports.postRegister = (req, res) => {
    const { name, email, nidn, password, password_confirm, role } = req.body;

    // validasi sederhana
    if (!name || !email || !password || !password_confirm) {
        req.flash('error', 'Harap isi semua kolom yang diperlukan');
        return res.redirect('/register');
    }
    if (password !== password_confirm) {
        req.flash('error', 'Konfirmasi kata sandi tidak cocok');
        return res.redirect('/register');
    }

    // cek unik (email / nidn)
    if (findByIdentifier(email) || (nidn && findByIdentifier(nidn))) {
        req.flash('error', 'Email atau NIDN sudah terdaftar');
        return res.redirect('/register');
    }

    // buat user (models/users.createUser sudah meng-hash password)
    const newUser = createUser({
        name,
        email,
        nidn: nidn || null,
        password,
        role: role || 'dosen'
    });

    req.flash('success', `Akun berhasil dibuat untuk ${newUser.email}. Silakan login.`);
    return res.redirect('/login');
};
