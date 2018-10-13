const express = require('express');
const router = express.Router();

const CoursesController = require('../../controller/Courses');

router.route('/courses')
  .get(CoursesController.findAll)
  .post(CoursesController.create);

// router.route('/courses/:id')
//   .get(CoursesController.find)
//   .put(CoursesController.upsert)
//   .delete(CoursesController.delete);

module.exports = router;

