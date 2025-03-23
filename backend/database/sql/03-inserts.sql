-- Inserts para a tabela funcionario
INSERT INTO emiratads_funcionario.funcionario (cpf, nome, email, telefone) VALUES
    ('90769281001', 'Funcionario 1', 'func_pre@gmail.com', '1234567890'),
    ('23456789012', 'Funcionario 2', 'func2@example.com', '2345678901'),
    ('34567890123', 'Funcionario 3', 'func3@example.com', '3456789012'),
    ('45678901234', 'Funcionario 4', 'func4@example.com', '4567890123'),
    ('56789012345', 'Funcionario 5', 'func5@example.com', '5678901234');

-- Inserts para a tabela endereco
INSERT INTO emiratads_cliente.endereco (cep, uf, cidade, bairro, rua, numero, complemento) VALUES
    ('80000000', 'PR', 'Curitiba', 'Centro', 'Rua 1', '123', 'Apto 101'),
    ('80010000', 'PR', 'Curitiba', 'Batel', 'Rua 2', '456', 'Apto 202'),
    ('80020000', 'PR', 'Curitiba', 'Água Verde', 'Rua 3', '789', 'Casa 1'),
    ('80030000', 'PR', 'Curitiba', 'Juvevê', 'Rua 4', '101', 'Casa 2'),
    ('80040000', 'PR', 'Curitiba', 'Cabral', 'Rua 5', '202', 'Apto 303');

-- Inserts para a tabela cliente
INSERT INTO emiratads_cliente.cliente (cpf, nome, email, saldo_milhas, endereco_codigo) VALUES
    ('12345678901', 'Cliente 1', 'cliente1@example.com', 0.0, 1),
    ('23456789012', 'Cliente 2', 'cliente2@example.com', 0.0, 2),
    ('34567890123', 'Cliente 3', 'cliente3@example.com', 0.0, 3),
    ('45678901234', 'Cliente 4', 'cliente4@example.com', 0.0, 4),
    ('56789012345', 'Cliente 5', 'cliente5@example.com', 0.0, 5);