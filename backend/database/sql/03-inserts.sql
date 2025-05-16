-- Inserts para a tabela funcionario
INSERT INTO emiratads_funcionario.funcionario (cpf, nome, email, telefone) VALUES
    ('90769281001', 'Funcionario 1', 'func_pre@gmail.com', '1234567890'),
    ('23456789012', 'Funcionario 2', 'func2@example.com', '2345678901'),
    ('34567890123', 'Funcionario 3', 'func3@example.com', '3456789012'),
    ('45678901234', 'Funcionario 4', 'func4@example.com', '4567890123'),
    ('56789012345', 'Funcionario 5', 'func5@example.com', '5678901234');

-- Inserts para a tabela endereco
INSERT INTO emiratads_cliente.endereco (cep, uf, cidade, bairro, rua, numero, complemento) VALUES
    ('80000000', 'Paraná', 'Curitiba', 'Centro', 'Rua 1', '123', 'Apto 101'),
    ('80010000', 'Paraná', 'Curitiba', 'Batel', 'Rua 2', '456', 'Apto 202'),
    ('80020000', 'Paraná', 'Curitiba', 'Água Verde', 'Rua 3', '789', 'Casa 1'),
    ('80030000', 'Paraná', 'Curitiba', 'Juvevê', 'Rua 4', '101', 'Casa 2'),
    ('80040000', 'Paraná', 'Curitiba', 'Cabral', 'Rua 5', '202', 'Apto 303');

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
    ('CWB', 'Aeroporto Internacional Afonso Pena', 'Curitiba', 'PR'),
    ('POA', 'Aeroporto Internacional Salgado Filho', 'Porto Alegre', 'RS'),
    ('BSB', 'Aeroporto Internacional de Brasília', 'Brasília', 'DF'),
    ('CNF', 'Aeroporto Internacional de Belo Horizonte/Confins', 'Belo Horizonte', 'MG'),
    ('REC', 'Aeroporto Internacional do Recife/Guararapes', 'Recife', 'PE'),
    ('SSA', 'Aeroporto Internacional de Salvador', 'Salvador', 'BA');

-- Inserção dos valores na tabela estado_voo
INSERT INTO emiratads_voo.estado_voo (sigla, descricao) VALUES
    ('CON', 'CONFIRMADO'),
    ('CAN', 'CANCELADO'),
    ('REA', 'REALIZADO');

-- Inserts para a tabela voo
INSERT INTO emiratads_voo.voo (codigo, data, valor_passagem, quantidade_poltronas_total, quantidade_poltronas_ocupadas, estado_codigo, aeroporto_origem, aeroporto_destino) VALUES
    ('TADS0001', '2025-08-10T10:30:00-03:00', 500.00, 150, 8, 1, 'POA', 'CWB'),
    ('TADS0002', '2025-09-11T09:30:00-03:00', 450.00, 150, 8, 1, 'CWB', 'GIG'),
    ('TADS0003', '2025-10-12T08:30:00-03:00', 400.00, 150, 8, 1, 'CWB', 'POA'),
    ('TADS0004', '2025-05-16T14:00:00-03:00', 500.00, 180, 10, 1, 'GRU', 'GIG'),
    ('TADS0005', '2025-05-16T15:30:00-03:00', 600.00, 200, 50, 1, 'GIG', 'CWB'),
    ('TADS0006', '2025-05-16T16:45:00-03:00', 450.00, 150, 20, 1, 'CWB', 'BSB'),
    ('TADS0007', '2025-05-16T18:00:00-03:00', 700.00, 220, 100, 1, 'BSB', 'REC'),
    ('TADS0008', '2025-05-16T19:15:00-03:00', 800.00, 250, 240, 1, 'REC', 'SSA'),
    ('TADS0009', '2025-05-16T20:30:00-03:00', 500.00, 180, 30, 1, 'SSA', 'CNF'),
    ('TADS0010', '2025-05-16T21:45:00-03:00', 400.00, 150, 8, 1, 'CNF', 'POA'),
    ('TADS0011', '2025-05-16T22:00:00-03:00', 650.00, 200, 80, 1, 'POA', 'GRU'),
    ('TADS0012', '2025-05-16T23:15:00-03:00', 750.00, 220, 150, 1, 'GRU', 'BSB'),
    ('TADS0013', '2025-05-17T08:00:00-03:00', 600.00, 200, 60, 1, 'BSB', 'CWB'),
    ('TADS0014', '2025-05-17T09:30:00-03:00', 550.00, 180, 90, 1, 'CWB', 'REC'),
    ('TADS0015', '2025-05-17T10:45:00-03:00', 500.00, 150, 40, 1, 'REC', 'GIG'),
    ('TADS0016', '2025-05-17T12:00:00-03:00', 450.00, 150, 25, 1, 'GIG', 'SSA'),
    ('TADS0017', '2025-05-17T13:15:00-03:00', 700.00, 220, 120, 1, 'SSA', 'CNF'),
    ('TADS0018', '2025-05-17T14:30:00-03:00', 800.00, 250, 180, 1, 'CNF', 'POA');

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
    ('RES0003', 3, 'TADS0003', 3, 80.00),
    ('RESXXX', 0, 'TADSXXX', 1, 0.00);

