const express = require('express');

const router = express.Router();

const investimentosController = require('../controllers/investimentosController');
const { validacaoInvestimentosComprar, validacaoInvestimentosVender } = require('../middlewares/validacaoInvestimentos');
const { auth } = require('../middlewares/token');
const { autorizacaoCliente } = require('../middlewares/validacaoAutorizacaoCliente');

/**
 * @swagger
 *  tags:
 *    name: investimentos
 *    description: Endpoint de investimentos
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      investIn:
 *        type: object
 *        required:
 *          - codCliente
 *          - codAtivo
 *          - qtdeAtivo
 *        properties:
 *          codCliente:
 *            type: number
 *          codAtivo:
 *            type: string
 *          qtdeAtivo:
 *            type: number
 *        example:
 *          codCliente: 1
 *          codAtivo: BBDC4
 *          qtdeAtivo: 5
 */


/**
 * @swagger
 *  /investimentos/comprar:
 *     post:
 *       tags: [investimentos]
 *       description: Endpoint realiza compra de um ativo
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/investIn'
 *       responses:
 *         200:
 *           description: Saída para compra de ativos realizada com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   message: Ativo adicionado com sucesso. Seu saldo atual é de 371815.15.
 *         400:
 *           description: Saída para saldo insuficiente na tentativa de compra de um ativo.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   message: Saldo insuficiente.
 */


router.post('/investimentos/comprar', auth, autorizacaoCliente, validacaoInvestimentosComprar, investimentosController.investimentosComprar);

/**
 * @swagger
 *  /investimentos/vender:
 *     post:
 *       tags: [investimentos]
 *       description: Endpoint realiza venda de um ativo
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/investIn'
 *       responses:
 *         200:
 *           description: Saída para venda de ativos realizada com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   message: Ativo removido com sucesso. Seu saldo atual é de 140477.50.
 *         400:
 *           description: Saída para quantidade do ativo maior do que o disponível em carteira para venda.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   message: Quantidade de ativo disponível em carteira menor que a desejada para venda.
 */


router.post('/investimentos/vender', auth, autorizacaoCliente, validacaoInvestimentosVender, investimentosController.investimentosVender);

module.exports = router;