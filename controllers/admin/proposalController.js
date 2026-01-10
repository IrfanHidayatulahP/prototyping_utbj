// controllers/admin/proposalController.js

// Import Model
const Proposal = require('../../models/proposal');
const Reviewer = require('../../models/reviewer');

// In-memory list simple untuk menandai gelombang yang sudah dinilai
// Bentuk key: "<tahun>-<gelombang-slug>"
let completedAssessments = [];

// Helper: buat slug dari nama (konsisten dengan view)
function slugify(name = '') {
    return name.toString().trim().replace(/\s+/g, '-').toLowerCase();
}

function parseRupiahToNumber(rpString) {
    if (!rpString) return 0;
    const onlyDigits = rpString.toString().replace(/[^0-9]/g, '');
    return onlyDigits ? parseInt(onlyDigits, 10) : 0;
}

// Helper: number => "Rp 7.000.000"
function formatNumberToRupiah(number) {
    if (number === undefined || number === null) return 'Rp 0';
    return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function parseRupiahToNumber(rpString) {
    if (!rpString) return 0;
    const onlyDigits = rpString.toString().replace(/[^0-9]/g, '');
    return onlyDigits ? parseInt(onlyDigits, 10) : 0;
}

function formatNumberToRupiah(number) {
    if (number === undefined || number === null) return 'Rp 0';
    return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

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

// Detail per Tahun (menampilkan daftar gelombang untuk tahun)
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

// DETAIL GELOMBANG - tampilan daftar gelombang (dengan status per-gelombang)
exports.waveDetail = (req, res) => {
    const tahun = req.params.tahun;
    // NOTE: kami mengabaikan req.params.gelombang untuk halaman ringkasan gelombang ini,
    // karena template menampilkan semua gelombang di tahun tersebut.
    const dataDetail = Proposal.getWavesByYear(tahun);

    // buat set dari completedAssessments untuk lookup cepat
    const assessedSet = new Set(completedAssessments);

    // map setiap item gelombang untuk menambahkan slug dan flag isAssessed
    const detailList = dataDetail.map(item => {
        const slug = slugify(item.nama);
        const uniqueKey = `${tahun}-${slug}`;
        return {
            ...item,
            slug,
            isAssessed: assessedSet.has(uniqueKey)
        };
    });

    res.render('admin/kelola_proposal/detail_proposal', {
        title: `Gelombang Proposal ${tahun}`,
        user: req.session.user,
        active: 'proposal',
        tahun: tahun,
        // gelombangNama left blank here because page shows multiple gelombangs
        gelombangNama: '',
        detailList: detailList,
        // tidak perlu hasAssessment global lagi
    });
};

exports.createAssessment = (req, res) => {
    const tahun = req.params.tahun;
    const gelombang = req.params.gelombang; // ini adalah slug

    res.render('admin/kelola_proposal/tambah_penilaian_proposal', {
        title: 'Tambah Penilaian',
        user: req.session.user,
        active: 'proposal',
        tahun: tahun,
        gelombang: gelombang
    });
};

// Simpan Penilaian
exports.storeAssessment = (req, res) => {
    const { tahun, gelombang } = req.params; // gelombang = slug
    const dataPenilaian = req.body;

    console.log("=== DATA PENILAIAN DISIMPAN ===");
    console.log(dataPenilaian);

    // 1. TANDAI BAHWA GELOMBANG INI SUDAH DINILAI
    const uniqueKey = `${tahun}-${gelombang}`;
    if (!completedAssessments.includes(uniqueKey)) {
        completedAssessments.push(uniqueKey);
    }

    // 2. Redirect kembali ke halaman detail gelombang (tahun)
    res.redirect(`/admin/proposal/detail/${tahun}`);
};

// Menampilkan List Proposal dalam Gelombang
// route: /detail/:tahun/:gelombang/list
exports.listProposals = (req, res) => {
    const { tahun, gelombang } = req.params;

    // Ambil filter dari URL, jika kosong default ke 'Dasar'
    const currentSkema = req.query.skema || 'Dasar';

    // Ambil data proposal dari model (berdasarkan skema)
    const dataProposal = Proposal.getProposalsByWave(tahun, gelombang, currentSkema);

    // Ambil data semua reviewer untuk dropdown
    const allReviewers = Reviewer.getAllReviewers();

    // Ambil totals (opsional) — jika sudah Anda tambahkan di model
    let totalsBySkema = {};
    let currentSkemaTotal = { formatted: 'Rp 0', total: 0 };
    if (typeof Proposal.getTotalsPerSkema === 'function') {
        totalsBySkema = Proposal.getTotalsPerSkema();
        currentSkemaTotal = Proposal.getTotalBySkema(currentSkema);
    }

    res.render('admin/kelola_proposal/list_proposal', {
        title: 'Daftar Proposal',
        user: req.session.user,
        active: 'proposal',
        tahun: tahun,
        gelombang: gelombang,
        proposalList: dataProposal,
        reviewerList: allReviewers,
        currentSkema: currentSkema,
        totalsBySkema,
        currentSkemaTotal
    });
};

// NEW: tampilkan halaman detail 1 proposal (sudah ada sebelumnya)
exports.proposalDetail = (req, res) => {
    const { tahun, gelombang, id } = req.params;

    // ambil proposal
    const proposal = Proposal.findById(id);
    if (!proposal) {
        return res.status(404).render('errors/404', { message: 'Proposal tidak ditemukan' });
    }

    // ambil pagu gelombang (harus ada di model)
    let paguString = 'Rp 0';
    try {
        if (typeof Proposal.getPagu === 'function') {
            paguString = Proposal.getPagu(tahun, gelombang) || 'Rp 0';
        }
    } catch (err) {
        console.error('Error saat ambil pagu:', err);
    }

    const paguNumber = parseRupiahToNumber(paguString);

    const existingReview = {
        rekomendasi: 'Diterima',
        nilai_akhir: 85,
        kriteria: {
            kriteria1: 80,
            kriteria2: 90,
            kriteria3: 85
        },
        catatan: 'Proposal dinilai layak dan sesuai skema.',
        reviewer: 'Dr. Ahmad Fauzi, M.Kom',
        tanggal: new Date()
    };

    // Render view dengan data pagu tersedia
    res.render('admin/kelola_proposal/detail_proposal_item', {
        title: `Detail Proposal - ${proposal.judul}`,
        user: req.session.user,
        tahun,
        gelombang,
        proposal,
        paguString,
        paguNumber,
        existingReview,
        active: 'proposal',
        message: null,
        error: null
    });
};

// POST: update status & (otomatis) dana_approved
exports.updateProposalStatus = (req, res) => {
    const { tahun, gelombang, id } = req.params;
    const { status, note } = req.body || {};

    const proposal = Proposal.findById(id);
    if (!proposal) {
        return res.status(404).render('errors/404', { message: 'Proposal tidak ditemukan' });
    }

    // ambil pagu gelombang dari model
    let paguString = 'Rp 0';
    if (typeof Proposal.getPagu === 'function') {
        paguString = Proposal.getPagu(tahun, gelombang) || 'Rp 0';
    }
    const paguNumber = parseRupiahToNumber(paguString);

    // dana usulan proposal (konversi)
    const danaUsulanNumber = parseRupiahToNumber(proposal.dana);

    // Validasi sederhana: jika status undefined atau kosong, tolak
    if (!status) {
        return res.render('admin/kelola_proposal/detail_proposal_item', {
            title: `Detail Proposal - ${proposal.judul}`,
            user: req.session.user,
            tahun,
            gelombang,
            proposal,
            paguString,
            paguNumber,
            existingReview: Proposal.getReviewByProposalId(id),
            active: 'proposal',
            message: null,
            error: 'Status tidak dikirim. Silakan pilih status.'
        });
    }

    // Jika diterima, otomatis set dana disetujui = dana usulan
    let danaApprovedNumber = 0;
    if (status === 'Diterima') {
        danaApprovedNumber = danaUsulanNumber;

        // Validasi pagu: dana yang disetujui tidak boleh melebihi pagu
        if (danaApprovedNumber > paguNumber) {
            // render kembali dengan pesan error (jangan redirect)
            return res.render('admin/kelola_proposal/detail_proposal_item', {
                title: `Detail Proposal - ${proposal.judul}`,
                user: req.session.user,
                tahun,
                gelombang,
                proposal,
                paguString,
                paguNumber,
                existingReview: Proposal.getReviewByProposalId(id),
                active: 'proposal',
                message: null,
                error: `Dana usulan (${proposal.dana}) melebihi pagu gelombang (${paguString}).`
            });
        }
    }

    // Jika status bukan 'Diterima', set dana_approved ke 'Rp 0' (atau biarkan null jika Anda mau)
    const danaApprovedFormatted = status === 'Diterima'
        ? formatNumberToRupiah(danaApprovedNumber)
        : 'Rp 0';

    // Simpan di model (gunakan fungsi updateProposalStatus di model)
    if (typeof Proposal.updateProposalStatus === 'function') {
        const ok = Proposal.updateProposalStatus(id, {
            status,
            dana_approved: danaApprovedFormatted
        });

        if (!ok) {
            return res.status(500).render('admin/kelola_proposal/detail_proposal_item', {
                title: `Detail Proposal - ${proposal.judul}`,
                user: req.session.user,
                tahun,
                gelombang,
                proposal,
                paguString,
                paguNumber,
                existingReview: Proposal.getReviewByProposalId(id),
                active: 'proposal',
                message: null,
                error: 'Gagal menyimpan perubahan. Coba lagi.'
            });
        }
    }

    // Simpan juga ringkasan review/note jika fungsi tersedia
    if (typeof Proposal.saveReview === 'function') {
        Proposal.saveReview(id, {
            status,
            dana_approved: danaApprovedFormatted,
            note: note || '',
            updatedAt: new Date()
        });
    }

    // Redirect kembali ke halaman detail (menampilkan pagu)
    return res.redirect(`/admin/proposal/detail/${tahun}/${gelombang}/proposal/${id}`);
};
