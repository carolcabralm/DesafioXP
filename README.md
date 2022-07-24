# Desafio Técnico - TurmaXP - Trybe
# [Caroline Cabral Machado](https://www.linkedin.com/in/carolcabralm/)

## Resumo
Tendo como base o dia a dia da XP, foi desenvolvida a parte de back-end para um aplicativo de investimentos em ações. Por meio deste aplicativo, um cliente da XP é capaz de realizar seu login para comprar e vender ações, consultar sua carteira de ativos, realizar depósitos e saques em sua conta e consultar seu saldo.

## Explicação da decisão na abordagem do desafio
* Decidi fazer o projeto em JavaScript, por ser  a linguagem que tenho mais familiaridade e também por ser adequada ao tipo de projeto. Para o token de autenticação foi utilizado o JWT (JSON Web Token). Para o banco de dados foi utilizado o MySQL. Foi construída uma base de dados com 3 clientes cadastrados, cada um com sua carteira de ativos e saldo em conta digital. Além disso, foi feita uma lista de ativos existentes, cada um com suas quantidades e preços disponíveis para compra e venda.

<div class="postman-run-button"
data-postman-action="collection/import"
data-postman-var-1="c97f9ca8e6ccf76f73e5"></div>
<script type="text/javascript">
  (function (p,o,s,t,m,a,n) {
    !p[s] && (p[s] = function () { (p[t] || (p[t] = [])).push(arguments); });
    !o.getElementById(s+t) && o.getElementsByTagName("head")[0].appendChild((
      (n = o.createElement("script")),
      (n.id = s+t), (n.async = 1), (n.src = m), n
    ));
  }(window, document, "_pm", "PostmanRunObject", "https://run.pstmn.io/button.js"));
</script>

Obs.:
* O Swagger foi feito, mas necessita de revisão. Apesar de ter implementado o processo de autenticação, não está passando pela autenticação do token gerado, não chegando assim na rotas que necessitam dele. Encontra-se na rota (/docs).

* O deploy foi feito, entretanto também necessita de revisão: https://deploy-desafio-xp-carolcabralm.herokuapp.com/
Ex.: https://deploy-desafio-xp-carolcabralm.herokuapp.com/ativos/PETR4

## Instruções de como compilar e executar o projeto

Execute os comandos na ordem em que seguem abaixo:

1. `docker-compose up -d`  Para inicializar os containers do docker.
2. `docker exec -it desafio_xp bash`  Para acesso ao terminal interativo do container criado pelo compose.
3. `npm install`  Para instalar as dependências.
4. `npm run restore`  Para restaurar o banco de dados.
5. `npm start`  Para executar o projeto.

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
```json
    {
        "codCliente": 1,
        "senha": "Caroline"
    }
```
- Caso o login seja realizado com sucesso, será retornado conforme abaixo. Obs. O token está sendo retornado para que seja possível copiá-lo para passar como o parâmetro authorization no Header do Postman nos demais endpoints. Desta forma, o usuário logado terá autorização para requisitar somente suas próprias informações:
```json
    {
        "message": "Login realizado com sucesso.",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJzZW5oYSI6IkNhcm9saW5lIiwiaWF0IjoxNjU4NDM0NzA5LCJleHAiOjE2NTg0Nzc5MDl9.3F9UCKVD-5tS4KocG7bfoSWv2DwDUem2TKbld-ZA16s"
    }
```

<details>
  <summary><strong>Possíveis retornos em caso de erro:</strong></summary>

  * **Caso usuário ou senha estejam incorretos, será retornado:**
  ```json
      {
          "message": "Usuário ou senha incorretos. Favor verificar seu dados."
      }
  ```

<br />
</details>

### Endpoint POST (/investimentos/comprar)

- Ao acessar este endpoint, o usuário poderá realizar a compra de um ativo.
- O corpo da requisição deverá ter o seguinte formato:
```json
    {
        "codCliente": 1,
        "codAtivo": "BBDC4",
        "qtdeAtivo": 5
    }
```

- Caso a compra do ativo seja realizada com sucesso, o retorno será:
```json
    {
        "message": "Ativo inserido com sucesso. Seu saldo atual é de ${saldo_atual}."
    }
```

