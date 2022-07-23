const express = require('express');

const router = express.Router();

const loginController = require('../controllers/loginController');
const { validationsLogin } = require('../middlewares/joiValidations');

/**
 * @swagger
 *  tags:
 *    name: login
 *    description: Endpoint de login
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      loginIn:
 *        type: object
 *        required:
 *          - codCliente
 *          - senha
 *        properties:
 *          codCliente:
 *            type: string
 *          senha:
 *            type: string
 *        example:
 *          codCliente: 1
 *          senha: Caroline
 */

/**
 * @swagger
 *  /login:
 *     post:
 *       tags: [login]
 *       description: Endpoint realiza login do usuário
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/loginIn'
 *       responses:
 *         200:
 *           description: Saída para login realizado com sucesso.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   message: Login realizado com sucesso.
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJzZW5oYSI6IkNhcm9saW5lIiwiaWF0IjoxNjU4NTIyNDg2LCJleHAiOjE2NTg1NjU2ODZ9.CrxSH1TyJAXtaLdBkm4JxyWhUoS6ZnRNts-oGuM5LRY
 *         404:
 *           description: Saída para usuário ou senha incorretos.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 example:
 *                   message: Usuário ou senha incorretos. Favor verificar seu dados.
 */

router.post('/login', validationsLogin, loginController.login);

module.exports = router;