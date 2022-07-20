const express = require('express');

const router = express.Router();

const contaController = require('../controllers/contaController');
const { validacaoDeposito, validacaoSaque } = require('../middlewares/validacaoConta');
const { auth } = require('../middlewares/token');

router.post('/conta/deposito', auth, validacaoDeposito, contaController.deposito);

router.post('/conta/saque', auth, validacaoSaque, contaController.saque);

router.get('/conta/:codCliente', contaController.saldo);

module.exports = router;