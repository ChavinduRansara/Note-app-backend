const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
// const { validateNote } = require('../middleware/validators');
const auth = require('../middlewares/auth');

router.use(auth);

router.post('/create-notes', noteController.createNote);
router.get('/get-notes', noteController.getNotes);
router.get('/get-notes/:id',noteController.getNote);
router.put('/update-notes/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;