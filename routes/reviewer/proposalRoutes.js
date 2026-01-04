const express = require('express');
const router = express.Router();
const proposalController = require('../../controllers/reviewer/proposalController');

// routes/reviewer/proposalRoutes.js
router.get('/proposal', proposalController.showProposalReviewer);
router.get('/proposal/:id', proposalController.showProposalDetail);

module.exports = router;
