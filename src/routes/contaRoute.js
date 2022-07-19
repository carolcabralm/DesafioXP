const express = require('express');

const router = express.Router();

const contaController = require('../controllers/contaController');

router.post('/conta/deposito', contaController.deposito);

router.post('/conta/saque', contaController.saque);

module.exports = router;