<details>
  <summary><strong>Possíveis retornos em caso de erro:</strong></summary>
  
  * **Caso o usuário da requisição não esteja logado, o retorno será:**
  ```json
      {
          "message": "Usuário não logado."
      }
  ```
    
  * **Caso a sessão do usuário da requisição esteja expirada (após 12h do login), o retorno será:**
  ```json
      {
          "message": "Sessão expirada. Realize login novamente para continuar."
      }
  ```

  * **Caso o usuário da requisição solicite informações de outro usuário, o retorno será:**
  ```json
      {
          "message": "Acesso negado."
      }
  ```

  * **Caso o usuário tente comprar um ativo inexistente na base de ativos da XP, o retorno será:**
  ```json
      {
          "message": "Ativo não encontrado."
      }
  ```
  * **Caso o usuário tente comprar uma quantidade maior do ativo que a existente, o retorno será:**
  ```json
      {
          "message": "Quantidade de ativo disponível menor que a desejada."
      }
  ```

  * **Caso o usuário não tenha saldo suficiente para a compra da quantidade desejada do ativo, o retorno será:**
  ```json
      {
          "message": "Saldo insuficiente."
      }
  ```

<br />
</details>


### Endpoint POST (/investimentos/vender)

- Ao acessar este endpoint, o usuário poderá realizar a venda de um ativo.
- O corpo da requisição deverá ter o seguinte formato:
```json
    {
        "codCliente": 1,
        "codAtivo": "BBDC4",
        "qtdeAtivo": 5
    }
```

- Caso a venda do ativo seja realizada com sucesso, o retorno será:
```json
    {
        "message": "Ativo removido com sucesso. Seu saldo atual é de ${saldo_atual}."
    }
```

<details>
  <summary><strong>Possíveis retornos em caso de erro:</strong></summary>
  
  * **Caso o usuário da requisição não esteja logado, o retorno será:**
   
  ```json
      {
          "message": "Usuário não logado."
      }
  ```
    
  * **Caso a sessão do usuário da requisição esteja expirada (após 12h do login), o retorno será:**
  ```json
      {
          "message": "Sessão expirada. Realize login novamente para continuar."
      }
  ```

  * **Caso o usuário da requisição solicite informações de outro usuário, o retorno será:**
  ```json
      {
          "message": "Acesso negado."
      }
  ```

  * **Caso o usuário tente vender um ativo inexistente em sua carteira, o retorno será:**
  ```json
      {
          "message": "Ativo inexistente na carteira."
      }
  ```
 * **Caso o usuário tente vender uma quantidade maior do ativo que a existente em sua carteira, o retorno será:**
  ```json
      {
          "message": "Quantidade de ativo disponível em carteira menor que a desejada para venda."
      }
  ```

<br />
</details>


### Endpoint GET (/ativos/{codCliente})

- Ao acessar este endpoint, o usuário poderá consultar sua carteira de ativos, com informações de quantidade e preço unitário de cada ativo.
- Em caso de sucesso na requisição, segue um exemplo de retorno, que dependerá da carteira do cliente selecionado:
```json
    [
        {
            "codCliente": 1,
            "codAtivo": "BBDC4",
            "qtdeAtivo": 40,
            "valor": "16.35"
        },
        {
            "codCliente": 1,
            "codAtivo": "PETR4",
            "qtdeAtivo": 1,
            "valor": "27.66"
        }
    ]
```

<details>
  <summary><strong>Possíveis retornos em caso de erro:</strong></summary>
  
  * **Caso o usuário da requisição não esteja logado, o retorno será:**   
  ```json
      {
          "message": "Usuário não logado."
      }
  ```
    
  * **Caso a sessão do usuário da requisição esteja expirada (após 12h do login), o retorno será:**
  ```json
      {
          "message": "Sessão expirada. Realize login novamente para continuar."
      }
  ```

  * **Caso o usuário da requisição solicite informações de outro usuário, o retorno será:**
  ```json
      {
          "message": "Acesso negado."
      }
  ```

  
<br />
</details>

### Endpoint GET (/ativos/{codAtivo})
- Ao acessar este endpoint, o usuário poderá consultar os ativos disponíveis para compra na XP, com informações de quantidade e preço unitário de cada ativo.
- Em caso de sucesso na requisição, segue um exemplo de retorno, que dependerá do ativo escolhido:
```json
    {
        "codAtivo": "PETR4",
        "qtdeAtivo": 14300,
        "precoAtivo": "27.66"
    }
```

