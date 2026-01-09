exports.index = (req, res) => { res.send('Halaman ini belum dibuat'); };const Reviewer = require('../../models/reviewer');

exports.index = (req, res) => {
    const dataReviewer = Reviewer.getAllReviewers();

    res.render('admin/kelola_reviewer/dashboard_kelola_reviewer', {
        title: 'Kelola Reviewer',
        user: req.session.user,
        active: 'reviewer', // PENTING: Ini agar sidebar 'Kelola Reviewer' menyala
        reviewerList: dataReviewer
    });
};