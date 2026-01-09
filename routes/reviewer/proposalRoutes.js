const express = require('express');
const router = express.Router();
const proposalController = require('../../controllers/reviewer/proposalController');

router.get('/proposal', proposalController.listReviewerProposal);
router.get('/proposal/:id', proposalController.detailReviewerProposal);

module.exports = router;
