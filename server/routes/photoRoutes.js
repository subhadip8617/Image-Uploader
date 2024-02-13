const express = require('express');
const { uploadPhotoController } = require('../controllers/photoCtrl');

const router = express.Router();

router.post('/uploadPhoto', uploadPhotoController)

module.exports = router;