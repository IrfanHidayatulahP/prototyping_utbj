// controllers/penelitianController.js
const Penelitian = require('../../models/penelitian');

exports.listReviewerPenelitian = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    // Ambil parameter filter dari query string (misal: ?skema=Terapan)
    const { tahun, gelombang, skema } = req.query;

    // Gunakan fungsi dari model
    const penelitianList = Penelitian.getPenelitianList(tahun, gelombang, skema);

    return res.render('reviewer/penelitian/penelitian_reviewer', {
        title: 'Daftar Penelitian',
        name: user.name,
        active: 'penelitian',
        penelitian: penelitianList,
        currentFilter: skema || 'Dasar'
    });
};

exports.detailReviewerPenelitian = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    // Mengambil ID dari parameter URL
    const researchId = req.params.id;
    const data = Penelitian.findById(researchId);

    if (!data) {
        return res.status(404).send('Data penelitian tidak ditemukan');
    }

    return res.render('reviewer/penelitian/penelitian_detail', {
        title: 'Detail Penelitian',
        name: user.name,
        active: 'penelitian',
        p: data // Mengirim data penelitian sebagai variabel 'p'
    });
};