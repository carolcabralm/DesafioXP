# Desafio Técnico - TurmaXP - Trybe
# [Caroline Cabral Machado](https://www.linkedin.com/in/carolcabralm/)

## Resumo
Tendo como base o dia a dia da XP, foi desenvolvida a parte de back-end para um aplicativo de invetimentos em ações. Por meio deste aplicativo, um cliente da XP é capaz de realizar seu login para comprar e vender ações, consultar sua carteira de ativos e realizar depósitos e saques em sua conta.

## Explicação da minha tomada de decisão na abordagem do desafio

## Instruções de como compilar e executar o projeto

docker-compose up -d
docker exec -it desafio_xp bash
npm run restore
npm start

## Endpoints

* POST (/login)
* POST (/investimentos/comprar)
* POST (/investimentos/vender)
* GET (/ativos/{codCliente})
* GET (/ativos/{codAtivo})
* POST (/conta/deposito)
* POST (/conta/saque)
* GET (/conta/{codCliente})

## Detalhes

### Endpoint POST (/login)

- Ao acessar este endpoint, o usuário deve ser capaz de realizar seu login e, assim, ter seu acesso autorizado aos demais endpoits.
- O corpo da requisição deverá ter o seguinte formato:

- Será retornado:



### Endpoint POST (/investimentos/comprar)

- Ao acessar este endpoint, o usuário poderá realizar a compra de um ativo.
- O corpo da requisição deverá ter o seguinte formato:

- Caso o usuário da requisição não seja o mesmo usuário logado, o retorno será:

- Caso o usuário tente comprar um ativo inexistente na base de ativos da XP, o retorno será:

- Caso o usuário tente comprar uma quantidade maior do ativo que a existente, o retorno será:

- Caso o usuário não tenha saldo suficiente para a compra da quantidade desejada do ativo, o retorno será:



### Endpoint POST (/investimentos/vender)

- Ao acessar este endpoint, o usuário poderá realizar a venda de um ativo.
- O corpo da requisição deverá ter o seguinte formato:

- Caso o usuário da requisição não seja o mesmo usuário logado, o retorno será:

- Caso o usuário tente vender um ativo inexistente em sua carteira, o retorno será:

- Caso o usuário tente vender uma quantidade maior do ativo que a existente em sua carteira, o retorno será:


### Endpoint GET (/ativos/{codCliente})

- Ao acessar este endpoint, o usuário poderá consultar sua carteira de ativos, com informações de quantidade e preço unitário de cada ativo.
- O corpo da requisição deverá ter o seguinte formato:

- Caso o usuário da requisição não seja o mesmo usuário logado, o retorno será:

### Endpoint GET (/ativos/{codAtivo})


### Endpoint POST (/conta/deposito)


### Endpoint POST (/conta/saque)


### Endpoint GET (/conta/{codCliente})