-- Inserts para a tabela reserva no schema emiratads_reserva_access
INSERT INTO emiratads_reserva_access.reserva (codigo, codigo_cliente, codigo_voo, estado, data, poltrona, quantidade_milhas) VALUES
    ('RES0001', 1, 'TADS0001', 'CRIADA', '2024-08-10T10:30:00-03:00', 1, 200.00),
    ('RES0001', 1, 'TADS0001', 'CRIADA', '2024-08-10T10:30:00-03:00', 2, 200.00),
    ('RES0002', 2, 'TADS0002', 'CHECK-IN', '2024-09-11T09:30:00-03:00', 2, 90.00),
    ('RES0003', 3, 'TADS0003', 'CANCELADA', '2024-10-12T08:30:00-03:00', 3, 80.00);
    
-- Inserts para a tabela historico_reserva
INSERT INTO emiratads_reserva_transaction.historico_reserva (data, reserva_codigo, estado_old, estado_new) VALUES
    ('2024-08-09T10:00:00-03:00', 'RES0001', NULL, 1),
    ('2024-09-09T09:00:00-03:00', 'RES0002', NULL, 1),
    ('2024-09-10T09:00:00-03:00', 'RES0002', 1, 2),
    ('2024-10-10T08:00:00-03:00', 'RES0003', NULL, 1),
    ('2024-10-11T08:00:00-03:00', 'RES0003', 1, 3);
    
-- Inserts para a tabela poltronas_reservadas
INSERT INTO emiratads_reserva_transaction.poltronas_reservadas (codigo, codigo_voo, codigo_reserva, codigo_cliente) VALUES
    (1, 'TADS0001', 'RES0001', 1),
    (2, 'TADS0001', 'RES0001', 1),
    (2, 'TADS0002', 'RES0002', 2),
    (3, 'TADS0003', 'RES0003', 3);

-- Inserts para a tabela de transacoes de milhas
INSERT INTO emiratads_cliente.transacao (cliente_codigo, data, quantidade_milhas, valor, codigo_reserva, descricao, tipo) VALUES
    (1, '2024-08-01T10:00:00-03:00', 500.00, 2500.00, NULL, 'COMPRA DE MILHAS', 'ENTRADA'),
    (2, '2024-09-01T10:00:00-03:00', 150.00, 750.00, NULL, 'COMPRA DE MILHAS', 'ENTRADA'),
    (3, '2024-10-01T10:00:00-03:00', 100.00, 500.00, NULL, 'COMPRA DE MILHAS', 'ENTRADA'),
    (1, '2024-08-10T10:30:00-03:00', -200.00, 0.00, 'RES0001', 'POA->CWB', 'SAIDA'),
    (2, '2024-09-11T09:30:00-03:00', -90.00, 0.00, 'RES0002', 'CWB->GIG', 'SAIDA'),
    (3, '2024-10-12T08:30:00-03:00', -80.00, 0.00, 'RES0003', 'CWB->POA', 'SAIDA'),
    (3, '2024-10-13T10:00:00-03:00', 80.00, 0.00, 'RES0003', 'REEMBOLSO', 'ENTRADA');

-- Atualizar o saldo_milhas na tabela cliente
UPDATE emiratads_cliente.cliente c
SET saldo_milhas = COALESCE((
    SELECT SUM(t.quantidade_milhas)
    FROM emiratads_cliente.transacao t
    WHERE t.cliente_codigo = c.codigo
), 0);

-- Adicionar poltronas reservadas aleatórias para cada voo, conforme quantidade de poltronas ocupadas
DO $$
DECLARE
    v_codigo_voo TEXT;
    v_qtd_ocupadas INT;
    v_qtd_total INT;
    v_i INT;
    v_poltrona INT;
    v_exists INT;
BEGIN
    FOR v_codigo_voo, v_qtd_ocupadas, v_qtd_total IN
        SELECT codigo, quantidade_poltronas_ocupadas, quantidade_poltronas_total
        FROM emiratads_voo.voo
    LOOP
        v_i := 1;
        WHILE v_i <= v_qtd_ocupadas LOOP
            -- Gera um número aleatório entre 1 e quantidade de poltronas total
            v_poltrona := floor(random() * v_qtd_total + 1);

            -- Verifica se já existe a combinação de poltrona e voo
            SELECT COUNT(*) INTO v_exists
            FROM emiratads_reserva_transaction.poltronas_reservadas
            WHERE codigo = v_poltrona AND codigo_voo = v_codigo_voo;

            IF v_exists = 0 THEN
                INSERT INTO emiratads_reserva_transaction.poltronas_reservadas (codigo, codigo_voo, codigo_reserva, codigo_cliente)
                VALUES (v_poltrona, v_codigo_voo, 'RESXXX', 0);
                v_i := v_i + 1;
            END IF;
            -- Se já existe, não incrementa v_i, tenta novamente
        END LOOP;
    END LOOP;
END $$;