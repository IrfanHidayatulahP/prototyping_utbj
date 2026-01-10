// models/gelombang.js

// 1. Ganti 'const' jadi 'let' agar datanya bisa ditambah
let mockTahun = [
    { tahun_akademik: 'Tahun Akademik 2025', jml_gelombang: 2, jml_proposal: 2000, total_dana: '2.000.000.000', tahun_id: '2025' },
    { tahun_akademik: 'Tahun Akademik 2024', jml_gelombang: 3, jml_proposal: 3000, total_dana: '3.000.000.000', tahun_id: '2024' }
];

// Data detail (biarkan const)
const mockDetailGelombang = [
    { tahun_id: '2025', nama: 'Gelombang 1', periode: '2025', proposal: 1000, dana: '1.000.000.000' },
    { tahun_id: '2025', nama: 'Gelombang 2', periode: '2025', proposal: 1000, dana: '1.000.000.000' },
    { tahun_id: '2024', nama: 'Gelombang 1', periode: '2024', proposal: 1500, dana: '1.500.000.000' }
];

exports.getAll = () => {
    return mockTahun;
};

exports.getByYear = (tahun) => {
    return mockDetailGelombang.filter(item => item.tahun_id === tahun);
};

// 2. FUNGSI BARU: Tambah Tahun ke Memory
exports.addTahun = (inputNamaTahun) => {
    // Kita buat data baru dengan nilai default 0
    // Asumsi inputNamaTahun misal: "2026" atau "2026/2027"
    
    const newData = {
        tahun_akademik: `Tahun Akademik ${inputNamaTahun}`, // Format teks biar seragam
        jml_gelombang: 0,       // Default 0
        jml_proposal: 0,        // Default 0
        total_dana: '0',        // Default 0
        tahun_id: inputNamaTahun.replace(/[^0-9]/g, '') // Ambil angkanya saja untuk ID
    };

    // Masukkan ke urutan paling atas array (unshift)
    mockTahun.unshift(newData);
};