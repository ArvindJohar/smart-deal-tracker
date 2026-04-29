const express = require('express');
const router = express.Router();
const { createDeal, getDeals, updateDeal, deleteDeal, getAnalytics, getTopDeals } = require('../controllers/dealController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createDeal);
router.get('/', protect, getDeals);
router.get('/analytics', protect, getAnalytics);
router.get('/top', protect, getTopDeals);
router.patch('/:id', protect, updateDeal);
router.delete('/:id', protect, deleteDeal);
module.exports = router;