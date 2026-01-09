const express = require('express');
const router = express.Router();
const reviewerController = require('../../controllers/admin/reviewerController');

// Halaman Utama Kelola Reviewer
router.get('/', reviewerController.index);

module.exports = router;