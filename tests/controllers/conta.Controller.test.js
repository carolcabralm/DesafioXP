const sinon = require('sinon');
// const { expect } = require('chai');
const contaService = require('../../src/services/contaService');
// const contaController = require('../../src/controllers/contaController');
const { describe, before, after/* , it */ } = require('mocha');
const { response } = require('express');

describe('A rota /conta/:codCliente deve retornar o código e o saldo do cliente com código presente na URL', () => {
  const req = { params: { codCliente: 1 } };
  const res = {};
  
  const body = [
    {
      "codCliente": "1",
      "saldo": "358014.00"
  }
  ];

  before(() => {
    req.body = {};
    res.status = sinon.stub().returns(response);
    res.json = sinon.stub().returns();

    sinon.stub(contaService, 'saldo').resolves(body);
  });

  after(() => {
    contaService.saldo.restore();
  })

  /* it('é chamado o código 200', async () => {
    await contaController.saldo(req, res);
    expect(res.status.calledWith(200)).to.be.equal(true);
  })

  it('Deve retornar um objeto', async () => {
    const response = await contaController.saldo(req, res);
    expect(response).to.be.an('object');
  });

  it('Apenas o saldo com o código do cliente presente na URL deve ser retornado', async () => {
    const response = await contaController.saldo(req, res);
    expect(response).to.have.a.property('codCliente').and.to.be.equal(1);
  }) */
})