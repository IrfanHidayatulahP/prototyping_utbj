const express = require('express');
const router = express.Router();
const penelitianController = require('../../controllers/reviewer/penelitianController');

// Route List Penelitian
router.get('/penelitian', penelitianController.listReviewerPenelitian);

// Route Detail Penelitian
router.get('/penelitian/:id', penelitianController.detailPenelitian);

// Tambahkan di penelitianRoutes.js
router.get('/penelitian/:id/review', penelitianController.renderReviewForm);
router.post('/penelitian/:id/review', penelitianController.submitReview);

module.exports = router;