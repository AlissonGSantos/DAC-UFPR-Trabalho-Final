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

-- Inserts para a tabela aeroporto
INSERT INTO emiratads_voo.aeroporto (codigo, nome, cidade, uf) VALUES
    ('GRU', 'Aeroporto Internacional de São Paulo/Guarulhos', 'Guarulhos', 'SP'),
    ('GIG', 'Aeroporto Internacional do Rio de Janeiro/Galeão', 'Rio de Janeiro', 'RJ'),
    ('CWB', 'Aeroporto Internacional de Curitiba', 'Curitiba', 'PR'),
    ('POA', 'Aeroporto Internacional Salgado Filho', 'Porto Alegre', 'RS');

-- Inserção dos valores na tabela estado_voo
INSERT INTO emiratads_voo.estado_voo (sigla, descricao) VALUES
    ('CON', 'CONFIRMADO'),
    ('CAN', 'CANCELADO'),
    ('REA', 'REALIZADO');

-- Inserts para a tabela voo
INSERT INTO emiratads_voo.voo (codigo, data, valor_passagem, quantidade_poltronas_total, quantidade_poltronas_ocupadas, estado_codigo, aeroporto_origem, aeroporto_destino) VALUES
    ('TADS0001', '2025-08-10T10:30:00-03:00', 500.00, 150, 0, 1, 'POA', 'CWB'),
    ('TADS0002', '2025-09-11T09:30:00-03:00', 450.00, 150, 0, 1, 'CWB', 'GIG'),
    ('TADS0003', '2025-10-12T08:30:00-03:00', 400.00, 150, 0, 1, 'CWB', 'POA');

-- Inserts para a tabela estado_resera
INSERT INTO emiratads_reserva_transaction.estado_reserva (sigla, descricao) VALUES
    ('CRD', 'CRIADA'),
    ('CHK', 'CHECK-IN'),
    ('CAN', 'CANCELADA'),
    ('CNV', 'CANCELADA VOO'),
    ('EBC', 'EMBARCADA'),
    ('RLZ', 'REALIZADA'),
    ('NRD', 'NÃO REALIZADA');

-- Inserts para a tabela reserva no schema emiratads_reserva_transaction
INSERT INTO emiratads_reserva_transaction.reserva (codigo, codigo_cliente, codigo_voo, estado_codigo, quantidade_milhas) VALUES
    ('RES0001', 1, 'TADS0001', 1, 200.00),
    ('RES0002', 2, 'TADS0002', 2, 90.00),
    ('RES0003', 3, 'TADS0003', 3, 80.00);

-- Inserts para a tabela reserva no schema emiratads_reserva_access
INSERT INTO emiratads_reserva_access.reserva (codigo, codigo_cliente, codigo_voo, estado, data, poltrona, quantidade_milhas) VALUES
    ('RES0001', 1, 'TADS0001', 'CRIADA', '2025-08-10T10:30:00-03:00', 1, 200.00),
    ('RES0001', 1, 'TADS0001', 'CRIADA', '2025-08-10T10:30:00-03:00', 2, 200.00),
    ('RES0002', 2, 'TADS0002', 'CHECK-IN', '2025-09-11T09:30:00-03:00', 2, 90.00),
    ('RES0003', 3, 'TADS0003', 'CANCELADA', '2025-10-12T08:30:00-03:00', 3, 80.00);
    
-- Inserts para a tabela historico_reserva
INSERT INTO emiratads_reserva_transaction.historico_reserva (data, reserva_codigo, estado_old, estado_new) VALUES
    ('2025-08-09T10:00:00-03:00', 'RES0001', NULL, 1),
    ('2025-09-09T09:00:00-03:00', 'RES0002', NULL, 1),
    ('2025-09-10T09:00:00-03:00', 'RES0002', 1, 2),
    ('2025-10-10T08:00:00-03:00', 'RES0003', NULL, 1),
    ('2025-10-11T08:00:00-03:00', 'RES0003', 1, 3);
    
-- Inserts para a tabela poltronas_reservadas
INSERT INTO emiratads_reserva_transaction.poltronas_reservadas (codigo, codigo_voo, codigo_reserva, codigo_cliente) VALUES
    (1, 'TADS0001', 'RES0001', 1),
    (2, 'TADS0001', 'RES0001', 1),
    (2, 'TADS0002', 'RES0002', 2),
    (3, 'TADS0003', 'RES0003', 3);

-- Inserts para a tabela de transacoes de milhas
INSERT INTO emiratads_cliente.transacao (cliente_codigo, data, quantidade_milhas, valor, codigo_reserva, descricao, tipo) VALUES
    (1, '2025-08-01T10:00:00-03:00', 500.00, 2500.00, NULL, 'COMPRA DE MILHAS', 'ENTRADA'),
    (2, '2025-09-01T10:00:00-03:00', 150.00, 750.00, NULL, 'COMPRA DE MILHAS', 'ENTRADA'),
    (3, '2025-10-01T10:00:00-03:00', 100.00, 500.00, NULL, 'COMPRA DE MILHAS', 'ENTRADA'),
    (1, '2025-08-10T10:30:00-03:00', -200.00, 0.00, 'RES0001', 'POA->CWB', 'SAIDA'),
    (2, '2025-09-11T09:30:00-03:00', -90.00, 0.00, 'RES0002', 'CWB->GIG', 'SAIDA'),
    (3, '2025-10-12T08:30:00-03:00', -80.00, 0.00, 'RES0003', 'CWB->POA', 'SAIDA'),
    (3, '2025-10-13T10:00:00-03:00', 80.00, 0.00, NULL, 'REEMBOLSO RESERVA', 'ENTRADA');

-- Atualizar o saldo_milhas na tabela cliente
UPDATE emiratads_cliente.cliente c
SET saldo_milhas = COALESCE((
    SELECT SUM(t.quantidade_milhas)
    FROM emiratads_cliente.transacao t
    WHERE t.cliente_codigo = c.codigo
), 0);