// controllers/proposalController.js
const fs = require('fs');
const path = require('path');
const Proposal = require('../../models/proposal');

exports.listReviewerProposal = (req, res) => {
    const user = req.session && req.session.user;

    // 1. Keamanan: Cek login dan role
    if (!user) return res.redirect('/login');
    if (user.role !== 'reviewer') return res.status(403).send('Akses ditolak');

    // 2. Ambil parameter filter dari query string (?skema=...)
    const skemaFilter = req.query.skema || 'Dasar';

    let proposals;

    // 3. Logika Filter
    if (skemaFilter === 'Prodi') {
        // Jika filter "Prodi", ambil data statistik prodi dari model
        proposals = Proposal.getProposalsByWave(null, null, 'Prodi');
    } else {
        // Ambil proposal yang ditugaskan ke reviewer ini
        const allReviewerProposals = Proposal.findByReviewer(user.id);

        // Filter hasil berdasarkan skema yang dipilih (Dasar, Terapan, atau Pengembangan)
        proposals = allReviewerProposals.filter(p => p.skema === skemaFilter);
    }

    // 4. Render ke EJS
    return res.render('reviewer/proposal/proposal_reviewer', {
        title: 'Proposal Reviewer',
        name: user.name,
        active: 'proposal',
        proposals: proposals,
        currentFilter: skemaFilter // Mengirimkan info filter aktif ke view
    });
};

exports.detailReviewerProposal = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    const proposal = Proposal.findById(req.params.id);

    if (!proposal || proposal.reviewer_id !== user.id) {
        return res.status(404).send('Proposal tidak ditemukan');
    }

    // AMBIL DATA REVIEW JIKA ADA
    const reviewResult = Proposal.getReviewByProposalId(req.params.id);

    return res.render('reviewer/proposal/proposal_detail', {
        title: 'Detail Proposal',
        name: user.name,
        active: 'proposal',
        proposal,
        review: reviewResult // Kirim data review ke view
    });
};

exports.renderReviewForm = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    const proposal = Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).send('Proposal tidak ditemukan');

    // Pastikan reviewer hanya bisa menilai proposal yang ditugaskan padanya
    if (proposal.reviewer_id !== user.id) {
        return res.status(403).send('Akses ditolak');
    }

    return res.render('reviewer/proposal/proposal_review_form', {
        title: 'Form Penilaian Proposal',
        name: user.name,
        active: 'proposal',
        proposal
    });
};

exports.submitReview = (req, res) => {
    const { kriteria1, kriteria2, kriteria3, catatan, rekomendasi } = req.body;

    const totalSkor = (Number(kriteria1) * 0.3) + (Number(kriteria2) * 0.4) + (Number(kriteria3) * 0.3);

    // SIMPAN KE MODEL
    Proposal.saveReview(req.params.id, {
        kriteria1: Number(kriteria1),
        kriteria2: Number(kriteria2),
        kriteria3: Number(kriteria3),
        totalSkor: totalSkor.toFixed(2),
        catatan,
        rekomendasi
    });

    // Redirect ke detail proposal tersebut untuk melihat hasilnya
    return res.redirect(`/reviewer/proposal/${req.params.id}?status=reviewed`);
};