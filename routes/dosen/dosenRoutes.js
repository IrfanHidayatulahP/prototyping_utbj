// routes/dosen/proposalRoutes.js
const express = require('express');
const router = express.Router();
const proposalController = require('../../controllers/dosen/proposalController');

/* ===============================
   DOSEN ROUTES
   =============================== */

// dashboard
router.get('/dashboard', proposalController.dashboardDosen);

// proposal saya
router.get('/proposal', proposalController.listDosenProposal);

// detail proposal
router.get('/proposal/:id', proposalController.detailDosenProposal);

// ajukan proposal
router.get('/proposal-ajukan', proposalController.formAjukanProposal);

// submit proposal
router.post('/proposal-ajukan', proposalController.submitProposal);

module.exports = router;
