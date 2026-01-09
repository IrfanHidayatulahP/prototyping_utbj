// models/proposal.js

// Data Halaman Depan (Daftar Tahun)
const mockTahunProposal = [
    { tahun_id: '2025', tahun_akademik: 'Tahun Akademik 2025', total_proposal: 2000 },
    { tahun_id: '2024', tahun_akademik: 'Tahun Akademik 2024', total_proposal: 1000 }
];

// Data Halaman Detail (Daftar Gelombang per Tahun)
const mockDetailProposal = [
    { tahun_id: '2025', nama: 'Gelombang 1', periode: '2025', total: 1000 },
    { tahun_id: '2025', nama: 'Gelombang 2', periode: '2025', total: 1000 },
    { tahun_id: '2024', nama: 'Gelombang 1', periode: '2024', total: 1000 }
];

const mockWaveDetail = [
    { nama: 'Gelombang 1', periode: '2025', total: 1000 }
];

// Data Dummy List Proposal
const mockProposalList = [
    // --- SKEMA DASAR (5 Data) ---
    { id: 1, judul: 'Hubungan Stres dengan Perilaku Merokok Mahasiswa', pengusul: 'Ichsan Helmi', skema: 'Dasar', status: 'Pending', dana: 'Rp 7.000.000' },
    { id: 2, judul: 'Analisis Dampak AI terhadap Pembelajaran Mahasiswa', pengusul: 'Budi Santoso', skema: 'Dasar', status: 'Pending', dana: 'Rp 7.000.000' },
    { id: 3, judul: 'Pola Komunikasi Interpersonal Mahasiswa Rantau', pengusul: 'Anisa Rahma', skema: 'Dasar', status: 'Pending', dana: 'Rp 6.500.000' },
    { id: 4, judul: 'Efektivitas Metode Pembelajaran Hybrid Pasca Pandemi', pengusul: 'Dimas Anggara', skema: 'Dasar', status: 'Pending', dana: 'Rp 7.500.000' },
    { id: 5, judul: 'Pengaruh Media Sosial TikTok terhadap Konsentrasi Belajar', pengusul: 'Fani Amalia', skema: 'Dasar', status: 'Pending', dana: 'Rp 6.000.000' },

    // --- SKEMA TERAPAN (5 Data) ---
    { id: 6, judul: 'Rancang Bangun Alat Pakan Ikan Otomatis Berbasis IoT', pengusul: 'Siti Aminah', skema: 'Terapan', status: 'Pending', dana: 'Rp 12.000.000' },
    { id: 7, judul: 'Implementasi Smart Farming untuk Pertanian Cabai', pengusul: 'Rudi Hartono', skema: 'Terapan', status: 'Pending', dana: 'Rp 15.000.000' },
    { id: 8, judul: 'Sistem Deteksi Dini Kebakaran Hutan Menggunakan LoraWAN', pengusul: 'Eko Prasetyo', skema: 'Terapan', status: 'Pending', dana: 'Rp 14.500.000' },
    { id: 9, judul: 'Aplikasi Manajemen Sampah Desa Berbasis Android', pengusul: 'Rina Wati', skema: 'Terapan', status: 'Pending', dana: 'Rp 11.000.000' },
    { id: 10, judul: 'Mesin Pengolah Limbah Plastik Menjadi Paving Block', pengusul: 'Agus Setiawan', skema: 'Terapan', status: 'Pending', dana: 'Rp 13.500.000' },

    // --- SKEMA PENGEMBANGAN (5 Data) ---
    { id: 11, judul: 'Pengembangan Kurikulum Vokasi Berbasis Kebutuhan Industri', pengusul: 'Dewi Sartika', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 20.000.000' },
    { id: 12, judul: 'Model Inkubator Bisnis untuk Start-up Mahasiswa', pengusul: 'Joko Anwar', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 25.000.000' },
    { id: 13, judul: 'Digitalisasi Arsip Manuskrip Kuno Perpustakaan Daerah', pengusul: 'Sri Wahyuni', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 22.000.000' },
    { id: 14, judul: 'Pengembangan Laboratorium Virtual untuk Praktikum Kimia', pengusul: 'Hendra Gunawan', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 28.000.000' },
    { id: 15, judul: 'Model Pemberdayaan UMKM Batik Lokal Melalui E-Commerce', pengusul: 'Maya Putri', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 21.500.000' }
];

// Data Dummy List Dosen
const mockDosenList = [
    { id: 1, nama: 'Dosen 1', status: 'Sudah mengajukan' },
    { id: 2, nama: 'Dosen 2', status: 'Sudah mengajukan' },
    { id: 3, nama: 'Dosen 3', status: 'Sudah mengajukan' },
    { id: 4, nama: 'Dosen 4', status: 'Sudah mengajukan' },
    { id: 5, nama: 'Dosen 5', status: 'Belum mengajukan' },
    { id: 6, nama: 'Dosen 6', status: 'Belum mengajukan' }
];

// Data Dummy Khusus Prodi
const mockProdiList = [
    { id: 1, prodi: 'Teknik Informatika', total_proposal: 45, total_dana: 'Rp 100.000.000' },
    { id: 2, prodi: 'Sistem Informasi', total_proposal: 30, total_dana: 'Rp 80.000.000' },
    { id: 3, prodi: 'Desain Komunikasi Visual', total_proposal: 25, total_dana: 'Rp 50.000.000' },
    { id: 4, prodi: 'Teknik Industri', total_proposal: 20, total_dana: 'Rp 45.000.000' },
    { id: 5, prodi: 'Akuntansi', total_proposal: 15, total_dana: 'Rp 30.000.000' }
];

exports.getAllYears = () => {
    return mockTahunProposal;
};

exports.getWavesByYear = (tahun) => {
    return mockDetailProposal.filter(item => item.tahun_id === tahun);
};

exports.getWaveDetail = (tahun, gelombang_nama) => {
    // Di aplikasi nyata, kita filter berdasarkan nama gelombang juga
    // Untuk dummy, kita kembalikan mockWaveDetail dan sesuaikan tahunnya
    return mockWaveDetail.map(item => ({ ...item, periode: tahun }));
};

// Fungsi ambil data
exports.getProposalsByWave = (tahun, gelombang, skemaFilter) => {
    // Jika ada filter, kita saring datanya
    if (skemaFilter) {
        return mockProposalList.filter(item => item.skema === skemaFilter);
    }
    // Jika tidak ada filter, kembalikan semua (atau default)
    return mockProposalList;
};

exports.getProposalsByWave = (tahun, gelombang, skemaFilter) => {
    // LOGIKA BARU: Jika filternya 'Dosen', kembalikan data dosen
    if (skemaFilter === 'Dosen') {
        return mockDosenList;
    }

    // Logika Lama: Filter berdasarkan skema proposal
    if (skemaFilter) {
        return mockProposalList.filter(item => item.skema === skemaFilter);
    }
    
    // Default (misal 'Dasar' jika tidak ada filter)
    return mockProposalList.filter(item => item.skema === 'Dasar');
};

exports.getProposalsByWave = (tahun, gelombang, skemaFilter) => {
    // 1. Filter Dosen
    if (skemaFilter === 'Dosen') {
        return mockDosenList;
    }

    // 2. Filter Prodi (BARU)
    if (skemaFilter === 'Prodi') {
        // Urutkan berdasarkan total_proposal terbanyak (Descending)
        return mockProdiList.sort((a, b) => b.total_proposal - a.total_proposal);
    }

    // 3. Filter Skema Proposal (Dasar, Terapan, dll)
    if (skemaFilter) {
        return mockProposalList.filter(item => item.skema === skemaFilter);
    }
    
    // Default
    return mockProposalList.filter(item => item.skema === 'Dasar');
};