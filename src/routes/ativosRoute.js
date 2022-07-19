const express = require('express');

const router = express.Router();

const ativosController = require('../controllers/ativosController');

router.get('/ativos/:codigo', ativosController.getByCodAtivoOuCliente);

module.exports = router;