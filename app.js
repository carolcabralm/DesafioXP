const express = require('express');
const { ativosRouter, contaRouter } = require('./src/routes');

const app = express();

app.use(express.json());

app.use(ativosRouter);

app.use(contaRouter)

module.exports = app;