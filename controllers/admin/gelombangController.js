exports.index = (req, res) => {
    res.render('admin/kelola_gelombang/dashboard_kelola_gelombang', {
        title: 'Manajemen Gelombang',
        user: req.session.user,     // Data user dari session (untuk Header/Sidebar)
        gelombangList: []           // Kita kirim list kosong dulu agar tidak error di EJS
    });
};