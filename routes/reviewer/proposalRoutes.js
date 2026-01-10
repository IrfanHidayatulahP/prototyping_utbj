const express = require('express');
const router = express.Router();
const proposalController = require('../../controllers/reviewer/proposalController');

router.get('/proposal', proposalController.listReviewerProposal);
router.get('/proposal/:id', proposalController.detailReviewerProposal);

// Halaman Form Penilaian
router.get('/proposal/:id/review', proposalController.renderReviewForm);

// Proses Simpan Penilaian
router.post('/proposal/:id/review', proposalController.submitReview);

module.exports = router;
