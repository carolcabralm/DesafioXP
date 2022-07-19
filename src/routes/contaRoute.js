const express = require('express');

const router = express.Router();

const contaController = require('../controllers/contaController');
const { validacaoDeposito, validacaoSaque } = require('../middlewares/validacaoConta');

router.post('/conta/deposito', validacaoDeposito, contaController.deposito);

router.post('/conta/saque', validacaoSaque, contaController.saque);

module.exports = router;