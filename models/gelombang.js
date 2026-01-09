// Data Dummy Tahun (Yang sudah ada)
const mockTahun = [
    { tahun_akademik: 'Tahun Akademik 2025', jml_gelombang: 2, jml_proposal: 2000, total_dana: '2.000.000.000', tahun_id: '2025' },
    { tahun_akademik: 'Tahun Akademik 2024', jml_gelombang: 3, jml_proposal: 3000, total_dana: '3.000.000.000', tahun_id: '2024' }
];

// Data Dummy Detail Gelombang (BARU)
const mockDetailGelombang = [
    { tahun_id: '2025', nama: 'Gelombang 1', periode: '2025', proposal: 1000, dana: '1.000.000.000' },
    { tahun_id: '2025', nama: 'Gelombang 2', periode: '2025', proposal: 1000, dana: '1.000.000.000' },
    { tahun_id: '2024', nama: 'Gelombang 1', periode: '2024', proposal: 1500, dana: '1.500.000.000' }
];

exports.getAll = () => {
    return mockTahun;
};

// Fungsi Baru: Ambil gelombang berdasarkan tahun
exports.getByYear = (tahun) => {
    return mockDetailGelombang.filter(item => item.tahun_id === tahun);
};