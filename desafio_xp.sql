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
	nomeCliente VARCHAR(30) NOT NULL,
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
	('USIM5', 23400, 8.11),
	('MMXM3', 1000, 15.65),
	('ITUB4', 8000, 22.25),
	('HAGA4', 200, 1.27),
	('CCRO3', 3100, 11.95),
	('GOAU4', 16500, 9.39),
	('GOLL4', 9900, 7.63),
	('TELB4', 100, 12.09),
	('VALE3', 400, 67.18),
	('BBAS3', 2500, 32.46),
	('ECOR3', 13900, 5.09),
	('FLRY3', 400, 16.08),
	('GRND3', 200, 6.51),
	('MILS3', 1200, 6.54),
	('CYRE3', 400, 12.15),
	('POSI3', 4500, 5.75);
	
    
INSERT INTO desafio_xp.clientes (codCliente, nomeCliente, saldo)
VALUES (1, 'Caroline', 358014),
	(2, 'Fábio', 50000),
	(3, 'Lívia', 1000);
    
INSERT INTO desafio_xp.carteira (codAtivo, qtdeAtivo, codCliente)
VALUES ('PETR4', 541, 1),
	('BBDC4', 100, 2),
	('USIM5', 10, 3);