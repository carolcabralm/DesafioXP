const express = require('express');

const router = express.Router();

const investimentosController = require('../controllers/investimentosController');
const { validacaoInvestimentosComprar, validacaoInvestimentosVender } = require('../middlewares/validacaoInvestimentos');
const { auth } = require('../middlewares/token');
const { autorizacaoCliente } = require('../middlewares/validacaoAutorizacaoCliente');

router.post('/investimentos/comprar', auth, autorizacaoCliente, validacaoInvestimentosComprar, investimentosController.investimentosComprar);

router.post('/investimentos/vender', auth, autorizacaoCliente, validacaoInvestimentosVender, investimentosController.investimentosVender);

module.exports = router;