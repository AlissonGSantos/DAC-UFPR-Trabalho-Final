*** Settings ***
Documentation     Plano de Testes para o trabalho final da disciplina 
...               DS252 - Engenharia de Software II - Noite
Resource          resources.robot
Test Setup       Abrir browser
Test Teardown    Fechar browser

*** Test Cases ***
R01: Autocadastro - Sucesso
    [Documentation]    Teste de Autocadastro do Cliente
    [Tags]  Autocadastro  Autenticação
    Acessar sistema Emiratads
    Navegar para a página de autocadastro
    Preencher dados do cliente
    Clicar no botão de cadastro
    O cadastro deve ser realizado com sucesso

R02: Efetuar Login/Logout - Falha
    [Documentation]    Teste de Login do Cliente
    [Tags]  Login  Autenticação
    Acessar sistema Emiratads
    Informar dados de login incorretos
    Clicar no botão de login
    O login deve falhar com Erro ao fazer login. Verifique suas credenciais.

R02: Efetuar Login/Logout - Sucesso
    [Documentation]    Teste de Login do Cliente
    [Tags]  Login  Autenticação
    Acessar sistema Emiratads
    Recuperar senha do email de cadastro
    Informar dados de login
    Clicar no botão de login
    O login deve ser realizado com sucesso

R03: Mostrar Tela Inicial de Cliente
    [Documentation]    Teste de Tela Inicial do Cliente
    [Tags]  Cliente
    Acessar sistema Emiratads
    Realizar login cliente
    A tela inicial deve conter operações que podem ser efetuadas
    A tela inicial deve conter o saldo atual em milhas

R05: Comprar de Milhas
    [Documentation]    Teste de Compra de Milhas
    [Tags]  Cliente
    Acessar sistema Emiratads
    Realizar login cliente
    Acessar a página de compra de milhas
    Preencher quantidade de milhas
    Confirmar compra de milhas
    Verificar se novo saldo de milhas é 1000
    
R07: Efetuar Reserva
    [Documentation]    Teste de Efetuar Reserva
    [Tags]  Cliente
    Acessar sistema Emiratads
    Realizar login cliente
    Acessar a página de voos
    Selecionar aeroporto de origem CWB e destino POA para o voo TADS0003
    Selecionar voo TADS0003 e assentos 1,2
    Inserir quantidade de milhas a ser utilizadas
    Confirmar reserva
    A reserva deve ser criada e o sistema deve retornar o código da reserva

R06: Consultar Extrato de Milhas
    [Documentation]    Teste de Consulta de Extrato de Milhas
    [Tags]  Cliente
    Acessar sistema Emiratads
    Realizar login cliente
    Acessar a página de extrato de milhas
    Verificar se novo saldo de milhas é 850
    Verificar se a transação de compra de milhas está presente no extrato
    Verificar se a transação de reserva de voo está presente no extrato

R04: Ver Reserva
    [Documentation]    Teste de Consulta de Reserva
    [Tags]  Cliente
    Acessar sistema Emiratads
    Realizar login cliente
    Pesquisar reserva pelo código ${CLIENTE_CODIGO_RESERVA}
    Clicar em Ver Reserva
    A reserva deve estar no estado CRIADA
    O voo deve estar com o status CONFIRMADO
    
R08: Cancelar Reserva
    [Documentation]    Teste de Cancelamento de Reserva
    [Tags]  Cliente
    Acessar sistema Emiratads
    Realizar login cliente
    Criar uma nova reserva de CWB para POA em TADS0003
    Fechar modal de reserva
    Pesquisar reserva pelo código ${CLIENTE_CODIGO_RESERVA_CANCELAMENTO}
    Clicar em Cancelar Reserva
    Confirmar Cancelamento

R09: Consultar Reserva
    [Documentation]    Teste de Consulta de Reserva
    [Tags]  Cliente
    Acessar sistema Emiratads
    Realizar login cliente
    Acessar a página de Reservas
    Consultar reserva pelo código ${CLIENTE_CODIGO_RESERVA_CANCELAMENTO}
    O status da reserva deve ser CANCELADA

R10: Fazer Check-in
    [Documentation]    Teste de Check-in
    [Tags]  Cliente
    Acessar sistema Emiratads
    Realizar login cliente
    Acessar a página de Check-in
    Pesquisar reserva pelo código ${CLIENTE_CODIGO_RESERVA}
    Clicar em Fazer Check-in
    Confirmar Check-in
    Realizar logout

