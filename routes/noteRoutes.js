const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
// const { validateNote } = require('../middleware/validators');
const auth = require('../middlewares/auth');

router.use(auth);

router.post('/', noteController.createNote);
router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;