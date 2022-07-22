# Desafio Técnico - TurmaXP - Trybe
# [Caroline Cabral Machado](https://www.linkedin.com/in/carolcabralm/)

## Resumo
Tendo como base o dia a dia da XP, foi desenvolvida a parte de back-end para um aplicativo de investimentos em ações. Por meio deste aplicativo, um cliente da XP é capaz de realizar seu login para comprar e vender ações, consultar sua carteira de ativos, realizar depósitos e saques em sua conta e consultar seu saldo.

## Explicação da minha tomada de decisão na abordagem do desafio
Decidi fazer o projeto em JavaScript, por ser  a linguagem que tenho mais familiaridade e também por ser adequada ao tipo de projeto. Para o token de autenticação foi utilizado o JWT (JSON Web Token). Para o banco de dados foi utilizado o MySQL.

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
<details>
  <summary><strong>Possíveis retornos:</strong></summary>

  * **Caso o login seja realizado com sucesso, será retornado conforme abaixo. Obs. O token está sendo retornado apenas para que seja possível copiá-lo para passar como o parâmetro authorization no Header do Postman nos demais endpoints. Desta forma, o usuário logado terá autorização para requisitar somente suas próprias informações:**
    ```json
    	{
		"message": "Login realizado com sucesso.",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RDbGllbnRlIjoxLCJzZW5oYSI6IkNhcm9saW5lIiwiaWF0IjoxNjU4NDM0NzA5LCJleHAiOjE2NTg0Nzc5MDl9.3F9UCKVD-5tS4KocG7bfoSWv2DwDUem2TKbld-ZA16s"
    	}
    ```

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
<details>
  <summary><strong>Possíveis retornos:</strong></summary>
  
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
    
  * **Caso a compra do ativo seja realizada com sucesso, o retorno será:**
    ```json
    	{
		"message": "Ativo inserido com sucesso. Seu saldo atual é de ${saldo_atual}."
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
<details>
  <summary><strong>Possíveis retornos:</strong></summary>
  
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

  * **Caso a venda do ativo seja realizada com sucesso, o retorno será:**
    ```json
    	{
		"message": "Ativo removido com sucesso. Seu saldo atual é de ${saldo_atual}."
   	}
    ```

<br />
</details>


### Endpoint GET (/ativos/{codCliente})

- Ao acessar este endpoint, o usuário poderá consultar sua carteira de ativos, com informações de quantidade e preço unitário de cada ativo.
- O corpo da requisição deverá ter o seguinte formato:
```json
{
    "codCliente": 1,
    "codAtivo": "BBDC4",
    "qtdeAtivo": 5
}
```
<details>
  <summary><strong>Possíveis retornos:</strong></summary>

  * **Caso o usuário da requisição não seja o mesmo usuário logado, o retorno será:**
    ```json
    {
   	  FALTA
    }
    ```

  * **QUE MAIS:**
    ```json
    {
   	 FALTA
    }
    ```
 * **QUE MAIS:**
    ```json
    {
   	 FALTA
    }
    ```

  * **QUE MAIS:**
    ```json
    {
   	 FALTA
    }
    ```

<br />
</details>

### Endpoint GET (/ativos/{codAtivo})


### Endpoint POST (/conta/deposito)
```json
{
    "codCliente": 1,
    "codAtivo": "BBDC4",
    "qtdeAtivo": 5
}
```
<details>
  <summary><strong>Possíveis retornos:</strong></summary>

  * **Caso o usuário da requisição não seja o mesmo usuário logado, o retorno será:**
    ```json
    {
   	  FALTA
    }
    ```

  * **QUE MAIS**
    ```json
    {
   	 FALTA
    }
    ```
 * **QUE MAIS:**
    ```json
    {
   	 FALTA
    }
    ```

  * **QUE MAIS:**
    ```json
    {
   	 FALTA
    }
    ```

<br />
</details>


### Endpoint POST (/conta/saque)
```json
{
    "codCliente": 1,
    "codAtivo": "BBDC4",
    "qtdeAtivo": 5
}
```
<details>
  <summary><strong>Possíveis retornos:</strong></summary>

  * **Caso o usuário da requisição não seja o mesmo usuário logado, o retorno será:**
    ```json
    {
   	  FALTA
    }
    ```

  * **QUE MAIS**
    ```json
    {
   	 FALTA
    }
    ```
 * **QUE MAIS:**
    ```json
    {
   	 FALTA
    }
    ```

  * **QUE MAIS:**
    ```json
    {
   	 FALTA
    }
    ```

<br />
</details>


### Endpoint GET (/conta/{codCliente})


