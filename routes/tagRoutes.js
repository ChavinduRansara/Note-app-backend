const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const auth = require('../middlewares/auth');

router.use(auth); // All tag routes require authentication

router.get('/', tagController.getTags);
router.delete('/cleanup', tagController.deleteUnusedTags);

module.exports = router;