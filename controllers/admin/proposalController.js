// Import Model
const Proposal = require('../../models/proposal'); 
let completedAssessments = [];

exports.index = (req, res) => {
    // Ambil data tahun dari model
    const listProposal = Proposal.getAllYears();

    res.render('admin/kelola_proposal/dashboard_kelola_proposal', {
        title: 'Kelola Proposal',
        user: req.session.user,
        proposalList: listProposal,
        active: 'proposal'
    });
};

// METHOD BARU: Detail Proposal per Tahun
exports.detail = (req, res) => {
    const tahun = req.params.tahun;
    const listGelombang = Proposal.getWavesByYear(tahun);

    res.render('admin/kelola_proposal/detail_TA_proposal', {
        title: `Proposal Tahun ${tahun}`,
        user: req.session.user,
        gelombangList: listGelombang,
        tahun: tahun,
        active: 'proposal'
    });
};

// METHOD BARU: Detail Level 3 (Isi Gelombang / Penilaian)
exports.waveDetail = (req, res) => {
    const { tahun, gelombang } = req.params;
    
    // Ambil data detail gelombang (array isi 1 item)
    const dataDetail = Proposal.getWaveDetail(tahun, gelombang);

    // Cek apakah gelombang ini sudah ada di daftar "completedAssessments"
    const uniqueKey = `${tahun}-${gelombang}`;
    const isAssessed = completedAssessments.includes(uniqueKey);

    res.render('admin/kelola_proposal/detail_proposal', {
        title: `Detail ${gelombang}`,
        user: req.session.user,
        active: 'proposal',
        tahun: tahun,
        gelombangNama: gelombang, // slug (gelombang-1)
        detailList: dataDetail,
        
        // Kirim status penilaian ke View
        hasAssessment: isAssessed 
    });
};

exports.createAssessment = (req, res) => {
    const tahun = req.params.tahun;
    const gelombang = req.params.gelombang;
    
    res.render('admin/kelola_proposal/tambah_penilaian_proposal', {
        title: 'Tambah Penilaian',
        user: req.session.user,
        active: 'proposal',
        tahun: tahun,
        gelombang: gelombang
    });
};

// Simpan Proposal
exports.storeAssessment = (req, res) => {
    const { tahun, gelombang } = req.params;
    const dataPenilaian = req.body;

    console.log("=== DATA PENILAIAN DISIMPAN ===");
    console.log(dataPenilaian);

    // 1. TANDAI BAHWA GELOMBANG INI SUDAH DINILAI
    const uniqueKey = `${tahun}-${gelombang}`;
    if (!completedAssessments.includes(uniqueKey)) {
        completedAssessments.push(uniqueKey);
    }

    // 2. Redirect kembali ke halaman detail
    res.redirect(`/admin/proposal/detail/${tahun}/${gelombang}`);
};

// Menampilkan List Proposal dalam Gelombang
exports.listProposals = (req, res) => {
    const { tahun, gelombang } = req.params;
    
    // 1. Ambil filter dari URL, jika kosong default ke 'Dasar'
    const currentSkema = req.query.skema || 'Dasar';

    // 2. Minta data ke Model sesuai skema yang dipilih
    const dataProposal = Proposal.getProposalsByWave(tahun, gelombang, currentSkema);

    res.render('admin/kelola_proposal/list_proposal', {
        title: 'Daftar Proposal',
        user: req.session.user,
        active: 'proposal',
        tahun: tahun,
        gelombang: gelombang,
        proposalList: dataProposal,
        
        // 3. Kirim variabel ini ke View agar tombol dropdown berubah teksnya
        currentSkema: currentSkema 
    });
};