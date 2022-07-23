const express = require('express');

const router = express.Router();

const contaController = require('../controllers/contaController');
const { validacaoValor, validacaoSaque } = require('../middlewares/validacaoConta');
const { auth } = require('../middlewares/token');
const { autorizacaoCliente, autorizacaoClienteParams } = require('../middlewares/validacaoAutorizacaoCliente');
const { validationsConta } = require('../middlewares/joiValidations');

/**
 * @swagger
 *  tags:
 *    name: conta
 *    description: Endpoint de conta
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      contaIn:
 *        type: object
 *        required:
 *          - codCliente
 *          - valor
 *        properties:
 *          codCliente:
 *            type: number
 *          valor:
 *            type: number
 *        example:
 *          codCliente: 1
 *          valor: 55
 */

/**
 * @swagger
 *  /conta/deposito:
 *     post:
 *       tags: [conta]
 *       description: Endpoint que realiza depósito na conta digital
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/contaIn'
 *       responses:
 *         201:
 *           description: Saída para depósito realizado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   message: Depósito realizado com sucesso.
 */

router.post('/conta/deposito', validationsConta, auth, autorizacaoCliente, validacaoValor, contaController.deposito);

/**
 * @swagger
 *  /conta/saque:
 *     post:
 *       tags: [conta]
 *       description: Endpoint que realiza saque na conta digital
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/contaIn'
 *       responses:
 *         201:
 *           description: Saída para saque na conta digital realizada com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   message: Saque realizado com sucesso.
 *         400:
 *           description: Saída para saldo insuficiente para saque na conta digital.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   message: Saldo insuficiente.
 */

router.post('/conta/saque', validationsConta, auth, autorizacaoCliente, validacaoValor, validacaoSaque, contaController.saque);

router.get('/conta/:codCliente', auth, autorizacaoClienteParams, contaController.saldo);

module.exports = router;