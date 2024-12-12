const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const auth = require('../middlewares/auth');

router.use(auth); // All category routes require authentication

router.post('/post-category', categoryController.createCategory);
router.get('/get-category', categoryController.getCategories);
router.put('/update-category/:id', categoryController.updateCategory);
router.delete('/delete-category/:id', categoryController.deleteCategory);

module.exports = router;