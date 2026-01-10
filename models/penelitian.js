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
    {
        id: 1,
        judul: 'Analisis Algoritma Genetika untuk Penjadwalan',
        peneliti: 'Dr. Budi Santoso (Ketua), Andi Wijaya (Anggota)',
        skema: 'Dasar',
        bidang: 'Teknologi Informasi',
        status: 'Berjalan',
        dana: 'Rp 15.000.000',
        deskripsi: 'Penelitian ini berfokus pada optimasi penjadwalan mata kuliah menggunakan algoritma genetika untuk menghindari bentrok ruangan.',
        laporan_kemajuan: '/uploads/laporan/kemajuan_1.pdf',
        laporan_akhir: '/uploads/laporan/akhir_1.pdf',
        luaran: 'Jurnal Internasional Bereputasi (Q2)'
    },
    { id: 2, judul: 'Eksplorasi Senyawa Kimia pada Tanaman Herbal', peneliti: 'Prof. Siti Aminah', skema: 'Dasar', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 18.000.000', luaran: 'Patent', deskripsi: 'Penelitian ini bertujuan untuk mengidentifikasi dan menganalisis senyawa kimia aktif dalam berbagai tanaman herbal yang memiliki potensi sebagai obat alami.', laporan_kemajuan: '/uploads/laporan/kemajuan_2.pdf', laporan_akhir: '/uploads/laporan/akhir_2.pdf' },
    { id: 3, judul: 'Kajian Sosiologi Masyarakat Pesisir', peneliti: 'Dr. Rina Wati', skema: 'Dasar', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 12.000.000', luaran: 'Laporan Kajian', deskripsi: 'Penelitian ini mengkaji dinamika sosial, ekonomi, dan budaya masyarakat pesisir serta dampak perubahan lingkungan terhadap kehidupan mereka.', laporan_kemajuan: '/uploads/laporan/kemajuan_3.pdf', laporan_akhir: '/uploads/laporan/akhir_3.pdf' },
    { id: 4, judul: 'Model Matematika Penyebaran Penyakit', peneliti: 'Andi Saputra, M.Si', skema: 'Dasar', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 14.000.000', luaran: 'Jurnal Internasional (Q3)', deskripsi: 'Penelitian ini mengembangkan model matematika untuk memprediksi penyebaran penyakit menular di suatu populasi berdasarkan berbagai faktor epidemiologis.', laporan_kemajuan: '/uploads/laporan/kemajuan_4.pdf', laporan_akhir: '/uploads/laporan/akhir_4.pdf' },
    { id: 5, judul: 'Analisis Wacana Kritis Berita Politik', peneliti: 'Bambang Pamungkas, M.Ikom', skema: 'Dasar', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 10.000.000', luaran: 'Artikel Jurnal', deskripsi: 'Penelitian ini menganalisis bagaimana berita politik disajikan di media massa dan dampaknya terhadap persepsi publik menggunakan pendekatan wacana kritis.', laporan_kemajuan: '/uploads/laporan/kemajuan_5.pdf', laporan_akhir: '/uploads/laporan/akhir_5.pdf' },

    // --- SKEMA TERAPAN ---
    { id: 6, judul: 'Penerapan IoT untuk Smart Home Hemat Energi', peneliti: 'Eko Prasetyo, M.T', skema: 'Terapan', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 25.000.000', luaran: 'Produk Teknologi', deskripsi: 'Penelitian ini mengembangkan sistem smart home berbasis IoT yang dapat mengoptimalkan penggunaan energi listrik di rumah tangga melalui otomatisasi dan monitoring real-time.', laporan_kemajuan: '/uploads/laporan/kemajuan_6.pdf', laporan_akhir: '/uploads/laporan/akhir_6.pdf' },
    { id: 7, judul: 'Pengembangan Aplikasi Kasir Berbasis Cloud', peneliti: 'Dian Sastro, M.Kom', skema: 'Terapan', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 30.000.000', luaran: 'Produk Teknologi', deskripsi: 'Penelitian ini mengembangkan aplikasi kasir berbasis cloud untuk mempermudah transaksi di toko ritel dengan fitur real-time dan integrasi pembayaran.', laporan_kemajuan: '/uploads/laporan/kemajuan_7.pdf', laporan_akhir: '/uploads/laporan/akhir_7.pdf' },
    { id: 8, judul: 'Alat Pengering Padi Otomatis Berbasis Arduino', peneliti: 'Feri Irawan, M.T', skema: 'Terapan', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 22.000.000', luaran: 'Produk Teknologi', deskripsi: 'Penelitian ini menghasilkan alat pengering padi otomatis berbasis Arduino yang dapat mengurangi waktu pengeringan dan meningkatkan kualitas hasil panen.', laporan_kemajuan: '/uploads/laporan/kemajuan_8.pdf', laporan_akhir: '/uploads/laporan/akhir_8.pdf' },
    { id: 9, judul: 'Sistem Monitoring Kualitas Air Tambak Udang', peneliti: 'Gita Gutawa, M.Si', skema: 'Terapan', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 28.000.000', luaran: 'Produk Teknologi', deskripsi: 'Penelitian ini mengembangkan sistem monitoring kualitas air tambak udang berbasis sensor IoT untuk memastikan kondisi air tetap optimal dalam budidaya.', laporan_kemajuan: '/uploads/laporan/kemajuan_9.pdf', laporan_akhir: '/uploads/laporan/akhir_9.pdf' },
    { id: 10, judul: 'Implementasi Metode Jigsaw di Sekolah Dasar', peneliti: 'Hani Puspita, M.Pd', skema: 'Terapan', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 20.000.000', luaran: 'Produk Teknologi', deskripsi: 'Penelitian ini mengimplementasikan metode pembelajaran Jigsaw di sekolah dasar untuk meningkatkan partisipasi dan hasil belajar siswa melalui kerja kelompok.', laporan_kemajuan: '/uploads/laporan/kemajuan_10.pdf', laporan_akhir: '/uploads/laporan/akhir_10.pdf' },
    // --- SKEMA PENGEMBANGAN ---
    { id: 11, judul: 'Prototype Mobil Listrik Hemat Energi', peneliti: 'Ir. Joko Widodo', skema: 'Pengembangan', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 100.000.000', luaran: 'Prototipe Kendaraan', deskripsi: 'Penelitian ini bertujuan mengembangkan prototipe mobil listrik yang efisien dan ramah lingkungan dengan fokus pada pengurangan konsumsi energi dan emisi karbon.', laporan_kemajuan: '/uploads/laporan/kemajuan_11.pdf', laporan_akhir: '/uploads/laporan/akhir_11.pdf' },
    { id: 12, judul: 'Pengembangan Kawasan Wisata Berbasis Edukasi', peneliti: 'Kaesang Pangarep, M.Par', skema: 'Pengembangan', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 80.000.000', luaran: 'Model Pengelolaan', deskripsi: 'Penelitian ini mengembangkan model pengelolaan kawasan wisata yang mengintegrasikan aspek edukasi untuk meningkatkan kesadaran lingkungan dan budaya lokal di kalangan wisatawan.', laporan_kemajuan: '/uploads/laporan/kemajuan_12.pdf', laporan_akhir: '/uploads/laporan/akhir_12.pdf' },
    { id: 13, judul: 'Hilirisasi Produk Olahan Limbah Plastik', peneliti: 'Luhut Panjaitan, M.T', skema: 'Pengembangan', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 90.000.000', luaran: 'Produk Olahan', deskripsi: 'Penelitian ini fokus pada pengembangan produk olahan dari limbah plastik untuk menciptakan nilai tambah dan mengurangi dampak lingkungan dari sampah plastik.', laporan_kemajuan: '/uploads/laporan/kemajuan_13.pdf', laporan_akhir: '/uploads/laporan/akhir_13.pdf' },
    { id: 14, judul: 'Pengembangan Sistem Keamanan Siber Nasional', peneliti: 'Mahfud MD, Ph.D', skema: 'Pengembangan', bidang: 'Teknologi Informasi', status: 'Pending', dana: 'Rp 120.000.000', luaran: 'Sistem Keamanan', deskripsi: 'Penelitian ini bertujuan mengembangkan sistem keamanan siber nasional yang komprehensif untuk melindungi infrastruktur digital dari ancaman siber yang semakin kompleks.', laporan_kemajuan: '/uploads/laporan/kemajuan_14.pdf', laporan_akhir: '/uploads/laporan/akhir_14.pdf' },
    { id: 15, judul: 'Model Pertanian Terpadu Zero Waste', peneliti: 'Nadiem Makarim, MBA', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 110.000.000', luaran: 'Model Pertanian', deskripsi: 'Penelitian ini mengembangkan model pertanian terpadu yang menerapkan prinsip zero waste untuk meningkatkan efisiensi sumber daya dan mengurangi limbah dalam proses produksi pertanian.', laporan_kemajuan: '/uploads/laporan/kemajuan_15.pdf', laporan_akhir: '/uploads/laporan/akhir_15.pdf' }
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

// Tambahkan di bagian bawah models/penelitian.js

let mockPenelitianReviews = []; // Penyimpanan sementara hasil review penelitian

exports.savePenelitianReview = (id, data) => {
    const index = mockPenelitianReviews.findIndex(r => r.penelitianId == id);
    if (index !== -1) {
        mockPenelitianReviews[index] = { penelitianId: id, ...data, updatedAt: new Date() };
    } else {
        mockPenelitianReviews.push({ penelitianId: id, ...data, updatedAt: new Date() });
    }
    return true;
};

exports.getReviewByPenelitianId = (id) => {
    return mockPenelitianReviews.find(r => r.penelitianId == id);
};

exports.updateStatusById = (id, newStatus) => {
    const idx = mockPenelitianList.findIndex(p => p.id == id);
    if (idx === -1) return false;

    mockPenelitianList[idx].status = newStatus;
    mockPenelitianList[idx].statusUpdatedAt = new Date();
    return true;
};