const express = require('express');

const router = express.Router();

const contaController = require('../controllers/contaController');
const { validacaoDeposito, validacaoSaque } = require('../middlewares/validacaoConta');
const { auth } = require('../middlewares/token');
const { autorizacaoCliente, autorizacaoClienteParams } = require('../middlewares/validacaoAutorizacaoCliente');

router.post('/conta/deposito', auth, autorizacaoCliente, validacaoDeposito, contaController.deposito);

router.post('/conta/saque', auth, autorizacaoCliente, validacaoSaque, contaController.saque);

router.get('/conta/:codCliente', auth, autorizacaoClienteParams, contaController.saldo);

module.exports = router;