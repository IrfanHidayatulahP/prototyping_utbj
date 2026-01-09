const express = require('express');
const router = express.Router();
const penelitianController = require('../../controllers/admin/penelitianController');

router.get('/', penelitianController.index);
router.get('/detail/:tahun', penelitianController.detail);
router.get('/detail/:tahun/:gelombang', penelitianController.waveDetail);
router.get('/detail/:tahun/:gelombang/tambah-penilaian', penelitianController.createAssessment);
router.post('/detail/:tahun/:gelombang/store-penilaian', penelitianController.storeAssessment);
router.get('/detail/:tahun/:gelombang/list', penelitianController.listPenelitian);

module.exports = router;