<details>
  <summary><strong>Possíveis retornos em caso de erro:</strong></summary>

  * **Caso o usuário da requisição não esteja logado, o retorno será:**   
  ```json
      {
          "message": "Usuário não logado."
      }
  ```
    
  * **Caso a sessão do usuário da requisição esteja expirada (após 12h do login), o retorno será:**
  ```json
      {
          "message": "Sessão expirada. Realize login novamente para continuar."
      }
  ```

<br />
</details>


### Endpoint POST (/conta/deposito)
- Ao acessar este endpoint, o usuário poderá realizar um depósito em sua conta digital.
- O corpo da requisição deverá ter o seguinte formato:
```json
    {
        "codCliente": 1,
        "valor": 44
    }
```

- Caso o depósito seja realizado com sucesso, o retorno será:
```json
    {
        "message": "Depósito realizado com sucesso."
    }
```

<details>
  <summary><strong>Possíveis retornos em caso de erro:</strong></summary>
  
  * **Caso o usuário da requisição não esteja logado, o retorno será:**   
  ```json
      {
          "message": "Usuário não logado."
      }
  ```
    
  * **Caso a sessão do usuário da requisição esteja expirada (após 12h do login), o retorno será:**
  ```json
      {
          "message": "Sessão expirada. Realize login novamente para continuar."
      }
  ```

  * **Caso o usuário da requisição tente realizar o depósito na conta de outro cliente, o retorno será:**
  ```json
      {
          "message": "Acesso negado."
      }
  ```

 * **Caso o usuário da requisição tente realizar um depósito com valor igual ou inferior a zero, o retorno será:**
  ```json
      {
          "message": "Valor deve ser maior que zero."
      }
  ```


<br />
</details>


### Endpoint POST (/conta/saque)
- Ao acessar este endpoint, o usuário poderá realizar um saque em sua conta digital.
- O corpo da requisição deverá ter o seguinte formato:
```json
    {
        "codCliente": 1,
        "valor": 150
    }
```
- Caso o saque seja realizado com sucesso, o retorno será:
```json
    {
        "message": "Saque realizado com sucesso."
    }
```

<details>
  <summary><strong>Possíveis retornos em caso de erro:</strong></summary>
  
  * **Caso o usuário da requisição não esteja logado, o retorno será:**   
  ```json
      {
          "message": "Usuário não logado."
      }
  ```
    
  * **Caso a sessão do usuário da requisição esteja expirada (após 12h do login), o retorno será:**
  ```json
      {
          "message": "Sessão expirada. Realize login novamente para continuar."
      }
  ```

  * **Caso o usuário da requisição tente realizar o saque na conta de outro cliente, o retorno será:**
  ```json
      {
          "message": "Acesso negado."
      }
  ```

 * **Caso o usuário da requisição tente realizar um saque de valor maior que o saldo disponível em sua conta digital, o retorno será:**
  ```json
      {
          "message": "Saldo insuficiente."
      }
  ```
  * **Caso o usuário da requisição tente realizar um saque com valor igual ou inferior a zero, o retorno será:**
  ```json
      {
          "message": "Valor deve ser maior que zero."
      }
  ```


<br />
</details>


### Endpoint GET (/conta/{codCliente})
- Ao acessar este endpoint, o usuário poderá consultar seu saldo em sua conta digital.
- Caso a requisição seja realizado com sucesso, segue um exemplo de retorno, que dependerá do cliente escolhido:
```json
    {
        "codCliente": "1",
        "saldo": "372060.40"
    }
```

<details>
  <summary><strong>Possíveis retornos em caso de erro:</strong></summary>
  
  * **Caso o usuário da requisição não esteja logado, o retorno será:**   
  ```json
      {
          "message": "Usuário não logado."
      }
  ```
    
  * **Caso a sessão do usuário da requisição esteja expirada (após 12h do login), o retorno será:**
  ```json
      {
          "message": "Sessão expirada. Realize login novamente para continuar."
      }
  ```

  * **Caso o usuário da requisição tente acessar o saldo da conta de outro cliente, o retorno será:**
  ```json
      {
          "message": "Acesso negado."
      }
  ```

<br />
</details>