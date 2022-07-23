const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { swaggerConfig } = require('./src/docs/swagger.config');
const { ativosRouter, contaRouter, investimentosRouter, loginRouter } = require('./src/routes');

const app = express();

app.use(express.json());

app.use(loginRouter);

app.use(ativosRouter);

app.use(contaRouter);

app.use(investimentosRouter);

const swaggerDoc = swaggerJSDoc(swaggerConfig);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = app;