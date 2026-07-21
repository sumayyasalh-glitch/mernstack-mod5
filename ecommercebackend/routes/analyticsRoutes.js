const express = require('express');
const { getRecommendations } = require('../controllers/analyticsController');
const router = express.Router();

router.get('/', getRecommendations);

module.exports = router;
