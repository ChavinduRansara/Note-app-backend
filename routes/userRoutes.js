const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');
const { validateRegistration, validateLogin, validateProfileUpdate, validatePasswordUpdate } = require('../middlewares/validators');

// Public routes
router.post('/register', validateRegistration, userController.register);
router.post('/login', validateLogin, userController.login);

// Protected routes
router.use(auth);
router.get('/profile', userController.getProfile);
router.put('/profile', validateProfileUpdate, userController.updateProfile);
router.put('/password', validatePasswordUpdate, userController.updatePassword);
router.delete('/account', userController.deleteAccount);

module.exports = router;