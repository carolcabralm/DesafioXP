const express = require('express');
const { ativosRouter } = require('./src/routes');

const app = express();

app.use(express.json());

app.use(ativosRouter);

module.exports = app;