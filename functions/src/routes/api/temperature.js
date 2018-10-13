const express = require('express');
const router = express.Router();

const TemperatureController = require('../../controller/Temperatures');

router.route('/temperatures')
  // .get(TemperatureController.findAll)
  .post(TemperatureController.create);

module.exports = router;

