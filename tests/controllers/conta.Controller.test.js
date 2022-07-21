const sinon = require('sinon');
const { expect } = require('chai');
const contaService = require('../../src/services/contaService');
const contaController = require('../../src/controllers/contaController');

describe('Através do caminho /products/:id, apenas o produto com o id presente na URL deve ser retornado', () => {
  const req = { params: {codCliente: 1} };
  const res = {};
  
  const body = [
    {
      "codCliente": "1",
      "saldo": "358014.00"
  }
  ];

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(contaService, 'saldo').resolves(body);
  });

  after(() => {
    contaService.saldo.restore();
  })

  it('Deve retornar um objeto', async () => {
    const response = await contaController.saldo(req, res);
    expect(response).to.be.an('object');
  });

  it('Apenas o produto com o id presente na URL deve ser retornado', async () => {
    const response = await contaController.saldo(1);
    expect(response).to.have.a.property('codCliente').and.to.be.equal(1);
  })
})