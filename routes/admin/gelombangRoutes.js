const express = require('express');
const router = express.Router();

const gelombangController = require('../../controllers/admin/gelombangController');

// Halaman Utama 
router.get('/', gelombangController.index);

// Halaman tambah tahun akademik
router.get('/tambah', gelombangController.create);

// Halaman Detail 
router.get('/detail/:tahun', gelombangController.detail);

// Tambah gelombang
router.get('/detail/:tahun/tambah', gelombangController.createGelombang);

module.exports = router;