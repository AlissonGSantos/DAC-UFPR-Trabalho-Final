#!/bin/bash
psql -U postgres -f /sql/01-create-databases.sql
psql -U postgres -f /sql/02-create-tables.sql
psql -U postgres -f /sql/03-inserts.sql

#Precisa sempre ficar por último

psql -U postgres -f /sql/0x-acessos.sql