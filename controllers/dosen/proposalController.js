// controllers/dosen/proposalController.js
const Proposal = require('../../models/proposal');

/* ===============================
   DASHBOARD DOSEN
   =============================== */
exports.dashboardDosen = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    if (user.role !== 'dosen') {
        return res.status(403).send('Akses ditolak');
    }

    const proposals = Proposal.proposals;

    const stats = {
        total: proposals.length,
        menunggu: proposals.filter(p => p.status === 'Menunggu Review').length,
        aktif: proposals.filter(p => p.status === 'Disetujui').length,
        selesai: proposals.filter(p => p.status === 'Selesai').length
    };

    return res.render('dosen/dashboard_dosen', {
        title: 'Dashboard Dosen',
        name: user.name,
        active: 'dashboard',
        stats
    });
};

/* ===============================
   LIST PROPOSAL DOSEN
   =============================== */
exports.listDosenProposal = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    if (user.role !== 'dosen') {
        return res.status(403).send('Akses ditolak');
    }

    // sementara: semua proposal (belum relasi dosen)
    const proposals = Proposal.proposals;

    return res.render('dosen/proposal_dosen', {
        title: 'Proposal Saya',
        name: user.name,
        active: 'proposal',
        proposals
    });
};

/* ===============================
   DETAIL PROPOSAL DOSEN
   =============================== */
exports.detailDosenProposal = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    if (user.role !== 'dosen') {
        return res.status(403).send('Akses ditolak');
    }

    const proposal = Proposal.findById(req.params.id);

    if (!proposal) {
        return res.status(404).send('Proposal tidak ditemukan');
    }

    return res.render('dosen/proposal_detail', {
        title: 'Detail Proposal',
        name: user.name,
        active: 'proposal',
        proposal
    });
};

/* ===============================
   FORM AJUKAN PROPOSAL
   =============================== */
exports.formAjukanProposal = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    if (user.role !== 'dosen') {
        return res.status(403).send('Akses ditolak');
    }

    return res.render('dosen/ajukan_proposal', {
        title: 'Ajukan Proposal',
        name: user.name,
        active: 'ajukan'
    });
};

/* ===============================
   SUBMIT PROPOSAL (DUMMY)
   =============================== */
exports.submitProposal = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    if (user.role !== 'dosen') {
        return res.status(403).send('Akses ditolak');
    }

    const {
        judul,
        skema,
        bidang,
        dana,
        deskripsi,
        luaran
    } = req.body;

    const newProposal = {
        id: Proposal.proposals.length + 1,
        judul,
        peneliti: user.name,
        skema,
        bidang,
        dana: Number(dana),
        deskripsi,
        file: '/uploads/dummy.pdf',
        fileName: 'proposal.pdf',
        luaran,
        reviewer_id: 2,
        status: 'Menunggu Review'
    };

    Proposal.proposals.push(newProposal);

    return res.redirect('/dosen/proposal');
};
