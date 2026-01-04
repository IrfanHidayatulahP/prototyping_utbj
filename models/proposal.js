const proposals = [
    {
        id: 1,
        judul: 'Hubungan antara Stres dengan Perilaku Merokok Mahasiswa UTBJ',
        peneliti: 'Ichsan Helmi',
        skema: 'Dasar',
        bidang: 'Pengetahuan Alam',
        dana: 7000000,
        deskripsi: 'Meneliti tentang hubungan antara stres dengan perilaku merokok mahasiswa UTBJ dengan metode kuantitatif',
        file: '/uploads/proposal1.pdf',
        fileName: 'Hubungan antara Stres.pdf',
        luaran: 'Luaran Jurnal',
        reviewer_id: 2,          // ⬅️ reviewer (user.id)
        status: 'Menunggu Review'
    },
    {
        id: 2,
        judul: 'Hubungan antara Stres dengan Perilaku Merokok Mahasiswa UTBJ',
        peneliti: 'Ichsan Helmi',
        skema: 'Terapan',
        bidang: 'Ilmu Sosial',
        dana: 7000000,
        deskripsi: 'Meneliti tentang hubungan antara stres dengan perilaku merokok mahasiswa UTBJ dengan metode kuantitatif',
        file: '/uploads/proposal2.pdf',
        fileName: 'Hubungan antara Stres.pdf',
        luaran: 'Luaran KI',
        reviewer_id: 2,
        status: 'Menunggu Review'
    },
    {
        id: 3,
        judul: 'Hubungan antara Stres dengan Perilaku Merokok Mahasiswa UTBJ',
        peneliti: 'Ichsan Helmi',
        skema: 'Pengembangan',
        bidang: 'Teknologi',
        dana: 7000000,
        deskripsi: 'Meneliti tentang hubungan antara stres dengan perilaku merokok mahasiswa UTBJ dengan metode kuantitatif',
        file: '/uploads/proposal3.pdf',
        fileName: 'Hubungan antara Stres.pdf',
        luaran: 'Luaran Buku',
        reviewer_id: 2,
        status: 'Menunggu Review'
    }
];

/* ===============================
   HELPER FUNCTIONS
   =============================== */

function findByReviewer(reviewerId) {
    return proposals.filter(p => p.reviewer_id === reviewerId);
}

function findById(id) {
    return proposals.find(p => p.id === Number(id));
}

module.exports = {
    proposals,
    findByReviewer,
    findById
};
