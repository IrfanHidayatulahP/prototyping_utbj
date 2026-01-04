const express = require('express');
const router = express.Router();

// Langsung render halaman index tanpa cek login
router.get('/', (req, res) => {
    res.render('index', { 
        title: 'Dashboard UTBJ',
        // Kita "tipu" tampilannya seolah-olah sudah login
        user: 'Irfan Hidayatulah P' 
    });
});

module.exports = router;