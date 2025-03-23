CREATE SEQUENCE emiratads_funcionario.funcionario_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE TABLE emiratads_funcionario.funcionario (
    codigo serial4 NOT NULL,
    cpf varchar(11) NOT NULL,
    nome varchar(50) NOT NULL,
    email varchar(30) NOT NULL,
    telefone varchar(14),
    CONSTRAINT funcionario_pkey PRIMARY KEY (codigo)
);

CREATE SEQUENCE emiratads_cliente.cliente_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE SEQUENCE emiratads_cliente.endereco_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE TABLE emiratads_cliente.endereco (
    codigo serial4 NOT NULL,
    cep varchar(8) NOT NULL,
    uf varchar(2) NOT NULL,
    cidade varchar(30) NOT NULL,
    bairro varchar(30) NOT NULL,
    rua varchar(30) NOT NULL,
    numero varchar(10) NOT NULL,
    complemento varchar(10),
    CONSTRAINT endereco_pkey PRIMARY KEY (codigo)
);

CREATE TABLE emiratads_cliente.cliente (
    codigo serial4 NOT NULL,
    cpf varchar(11) NOT NULL,
    nome varchar(50) NOT NULL,
    email varchar(30) NOT NULL,
    saldo_milhas numeric(10, 2) NOT NULL,
    endereco_codigo int4 NOT NULL,
    CONSTRAINT cliente_pkey PRIMARY KEY (codigo),
    CONSTRAINT cliente_unique_cpf UNIQUE (cpf),
    CONSTRAINT cliente_endereco_fk FOREIGN KEY (endereco_codigo) REFERENCES emiratads_cliente.endereco(codigo)
);