R11: Tela Inicial do Funcionário
    [Documentation]    Teste de Tela Inicial do Funcionário
    [Tags]  Funcionário
    Acessar sistema Emiratads
    Realizar login funcionário
    A tela inicial deve mostrar os voos que acontecerão nas próximas 48 horas
    A tela inicial deve conter operações para confirmar embarque, cancelar voo e realizar voo

R12: Confirmação de Embarque
    [Documentation]    Teste de Confirmação de Embarque
    [Tags]  Funcionário
    Acessar sistema Emiratads
    Realizar login funcionário
    Pesquisar voo pelo código ${CLIENTE_CODIGO_VOO}
    Clicar em Confirmar Embarque
    Inserir codigo de reserva ${CLIENTE_CODIGO_RESERVA}
    Confirmar Embarque
    Realizar logout
    Realizar login cliente
    Acessar a página de Reservas
    Consultar reserva pelo código ${CLIENTE_CODIGO_RESERVA}
    O status da reserva deve ser EMBARCADA

R14: Realização do Voo
    [Documentation]    Teste de Realização do Voo
    [Tags]  Funcionário
    Acessar sistema Emiratads
    Realizar login funcionário
    Pesquisar voo pelo código ${CLIENTE_CODIGO_VOO}
    Clicar em Realizar Voo
    Confirmar Realização do Voo
    Realizar logout
    Realizar login cliente
    Acessar a página de Reservas
    Consultar reserva pelo código ${CLIENTE_CODIGO_RESERVA}
    O status da reserva deve ser REALIZADA

R13: Cancelamento do Voo
    [Documentation]    Teste de Cancelamento de Voo
    [Tags]  Funcionário
    Acessar sistema Emiratads
    Realizar login cliente
    Criar uma nova reserva de POA para CWB em TADS0001
    Fechar modal de reserva
    Realizar logout
    Realizar login funcionário
    Pesquisar voo pelo código ${CLIENTE_CODIGO_VOO}
    Cancelar Voo
    Realizar logout
    Realizar login cliente
    Acessar a página de Reservas
    Consultar reserva pelo código ${CLIENTE_CODIGO_RESERVA_CANCELAMENTO}
    O status da reserva deve ser CANCELADA VOO

R15: Cadastro de Voo
    [Documentation]    Teste de Cadastro de Voo
    [Tags]  Funcionário
    Acessar sistema Emiratads
    Realizar login funcionário
    Acessar a página de cadastro de voo
    Preencher dados do voo
    Cadastrar voo

R16: (CRUD de Funcionário) Listagem de Funcionários
    [Documentation]    Teste de Listagem de Funcionários
    [Tags]  Funcionário
    Acessar sistema Emiratads
    Realizar login funcionário
    Acessar a página de funcionários
    Verificar se a lista de funcionários é exibida
    Verificar se ${FUNCIONARIO_LOGIN} está presente na lista de funcionários

R17: (CRUD de Funcionário) Inserção de Funcionário
    [Documentation]    Teste de Inserção de Funcionário
    [Tags]  Funcionário
    Acessar sistema Emiratads
    Realizar login funcionário
    Acessar a página de funcionários
    Clicar em Adicionar Funcionário
    Preencher dados do funcionário
    Clicar em Criar Funcionário
    Verificar se ${FUNCIONARIO_NOVO} está presente na lista de funcionários

R18: (CRUD de Funcionário) Alteração de Funcionário
    [Documentation]    Teste de Alteração de Funcionário
    [Tags]  Funcionário
    Acessar sistema Emiratads
    Realizar login funcionário
    Acessar a página de funcionários
    Verificar se ${FUNCIONARIO_NOVO} está presente na lista de funcionários
    Clicar em Editar Funcionário
    Preencher novo dados do funcionário
    Clicar em Salvar Funcionário
    Verificar se ${FUNCIONARIO_NOVO} foi atualizado na lista de funcionários

R19: (CRUD de Funcionário) Remoção de Funcionário
    [Documentation]    Teste de Remoção de Funcionário
    [Tags]  Funcionário
    Acessar sistema Emiratads
    Realizar login funcionário
    Acessar a página de funcionários
    Verificar se ${FUNCIONARIO_NOVO} está presente na lista de funcionários
    Clicar em Remover Funcionário
    Confirmar Remoção de Funcionário
    Verificar se ${FUNCIONARIO_NOVO} não está mais presente na lista de funcionários