const sinon = require('sinon');
const { expect } = require('chai');
const connection = require("../../src/models/connection");
const contaModel = require('../../src/models/contaModel');


describe('A rota /conta/:codCliente deve retornar o código e o saldo do cliente com código presente na URL', () => {
  before(async () => {
    const body = [{
      "codCliente": "1",
      "saldo": "358014.00"
  }];

    sinon.stub(connection, 'execute').resolves(body);
  });

  after(async () => {
    connection.execute.restore();
  })

  it('Deve retornar um objeto', async () => {
    const response = await contaModel.saldo(1);
    expect (response).to.be.an('object');
  });

  it('Apenas o saldo com o código do cliente presente na URL deve ser retornado', async () => {
    const response = await contaModel.saldo(1);
    expect(response).to.have.a.property('codCliente').and.to.be.equal('1');
  })
});