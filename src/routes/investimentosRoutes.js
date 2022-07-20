const express = require('express');

const router = express.Router();

const investimentosController = require('../controllers/investimentosController');
const { validacaoInvestimentosComprar, validacaoInvestimentosVender } = require('../middlewares/validacaoInvestimentos');
const { auth } = require('../middlewares/token');

router.post('/investimentos/comprar', auth, validacaoInvestimentosComprar, investimentosController.investimentosComprar);

router.post('/investimentos/vender', auth,  validacaoInvestimentosVender, investimentosController.investimentosVender);

module.exports = router;