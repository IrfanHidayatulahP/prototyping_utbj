// models/proposal.js

// Data Halaman Depan (Daftar Tahun)
const mockTahunProposal = [
    { tahun_id: '2025', tahun_akademik: 'Tahun Akademik 2025', total_proposal: 2000 },
    { tahun_id: '2024', tahun_akademik: 'Tahun Akademik 2024', total_proposal: 1000 }
];

// Data Halaman Detail (Daftar Gelombang per Tahun)
const mockDetailProposal = [
    { tahun_id: '2025', nama: 'Gelombang 1', periode: '2025', total: 1000, pagu: 'Rp 100.000.000' },
    { tahun_id: '2025', nama: 'Gelombang 2', periode: '2025', total: 1000, pagu: 'Rp 120.000.000' },
    { tahun_id: '2024', nama: 'Gelombang 1', periode: '2024', total: 1000, pagu: 'Rp 80.000.000' }
];


const mockWaveDetail = [
    { nama: 'Gelombang 1', periode: '2025', total: 1000 }
];

// Data Dummy List Proposal
const mockProposalList = [
    // --- SKEMA DASAR (5 Data) ---
    {
        id: 1, reviewer_id: 2, judul: 'Hubungan Stres dengan Perilaku Merokok Mahasiswa', pengusul: 'Ichsan Helmi', skema: 'Dasar', status: 'Pending', dana: 'Rp 7.000.000', bidang: 'Kesehatan', luaran: 'Artikel Ilmiah', file: '/uploads/proposal1.pdf', fileName: 'proposal1.pdf', review: {
            nilai: null,
            komentar: null,
            rekomendasi: null, // diterima / ditolak / revisi
            tanggal: null
        },
    },
    { id: 2, reviewer_id: 1, judul: 'Analisis Dampak AI terhadap Pembelajaran Mahasiswa', pengusul: 'Budi Santoso', skema: 'Dasar', status: 'Pending', dana: 'Rp 7.000.000', bidang: 'Teknologi Informasi', luaran: 'Artikel Ilmiah', file: '/uploads/proposal2.pdf', fileName: 'proposal2.pdf' },
    { id: 3, judul: 'Pola Komunikasi Interpersonal Mahasiswa Rantau', pengusul: 'Anisa Rahma', skema: 'Dasar', status: 'Pending', dana: 'Rp 6.500.000', bidang: 'Psikologi', luaran: 'Artikel Ilmiah', file: '/uploads/proposal3.pdf', fileName: 'proposal3.pdf' },
    { id: 4, judul: 'Efektivitas Metode Pembelajaran Hybrid Pasca Pandemi', pengusul: 'Dimas Anggara', skema: 'Dasar', status: 'Pending', dana: 'Rp 7.500.000', bidang: 'Pendidikan', luaran: 'Artikel Ilmiah', file: '/uploads/proposal4.pdf', fileName: 'proposal4.pdf' },
    { id: 5, judul: 'Pengaruh Media Sosial TikTok terhadap Konsentrasi Belajar', pengusul: 'Fani Amalia', skema: 'Dasar', status: 'Pending', dana: 'Rp 6.000.000', bidang: 'Komunikasi', luaran: 'Artikel Ilmiah', file: '/uploads/proposal5.pdf', fileName: 'proposal5.pdf' },
    // --- SKEMA TERAPAN (5 Data) ---
    { id: 6, reviewer_id: 1, judul: 'Rancang Bangun Alat Pakan Ikan Otomatis Berbasis IoT', pengusul: 'Siti Aminah', skema: 'Terapan', status: 'Pending', dana: 'Rp 12.000.000', bidang: 'Teknologi Informasi', luaran: 'Produk Teknologi', file: '/uploads/proposal6.pdf', fileName: 'proposal6.pdf' },
    { id: 7, judul: 'Implementasi Smart Farming untuk Pertanian Cabai', pengusul: 'Rudi Hartono', skema: 'Terapan', status: 'Pending', dana: 'Rp 15.000.000', bidang: 'Pertanian', luaran: 'Produk Teknologi', file: '/uploads/proposal7.pdf', fileName: 'proposal7.pdf' },
    { id: 8, judul: 'Sistem Deteksi Dini Kebakaran Hutan Menggunakan LoraWAN', pengusul: 'Eko Prasetyo', skema: 'Terapan', status: 'Pending', dana: 'Rp 14.500.000', bidang: 'Lingkungan', luaran: 'Produk Teknologi', file: '/uploads/proposal8.pdf', fileName: 'proposal8.pdf' },
    { id: 9, judul: 'Aplikasi Manajemen Sampah Desa Berbasis Android', pengusul: 'Rina Wati', skema: 'Terapan', status: 'Pending', dana: 'Rp 11.000.000', bidang: 'Lingkungan', luaran: 'Produk Teknologi', file: '/uploads/proposal9.pdf', fileName: 'proposal9.pdf' },
    { id: 10, judul: 'Mesin Pengolah Limbah Plastik Menjadi Paving Block', pengusul: 'Agus Setiawan', skema: 'Terapan', status: 'Pending', dana: 'Rp 13.500.000', bidang: 'Teknologi Industri', luaran: 'Produk Teknologi', file: '/uploads/proposal10.pdf', fileName: 'proposal10.pdf' },

    // --- SKEMA PENGEMBANGAN (5 Data) ---
    { id: 11, reviewer_id: 2, judul: 'Pengembangan Kurikulum Vokasi Berbasis Kebutuhan Industri', pengusul: 'Dewi Sartika', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 20.000.000', bidang: 'Pendidikan', luaran: 'Model Kurikulum', file: '/uploads/proposal11.pdf', fileName: 'proposal11.pdf' },
    { id: 12, judul: 'Model Inkubator Bisnis untuk Start-up Mahasiswa', pengusul: 'Joko Anwar', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 25.000.000', bidang: 'Ekonomi', luaran: 'Model Bisnis', file: '/uploads/proposal12.pdf', fileName: 'proposal12.pdf' },
    { id: 13, judul: 'Digitalisasi Arsip Manuskrip Kuno Perpustakaan Daerah', pengusul: 'Sri Wahyuni', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 22.000.000', bidang: 'Arkeologi', luaran: 'Arsip Digital', file: '/uploads/proposal13.pdf', fileName: 'proposal13.pdf' },
    { id: 14, judul: 'Pengembangan Laboratorium Virtual untuk Praktikum Kimia', pengusul: 'Hendra Gunawan', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 28.000.000', bidang: 'Kimia', luaran: 'Laboratorium Virtual', file: '/uploads/proposal14.pdf', fileName: 'proposal14.pdf' },
    { id: 15, judul: 'Model Pemberdayaan UMKM Batik Lokal Melalui E-Commerce', pengusul: 'Maya Putri', skema: 'Pengembangan', status: 'Pending', dana: 'Rp 21.500.000', bidang: 'Ekonomi', luaran: 'Model Bisnis', file: '/uploads/proposal15.pdf', fileName: 'proposal15.pdf' }
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

exports.findByReviewer = (reviewerId) => {
    // Menggunakan == untuk toleransi perbandingan string/number dari session
    return mockProposalList.filter(p => p.reviewer_id == reviewerId);
};

exports.findById = (id) => {
    return mockProposalList.find(p => p.id == id);
};

// Data dummy untuk menyimpan hasil review
let mockReviews = [];

exports.saveReview = (proposalId, reviewData) => {
    const proposal = mockProposalList.find(p => p.id == proposalId);
    if (!proposal) return false;

    proposal.review = {
        kriteria: {
            kriteria1: Number,
            kriteria2: Number,
            kriteria3: Number
        },
        nilai_akhir: Number,
        catatan: String,
        rekomendasi: 'Diterima' | 'Revisi' | 'Ditolak',
        reviewer: String,
        tanggal: Date
    };

    // Jika rekomendasi "diterima", otomatis set dana approved
    if (reviewData.rekomendasi === 'diterima') {
        proposal.dana_approved = proposal.dana;
        proposal.status = 'Diterima';
    }

    if (reviewData.rekomendasi === 'ditolak') {
        proposal.status = 'Ditolak';
    }

    proposal.updatedAt = new Date();
    return true;
};

exports.getReviewByProposalId = (proposalId) => {
    const proposal = mockProposalList.find(p => p.id == proposalId);
    return proposal ? proposal.review : null;
};

// Ambil pagu untuk tahun + gelombang (kembalikan string "Rp ...")
exports.getPagu = (tahun, gelombangNama) => {
    const found = mockDetailProposal.find(d => d.tahun_id === tahun &&
        // kalau view mengirim gelombang sebagai slug, samakan dulu:
        (d.nama === gelombangNama || d.nama.replace(/\s+/g, '-').toLowerCase() === gelombangNama)
    );
    if (found && found.pagu) return found.pagu;
    return 'Rp 0';
};

// Update status & dana approved untuk proposal (mock update)
exports.updateProposalStatus = (id, updateData) => {
    const index = mockProposalList.findIndex(p => p.id == id);
    if (index === -1) return false;

    // update status
    if (updateData.status) mockProposalList[index].status = updateData.status;

    // update dana approved (simpan sebagai field baru)
    if (updateData.dana_approved) mockProposalList[index].dana_approved = updateData.dana_approved;

    // rekam waktu update
    mockProposalList[index].updatedAt = new Date();

    return true;
};

// --- helpers: parse/format rupiah (letakkan setelah mockProposalList) ---
function parseRupiahToNumber(rpString) {
    if (!rpString) return 0;
    const onlyDigits = rpString.toString().replace(/[^0-9]/g, '');
    return onlyDigits ? parseInt(onlyDigits, 10) : 0;
}

function formatNumberToRupiah(number) {
    if (number === undefined || number === null) return 'Rp 0';
    return 'Rp ' + number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// --- totals per skema untuk mockProposalList (PERBAIKAN: gunakan mockProposalList, bukan mockPenelitianList) ---
exports.getTotalsPerSkema = () => {
    // gunakan mockProposalList jika tersedia, fallback ke array kosong
    const sourceList = (typeof mockProposalList !== 'undefined' && Array.isArray(mockProposalList))
        ? mockProposalList
        : [];

    const totals = {};

    sourceList.forEach(item => {
        const skema = item.skema || 'Lainnya';
        const danaNum = parseRupiahToNumber(item.dana || 'Rp 0');

        if (!totals[skema]) totals[skema] = 0;
        totals[skema] += danaNum;
    });

    const result = {};
    Object.keys(totals).forEach(skema => {
        result[skema] = {
            total: totals[skema],
            formatted: formatNumberToRupiah(totals[skema])
        };
    });

    return result;
};

exports.getTotalBySkema = (skema) => {
    const totals = exports.getTotalsPerSkema();
    return totals[skema] || { total: 0, formatted: 'Rp 0' };
};
