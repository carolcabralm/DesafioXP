DROP DATABASE IF EXISTS desafio_xp;

CREATE DATABASE desafio_xp;

USE desafio_xp;

CREATE TABLE IF NOT EXISTS  ativos
(
    codAtivo VARCHAR(5) PRIMARY KEY NOT NULL,
    qtdeAtivo INT NOT NULL,
    precoAtivo DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS  clientes
(
	codCliente INT AUTO_INCREMENT PRIMARY KEY,
	senha VARCHAR(30) NOT NULL,
    saldo DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS  carteira
(
	codAtivo VARCHAR(5) NOT NULL,
    qtdeAtivo INT NOT NULL,
	codCliente INT NOT NULL,
    FOREIGN KEY (codAtivo) REFERENCES desafio_xp.ativos (codAtivo) ON DELETE CASCADE,
    FOREIGN KEY (codCliente) REFERENCES desafio_xp.clientes (codCliente) ON DELETE CASCADE
);

SET SQL_SAFE_UPDATES = 0;

INSERT INTO desafio_xp.ativos (codAtivo, qtdeAtivo, precoAtivo)
VALUES ('PETR4', 14300, 27.66),
	('BBDC4', 17900, 16.35),
	('USIM5', 23400, 8.11);
    
INSERT INTO desafio_xp.clientes (codCliente, senha, saldo)
VALUES (1, 'Caroline', 358014),
	(2, 'Fábio', 50000),
	(3, 'Lívia', 1000);
    
INSERT INTO desafio_xp.carteira (codAtivo, qtdeAtivo, codCliente)
VALUES ('PETR4', 541, 1),
	('BBDC4', 100, 2),
	('USIM5', 10, 3);