const express = require('express');

const router = express.Router();

const investimentosController = require('../controllers/investimentosController');

router.post('/investimentos/comprar', investimentosController.investimentosComprar);

router.post('/investimentos/vender',  investimentosController.investimentosVender);

module.exports = router;