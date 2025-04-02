CREATE SEQUENCE emiratads_funcionario.funcionario_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 2147483647
	START 1
	CACHE 1
	NO CYCLE;

CREATE TABLE emiratads_funcionario.funcionario (
    codigo bigserial NOT NULL,
    cpf varchar(11) NOT NULL,
    nome varchar(50) NOT NULL,
    email varchar(30) NOT NULL,
    telefone varchar(14),
    ativo boolean NOT NULL DEFAULT true,
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
    codigo bigserial NOT NULL,
    cep varchar(8) NOT NULL,
    uf varchar(2) NOT NULL,
    cidade varchar(30) NOT NULL,
    bairro varchar(30) NOT NULL,
    rua varchar(30) NOT NULL,
    numero varchar(10) NOT NULL,
    complemento varchar(10),
    ativo boolean NOT NULL DEFAULT true,
    CONSTRAINT endereco_pkey PRIMARY KEY (codigo)
);

CREATE TABLE emiratads_cliente.cliente (
    codigo bigserial NOT NULL,
    cpf varchar(11) NOT NULL,
    nome varchar(50) NOT NULL,
    email varchar(30) NOT NULL,
    saldo_milhas numeric(10, 2) NOT NULL,
    endereco_codigo bigint NOT NULL,
    ativo boolean NOT NULL DEFAULT true,
    CONSTRAINT cliente_pkey PRIMARY KEY (codigo),
    CONSTRAINT cliente_unique_cpf UNIQUE (cpf),
    CONSTRAINT cliente_endereco_fk FOREIGN KEY (endereco_codigo) REFERENCES emiratads_cliente.endereco(codigo)
);

CREATE TABLE emiratads_voo.aeroporto (
    codigo char(3) NOT NULL,
    nome varchar(50) NOT NULL,
    cidade varchar(30) NOT NULL,
    uf varchar(2) NOT NULL,
    ativo boolean NOT NULL DEFAULT true,
    CONSTRAINT aeroporto_pkey PRIMARY KEY (codigo)
);

CREATE TABLE emiratads_voo.estado_voo (
    codigo bigserial PRIMARY KEY,
    sigla CHAR(3) NOT NULL,
    descricao VARCHAR(20) NOT NULL
);

-- Atualização da tabela voo para incluir o campo estado_codigo
CREATE TABLE emiratads_voo.voo (
    codigo varchar(8) NOT NULL,
    data timestamptz NOT NULL,
    valor_passagem numeric(10, 2) NOT NULL,
    quantidade_poltronas_total smallint NOT NULL,
    quantidade_poltronas_ocupadas smallint NOT NULL default 0,
    estado_codigo bigint NOT NULL,
    aeroporto_origem char(3) NOT NULL,
    aeroporto_destino char(3) NOT NULL,
    ativo boolean NOT NULL DEFAULT true,
    CONSTRAINT voo_pkey PRIMARY KEY (codigo),
    CONSTRAINT voo_estado_fk FOREIGN KEY (estado_codigo) REFERENCES emiratads_voo.estado_voo(codigo),
    CONSTRAINT voo_aeroporto_origem_fk FOREIGN KEY (aeroporto_origem) REFERENCES emiratads_voo.aeroporto(codigo),
    CONSTRAINT voo_aeroporto_destino_fk FOREIGN KEY (aeroporto_destino) REFERENCES emiratads_voo.aeroporto(codigo)
);