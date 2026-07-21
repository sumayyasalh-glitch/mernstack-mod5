const express = require('express');
const { getProfile, updateProfile, deleteProfile } = require('../controllers/userProfileController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.delete('/', protect, deleteProfile);

module.exports = router;
