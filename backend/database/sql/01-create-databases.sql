--- CREATE SCHEMAS AND GRANT PERMISSIONS ---
CREATE SCHEMA emiratads_cliente AUTHORIZATION pg_database_owner;
CREATE SCHEMA emiratads_funcionario AUTHORIZATION pg_database_owner;
CREATE SCHEMA emiratads_voo AUTHORIZATION pg_database_owner;
CREATE SCHEMA emiratads_reserva_transaction AUTHORIZATION pg_database_owner;
CREATE SCHEMA emiratads_reserva_access AUTHORIZATION pg_database_owner;

CREATE USER emiratads_cliente_user WITH PASSWORD 'senha1';
CREATE USER emiratads_funcionario_user WITH PASSWORD 'senha2';
CREATE USER emiratads_voo_user WITH PASSWORD 'senha3';
CREATE USER emiratads_reserva_user WITH PASSWORD 'senha4';