const express = require('express');

const router = express.Router();

const ativosController = require('../controllers/ativosController');

const { auth } = require('../middlewares/token');

router.get('/ativos/:codigo', auth, ativosController.getByCodAtivoOuCliente);

module.exports = router;