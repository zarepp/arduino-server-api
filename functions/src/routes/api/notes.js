const express = require('express');
const router = express.Router();

const NotesController = require('../../controller/Notes');

router.route('/notes')
  .get(NotesController.findAll)
  .post(NotesController.create);

router.route('/notes/:id')
  .get(NotesController.find)
  // .put(CoursesController.upsert)
  .delete(NotesController.delete);

module.exports = router;

