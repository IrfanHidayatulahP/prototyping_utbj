const express = require('express');
const router = express.Router();
const penelitianController = require('../../controllers/reviewer/penelitianController');

// Route List Penelitian
router.get('/penelitian', penelitianController.listReviewerPenelitian);

// Route Detail Penelitian
router.get('/penelitian/:id', penelitianController.detailReviewerPenelitian);

module.exports = router;