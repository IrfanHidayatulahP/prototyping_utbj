// models/penelitian.js

// Data Dummy untuk Halaman Detail (List Gelombang)
const mockDetailPenelitian = [
    { tahun_id: '2025', nama: 'Gelombang 1', periode: '2025', total: 1000, dana: 'Rp 1.000.000.000' },
    { tahun_id: '2025', nama: 'Gelombang 2', periode: '2025', total: 1000, dana: 'Rp 1.000.000.000' }
];

// Data Dummy untuk Halaman Utama (List Tahun - Opsional jika belum ada)
const mockTahunPenelitian = [
    { tahun_id: '2025', tahun_akademik: 'Tahun Akademik 2025', total_dana: 'Rp 2.000.000.000' },
    { tahun_id: '2024', tahun_akademik: 'Tahun Akademik 2024', total_dana: 'Rp 1.500.000.000' }
];

// DATA DUMMY LIST PENELITIAN
const mockPenelitianList = [
    // --- SKEMA DASAR ---
    { id: 1, judul: 'Analisis Algoritma Genetika untuk Penjadwalan', pengusul: 'Dr. Budi Santoso', skema: 'Dasar', status: 'Pending', dana: 'Rp 15.000.000' },
    { id: 2, judul: 'Eksplorasi Senyawa Kimia pada Tanaman Herbal', pengusul: 'Prof. Siti Aminah', skema: 'Dasar', status: 'Pending', dana: 'Rp 18.000.000' },
    { id: 3, judul: 'Kajian Sosiologi Masyarakat Pesisir', pengusul: 'Dr. Rina Wati', skema: 'Dasar', status: 'Pending', dana: 'Rp 12.000.000' },
    { id: 4, judul: 'Model Matematika Penyebaran Penyakit', pengusul: 'Andi Saputra, M.Si', skema: 'Dasar', status: 'Pending', dana: 'Rp 14.000.000' },
    { id: 5, judul: 'Analisis Wacana Kritis Berita Politik', pengusul: 'Bambang Pamungkas, M.Ikom', skema: 'Dasar', status: 'Pending', dana: 'Rp 10.000.000' },

    // --- SKEMA TERAPAN ---
    { id: 6, judul: 'Penerapan IoT untuk Smart Home Hemat Energi', pengusul: 'Eko Prasetyo, M.T', skema: 'Terapan', status: 'Pending', dana: 'Rp 25.000.000' },
    { id: 7, judul: 'Pengembangan Aplikasi Kasir Berbasis Cloud', pengusul: 'Dian Sastro, M.Kom', skema: 'Terapan', status: 'Pending', dana: 'Rp 30.000.000' },
    { id: 8, judul: 'Alat Pengering Padi Otomatis Berbasis Arduino', pengusul: 'Feri Irawan, M.T', skema: 'Terapan', status: 'Pending', dana: 'Rp 22.000.000' },
    { id: 9, judul: 'Sistem Monitoring Kualitas Air Tambak Udang', pengusul: 'Gita Gutawa, M.Si', skema: 'Terapan', status: 'Pending', dana: 'Rp 28.000.000' },
    { id: 10, judul: 'Implementasi Metode Jigsaw di Sekolah Dasar', pengusul: 'Hani Puspita, M.Pd', skema: 'Terapan', status: 'Pending', dana: 'Rp 20.000.000' },

    // --- SKEMA PENGEMBANGAN ---
    { id: 11, judul: 'Prototype Mobil Listrik Hemat Energi', pengusul: 'Ir. Joko Widodo', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 100.000.000' },
    { id: 12, judul: 'Pengembangan Kawasan Wisata Berbasis Edukasi', pengusul: 'Kaesang Pangarep, M.Par', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 80.000.000' },
    { id: 13, judul: 'Hilirisasi Produk Olahan Limbah Plastik', pengusul: 'Luhut Panjaitan, M.T', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 90.000.000' },
    { id: 14, judul: 'Pengembangan Sistem Keamanan Siber Nasional', pengusul: 'Mahfud MD, Ph.D', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 120.000.000' },
    { id: 15, judul: 'Model Pertanian Terpadu Zero Waste', pengusul: 'Nadiem Makarim, MBA', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 110.000.000' }
];

// DATA DUMMY PRODI PENELITIAN
const mockProdiPenelitian = [
    { id: 1, prodi: 'Teknik Mesin', total_proposal: 50, total_dana: 'Rp 500.000.000' },
    { id: 2, prodi: 'Teknik Elektro', total_proposal: 45, total_dana: 'Rp 450.000.000' },
    { id: 3, prodi: 'Ilmu Komputer', total_proposal: 40, total_dana: 'Rp 400.000.000' },
    { id: 4, prodi: 'Manajemen', total_proposal: 35, total_dana: 'Rp 350.000.000' },
    { id: 5, prodi: 'Psikologi', total_proposal: 30, total_dana: 'Rp 300.000.000' }
];

exports.getAllYears = () => {
    return mockTahunPenelitian;
};

exports.getWavesByYear = (tahun) => {
    // Filter data berdasarkan tahun
    return mockDetailPenelitian.filter(item => item.tahun_id === tahun);
};

exports.getWaveDetail = (tahun, gelombangSlug) => {
    // Kita cari data yang cocok berdasarkan Tahun dan Nama Gelombang (Slug)
    // Contoh slug: 'gelombang-1' -> dicocokkan dengan 'Gelombang 1'
    return mockDetailPenelitian.filter(item => {
        const itemSlug = item.nama.replace(/\s+/g, '-').toLowerCase();
        return item.tahun_id === tahun && itemSlug === gelombangSlug;
    });
};

// FUNGSI GET DATA LIST (FILTER)
exports.getPenelitianList = (tahun, gelombang, skemaFilter) => {
    // 1. Filter Prodi
    if (skemaFilter === 'Prodi') {
        return mockProdiPenelitian.sort((a, b) => b.total_proposal - a.total_proposal);
    }

    // 2. Filter Skema (Dasar, Terapan, Pengembangan)
    if (skemaFilter) {
        return mockPenelitianList.filter(item => item.skema === skemaFilter);
    }

    // Default: Dasar
    return mockPenelitianList.filter(item => item.skema === 'Dasar');
};

exports.findById = (id) => {
    return mockPenelitianList.find(item => item.id == id);
};