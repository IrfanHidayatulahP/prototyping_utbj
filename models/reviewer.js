// models/reviewer.js
const ReviewProposal = require('./reviewProposal');

const mockReviewerList = [
    { id: 1, nama: 'Irfan Hidayatulah P', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 2, nama: 'Budi Santoso, M.Kom', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 3, nama: 'Siti Aminah, M.T', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 4, nama: 'Rudi Hartono, Ph.D', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 5, nama: 'Dewi Sartika, M.Pd', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 6, nama: 'Joko Anwar, S.Sn', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 7, nama: 'Andi Saputra', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 8, nama: 'Rina Wati', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 9, nama: 'Eko Prasetyo', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 10, nama: 'Dian Sastro', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 },
    { id: 11, nama: 'Gita Gutawa', status: 'Aktif', batas_proposal: 8, batas_penelitian: 8 }
];

exports.getAllReviewers = () => {
    return mockReviewerList;
};

exports.getReviewerWithLoad = () => {
    return mockReviewerList.map(reviewer => {
        const reviews = ReviewProposal.getByReviewerId(reviewer.id);

        const totalProposal = reviews.length;
        const reviewed = reviews.filter(r => r.status === 'reviewed').length;
        const pending = reviews.filter(r => r.status === 'assigned').length;

        return {
            ...reviewer,
            beban: {
                total: totalProposal,
                reviewed,
                pending
            }
        };
    });
};