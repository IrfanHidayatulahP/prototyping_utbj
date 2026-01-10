const express = require('express');
const router = express.Router();

const proposalController = require('../../controllers/admin/proposalController');

router.get('/', proposalController.index);
router.get('/detail/:tahun', proposalController.detail);
router.get('/detail/:tahun/:gelombang', proposalController.waveDetail);
router.get('/detail/:tahun/:gelombang/tambah-penilaian', proposalController.createAssessment);
router.post('/detail/:tahun/:gelombang/store-penilaian', proposalController.storeAssessment);
router.get('/detail/:tahun/:gelombang/list', proposalController.listProposals);
router.get('/detail/:tahun/:gelombang/proposal/:id', proposalController.proposalDetail);
router.post('/detail/:tahun/:gelombang/proposal/:id/update', proposalController.updateProposalStatus);

module.exports = router;