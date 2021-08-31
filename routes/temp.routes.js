const { Router } = require('express');
const express = require('express');
const router = express.Router();
const tempController = require('../controllers/temp.controller');

router.get('/', tempController.getTemps);
router.get('/:id', tempController.getTemp);

module.exports = router;