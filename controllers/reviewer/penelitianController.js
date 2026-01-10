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

exports.detailPenelitian = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    const id = req.params.id;
    const penelitian = Penelitian.findById(id);

    if (!penelitian) return res.status(404).send('Data penelitian tidak ditemukan');

    // Ambil data review jika sudah ada
    const review = Penelitian.getReviewByPenelitianId(id);

    res.render('reviewer/penelitian/penelitian_detail', {
        title: 'Detail Penelitian',
        name: user.name,
        active: 'penelitian',
        penelitian: penelitian,
        review: review // Data review dikirim ke EJS
    });
};

exports.renderReviewForm = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    const penelitian = Penelitian.findById(req.params.id);
    if (!penelitian) return res.status(404).send('Penelitian tidak ditemukan');

    res.render('reviewer/penelitian/penelitian_review_form', {
        title: 'Form Penilaian Penelitian',
        name: user.name,
        active: 'penelitian',
        penelitian
    });
};

exports.submitReview = (req, res) => {
    const { kriteria1, kriteria2, kriteria3, catatan, rekomendasi } = req.body;

    // Bobot: Kesesuaian (30%), Capaian Luaran (40%), Realisasi Dana (30%)
    const totalSkor = (Number(kriteria1) * 0.3) + (Number(kriteria2) * 0.4) + (Number(kriteria3) * 0.3);

    Penelitian.savePenelitianReview(req.params.id, {
        kriteria1: Number(kriteria1),
        kriteria2: Number(kriteria2),
        kriteria3: Number(kriteria3),
        totalSkor: totalSkor.toFixed(2),
        catatan,
        rekomendasi
    });

    return res.redirect(`/reviewer/penelitian/${req.params.id}?status=success`);
};