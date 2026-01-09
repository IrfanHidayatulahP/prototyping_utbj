// controllers/dashboardController.js
const fs = require('fs');
const path = require('path');

exports.showDashboard = (req, res) => {
    const user = req.session && req.session.user;
    if (!user) return res.redirect('/login');

    const now = new Date();
    let viewName = '';

    // data dasar (dipakai semua role)
    let data = {
        name: user.name,
        greeting: `Halo, ${user.name}`,
        today: now.toLocaleDateString('id-ID'),
        active: 'dashboard' // ⬅️ PENTING: untuk sidebar
    };

    if (user.role === 'dosen') {
        viewName = 'dosen/dashboard_dosen';
        data = Object.assign(data, {
            title: 'Dashboard Dosen',
            stats: {
                proposalsSubmitted: 7,
                proposalsInProgress: 2,
                publications: 4
            },
            recentSubmissions: [
                { id: 'PR-001', title: 'Analisis A', status: 'Menunggu Review', submitted_at: '2025-11-10' },
                { id: 'PR-007', title: 'Studi B', status: 'Disetujui', submitted_at: '2025-09-02' }
            ]
        });

    } else if (user.role === 'reviewer') {
        viewName = 'reviewer/dashboard_reviewer';
        data = Object.assign(data, {
            title: 'Dashboard Reviewer',
            stats: {
                toReview: 5,
                reviewedThisMonth: 12,
                averageScore: 4.1
            },
            queue: [
                { id: 'PR-010', title: 'Evaluasi C', deadline: '2025-12-30' },
                { id: 'PR-011', title: 'Penelitian D', deadline: '2026-01-05' }
            ]
        });

    } else {
        // Admin langsung dilempar ke controller admin gelombang
        return res.redirect('/admin/gelombang');
    }

    // OPTIONAL DEBUG (boleh dihapus jika sudah stabil)
    const fullViewPath = path.join(__dirname, '..', 'views', `${viewName}.ejs`);
    if (!fs.existsSync(fullViewPath)) {
        console.error(`View file not found: ${fullViewPath}`);
        return res.status(500).send(`View not found: ${viewName}`);
    }

    return res.render(viewName, data);
};
