// controllers/reviewer/proposalController.js
const path = require('path');
const fs = require('fs');

// dummy model
const Proposal = require('../../models/proposal');

exports.showProposalReviewer = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    // hanya reviewer
    if (user.role !== 'reviewer') {
        return res.status(403).send('Akses ditolak');
    }

    // ambil proposal berdasarkan reviewer_id
    const proposals = Proposal.findByReviewer(user.id);

    const viewName = 'reviewer/proposal/proposal_reviewer';

    const data = {
        title: 'Daftar Proposal',
        name: user.name,
        proposals,
        total: proposals.length,
        active: 'proposal' // ⬅️ untuk sidebar aktif
    };

    // optional debug (konsisten dengan dashboardController)
    const fullViewPath = path.join(__dirname, '..', '..', 'views', `${viewName}.ejs`);
    if (!fs.existsSync(fullViewPath)) {
        console.error(`View file not found: ${fullViewPath}`);
        return res.status(500).send(`View not found: ${viewName}`);
    }

    return res.render(viewName, data);
};

exports.showProposalDetail = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    if (user.role !== 'reviewer') {
        return res.status(403).send('Akses ditolak');
    }

    const proposalId = req.params.id;
    const proposal = Proposal.findById(proposalId);

    if (!proposal) {
        return res.status(404).send('Proposal tidak ditemukan');
    }

    // pastikan reviewer hanya bisa lihat proposal miliknya
    if (proposal.reviewer_id !== user.id) {
        return res.status(403).send('Anda tidak berhak mengakses proposal ini');
    }

    const viewName = 'reviewer/proposal/proposal_detail';

    const data = {
        title: 'Detail Proposal',
        name: user.name,
        proposal,
        active: 'proposal'
    };

    const fullViewPath = path.join(__dirname, '..', '..', 'views', `${viewName}.ejs`);
    if (!fs.existsSync(fullViewPath)) {
        console.error(`View file not found: ${fullViewPath}`);
        return res.status(500).send(`View not found: ${viewName}`);
    }

    return res.render(viewName, data);
};
