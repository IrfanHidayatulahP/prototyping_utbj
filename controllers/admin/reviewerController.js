const Reviewer = require('../../models/reviewer');

exports.index = (req, res) => {
    const reviewerList = Reviewer.getReviewerWithLoad();

    res.render('admin/kelola_reviewer/dashboard_kelola_reviewer', {
        title: 'Kelola Reviewer',
        user: req.session.user,
        active: 'reviewer',
        reviewerList
    });
};
