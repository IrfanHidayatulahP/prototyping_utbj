const Gelombang = require('../../models/gelombang');

exports.index = (req, res) => {
    const dataGelombang = Gelombang.getAll();

    res.render('admin/kelola_gelombang/dashboard_kelola_gelombang', {
        title: 'Manajemen Gelombang',
        user: req.session.user,
        active: 'gelombang',
        // Pastikan di view dashboard Anda loop-nya menggunakan nama variabel ini
        tahunList: dataGelombang 
    });
};

// --- METHOD BARU: STORE ---
exports.store = (req, res) => {
    // 1. Ambil data dari form (name="nama_tahun" atau sesuai di view)
    const { nama_tahun } = req.body;

    // 2. Simpan ke model
    Gelombang.addTahun(nama_tahun);

    // 3. Redirect kembali ke halaman list (Dashboard Gelombang)
    // Data baru otomatis muncul karena array di model sudah bertambah
    res.redirect('/admin/gelombang');
};

exports.create = (req, res) => {
    res.render('admin/kelola_gelombang/tambah_tahun', {
        title: 'Tambah Tahun Akademik',
        user: req.session.user,
        active: 'gelombang'
    });
};

exports.detail = (req, res) => {
    const tahun = req.params.tahun; // Ambil angka 2025 dari URL
    const listGelombang = Gelombang.getByYear(tahun);

    res.render('admin/kelola_gelombang/detail_TA_gelombang', {
        title: `Gelombang Tahun ${tahun}`,
        user: req.session.user,
        gelombangList: listGelombang,
        tahun: tahun,
        active: 'gelombang'
    });
};

// Tambah Gelombang
exports.createGelombang = (req, res) => {
    const tahun = req.params.tahun; 
    
    res.render('admin/kelola_gelombang/tambah_gelombang', {
        title: 'Tambah Gelombang',
        user: req.session.user,
        active: 'gelombang',
        tahun: tahun
    });
};