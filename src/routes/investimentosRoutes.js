const express = require('express');

const router = express.Router();

const investimentosController = require('../controllers/investimentosController');
const { validacaoInvestimentosComprar, validacaoInvestimentosVender } = require('../middlewares/validacaoInvestimentos');

router.post('/investimentos/comprar', validacaoInvestimentosComprar, investimentosController.investimentosComprar);

router.post('/investimentos/vender',  validacaoInvestimentosVender, investimentosController.investimentosVender);

module.exports = router;