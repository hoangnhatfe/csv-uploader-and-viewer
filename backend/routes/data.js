const express = require('express');
const router = express.Router();
const multer = require('multer');
const csvController = require('../controllers/csvController');

const upload = multer({ dest: 'uploads/' });

// File upload route
router.post('/upload', upload.single('file'), csvController.uploadCsv);

// Data retrieval route with pagination
router.get('/', csvController.getData);

// Data search route
router.get('/search', csvController.searchData);

module.exports = router;