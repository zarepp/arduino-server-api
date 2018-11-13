const express = require('express');
const router = express.Router();

const UserController = require('../../controller/Users');

router.route('/users')
  .get(UserController.findAll)
  .post(UserController.create);

router.route('/users/:id')
  // .get(UserController.find)
  .put(UserController.upsert);
  // .delete(UserController.delete);

module.exports = router;

