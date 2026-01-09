const Penelitian = require('../../models/penelitian');
let completedAssessments = [];

// Halaman Utama Dashboard Penelitian
exports.index = (req, res) => {
    
    // PERBAIKAN DI SINI:
    // Gunakan 'getAllYears()' sesuai dengan yang ada di model, bukan 'getAll()'
    const listTahun = Penelitian.getAllYears();

    res.render('admin/kelola_penelitian/dashboard_kelola_penelitian', {
        title: 'Kelola Penelitian',
        user: req.session.user,
        active: 'penelitian', 
        tahunList: listTahun
    });
};

// Detail per Tahun Akademik
exports.detail = (req, res) => {
    const tahun = req.params.tahun;
    const listGelombang = Penelitian.getWavesByYear(tahun);

    res.render('admin/kelola_penelitian/detail_TA_penelitian', {
        title: `Penelitian Tahun ${tahun}`,
        user: req.session.user,
        active: 'penelitian',
        tahun: tahun,
        gelombangList: listGelombang
    });
};

// Detail Gelombang
exports.waveDetail = (req, res) => {
    const { tahun, gelombang } = req.params;
    
    // Ambil data detail
    const dataDetail = Penelitian.getWaveDetail(tahun, gelombang);

    // CEK STATUS: Apakah gelombang ini sudah dinilai?
    const uniqueKey = `${tahun}-${gelombang}`;
    const isAssessed = completedAssessments.includes(uniqueKey);

    res.render('admin/kelola_penelitian/detail_penelitian', {
        title: `Detail ${gelombang}`,
        user: req.session.user,
        active: 'penelitian',
        tahun: tahun,
        gelombangNama: gelombang,
        detailList: dataDetail,
        
        // Kirim status ke View
        hasAssessment: isAssessed 
    });
};

// Tampilkan Form Tambah Penilaian
exports.createAssessment = (req, res) => {
    const { tahun, gelombang } = req.params;
    
    res.render('admin/kelola_penelitian/tambah_penilaian_penelitian', {
        title: 'Tambah Penilaian Penelitian',
        user: req.session.user,
        active: 'penelitian',
        tahun: tahun,
        gelombang: gelombang
    });
};

// Simpan Penilaian (POST)
exports.storeAssessment = (req, res) => {
    const { tahun, gelombang } = req.params;
    const dataPenilaian = req.body;

    console.log("=== DATA PENILAIAN PENELITIAN DISIMPAN ===");
    
    // 1. TANDAI BAHWA GELOMBANG INI SUDAH DINILAI
    const uniqueKey = `${tahun}-${gelombang}`;
    if (!completedAssessments.includes(uniqueKey)) {
        completedAssessments.push(uniqueKey);
    }

    // 2. Redirect kembali ke halaman detail
    res.redirect(`/admin/penelitian/detail/${tahun}/${gelombang}`);
};

// List Penelitian (Tabel Panjang dengan Filter)
exports.listPenelitian = (req, res) => {
    const { tahun, gelombang } = req.params;
    
    // 1. Ambil filter dari URL, default 'Dasar'
    const currentSkema = req.query.skema || 'Dasar';

    // 2. Ambil data dari Model
    const dataList = Penelitian.getPenelitianList(tahun, gelombang, currentSkema);

    res.render('admin/kelola_penelitian/list_penelitian', {
        title: 'Daftar Penelitian',
        user: req.session.user,
        active: 'penelitian',
        tahun: tahun,
        gelombang: gelombang,
        penelitianList: dataList, // Mengirim data ke view
        currentSkema: currentSkema
    });
};