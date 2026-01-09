// controllers/proposalController.js
const fs = require('fs');
const path = require('path');
const Proposal = require('../../models/proposal');

exports.listReviewerProposal = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    if (user.role !== 'reviewer') {
        return res.status(403).send('Akses ditolak');
    }

    const proposals = Proposal.findByReviewer(user.id);

    return res.render('reviewer/proposal/proposal_reviewer', {
        title: 'Proposal Reviewer',
        name: user.name,
        active: 'proposal',
        proposals
    });
};

exports.detailReviewerProposal = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    if (user.role !== 'reviewer') {
        return res.status(403).send('Akses ditolak');
    }

    const proposal = Proposal.findById(req.params.id);

    if (!proposal || proposal.reviewer_id !== user.id) {
        return res.status(404).send('Proposal tidak ditemukan');
    }

    return res.render('reviewer/proposal/proposal_detail', {
        title: 'Detail Proposal',
        name: user.name,
        active: 'proposal',
        proposal
    });
};
