const express = require('express');
const { ativosRouter, contaRouter, investimentosRouter } = require('./src/routes');

const app = express();

app.use(express.json());

app.use(ativosRouter);

app.use(contaRouter);

app.use(investimentosRouter);

module.exports = app;