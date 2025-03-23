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
)