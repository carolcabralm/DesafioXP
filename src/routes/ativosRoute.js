const express = require('express');

const router = express.Router();

const ativosController = require('../controllers/ativosController');

const { auth } = require('../middlewares/token');

/**
 * @swagger
 *  tags:
 *    name: ativos
 *    description: Endpoint de ativos
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      ativosCliente:
 *        type: object
 *        required:
 *          - codCliente
 *          - codAtivo
 *          - qtdeAtivo
 *          - valor
 *        properties:
 *          codCliente:
 *            type: number
 *          codAtivo:
 *            type: string
 *          qtdeAtivo:
 *            type: number
 *          valor:
 *            type: number
 *        example:
 *          codCliente: 1
 *          codAtivo: BBDC4
 *          qtdeAtivo: 110
 *          valor: 16.35  
 * 
 */

/**
 * @swagger
 *  /ativos/codCliente:
 *     get:
 *       tags: [ativos]
 *       description: Endpoint que realiza busca dos ativos em carteira do cliente
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         201:
 *           description: Saída para ativos em carteira.
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ativosCliente'             
 */

/**
 * @swagger
 *  /ativos/codAtivo:
 *     get:
 *       tags: [ativos]
 *       description: Endpoint que realiza busca dos ativos disponíveis na XP
 *       security:
 *         - bearerAuth: []
 *       responses:
 *         201:
 *           description: Saída para ativos disponíveis.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   codCliente: 1
 *                   codAtivo: BBDC4
 *                   qtdeAtivo: 110     
 */

router.get('/ativos/:codigo', auth, ativosController.getByCodAtivoOuCliente);

module.exports = router;