const Penelitian = require('../../models/penelitian');
const Reviewer = require('../../models/reviewer');
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

    // 2. Ambil filter dari URL, default 'Dasar'
    const currentSkema = req.query.skema || 'Dasar';

    // 3. Ambil data dari Model
    const dataList = Penelitian.getPenelitianList(tahun, gelombang, currentSkema);

    // 4. Ambil data Reviewer untuk dropdown
    const allReviewers = Reviewer.getAllReviewers();

    res.render('admin/kelola_penelitian/list_penelitian', {
        title: 'Daftar Penelitian',
        user: req.session.user,
        active: 'penelitian',
        tahun: tahun,
        gelombang: gelombang,
        penelitianList: dataList,
        reviewerList: allReviewers, // 5. Kirim data reviewer ke view
        currentSkema: currentSkema
    });
};

exports.showProposalDetail = (req, res) => {
    const { tahun, gelombang, id } = req.params;

    const proposal = Penelitian.findById(id);
    if (!proposal) {
        return res.status(404).render('errors/404', {
            message: 'Proposal tidak ditemukan'
        });
    }

    // Ambil hasil review (jika ada)
    const review = Penelitian.getReviewByPenelitianId(id);

    // === LOGIKA OTOMATIS STATUS ===
    const hasLaporan =
        (proposal.laporan_kemajuan && proposal.laporan_kemajuan.trim() !== '') ||
        (proposal.laporan_akhir && proposal.laporan_akhir.trim() !== '');

    const hasLuaran =
        proposal.luaran && proposal.luaran.trim() !== '';

    let autoStatus = proposal.status;

    // 3. Jika tidak ada laporan & luaran → tidak selesai
    if (!hasLaporan && !hasLuaran) {
        autoStatus = 'tidak_selesai';
    }

    // 4. Jika tidak ada luaran → tidak bisa selesai tuntas
    if (!hasLuaran && autoStatus === 'selesai_tuntas') {
        autoStatus = 'selesai_tidak_tuntas';
    }

    res.render('admin/kelola_penelitian/detail_penelitian_item', {
        title: `Detail Proposal - ${proposal.judul}`,
        user: req.session.user,
        active: 'penelitian',
        tahun,
        gelombangNama: gelombang,
        proposal: { ...proposal, status: autoStatus },
        review
    });
};

exports.updateProposalStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            success: false,
            message: 'Status tidak dikirim. Pastikan request mengirimkan field "status".'
        });
    }

    const proposal = Penelitian.findById(id);
    if (!proposal) {
        return res.status(404).json({
            success: false,
            message: 'Proposal tidak ditemukan'
        });
    }

    const hasLaporan =
        (proposal.laporan_kemajuan && proposal.laporan_kemajuan.trim() !== '') ||
        (proposal.laporan_akhir && proposal.laporan_akhir.trim() !== '');

    const hasLuaran =
        proposal.luaran && proposal.luaran.trim() !== '';

    // 3. Jika tidak ada laporan & luaran → tidak selesai
    if (!hasLaporan && !hasLuaran) {
        return res.status(400).json({
            success: false,
            message: 'Tidak ada laporan dan luaran. Status otomatis: Tidak Selesai'
        });
    }

    // 4. Jika tidak ada luaran → tidak boleh selesai tuntas
    if (status === 'selesai_tuntas' && !hasLuaran) {
        return res.status(400).json({
            success: false,
            message: 'Tidak bisa Selesai Tuntas karena tidak ada luaran'
        });
    }

    const ok = Penelitian.updateStatusById(id, status);
    if (!ok) {
        return res.status(500).json({
            success: false,
            message: 'Gagal menyimpan status'
        });
    }

    res.json({
        success: true,
        message: 'Status penelitian berhasil diperbarui'
    });
};
