*** Settings ***
Documentation     Implementação das keywords para o plano de testes
Library           SeleniumLibrary
Library           Dialogs
Library           String
Library           DateTime

*** Variables ***
${BROWSER}            chrome
${CLIENTE_NOME}       Cliente Teste
${CLIENTE_EMAIL}      leonardo15salgado@gmail.com
${CLIENTE_SENHA}      3905
${CLIENTE_CPF}        19516219055
${CLIENTE_CEP}        82220330
${FUNCIONARIO_LOGIN}  func_pre@gmail.com
${FUNCIONARIO_SENHA}  TADS
${FUNCIONARIO_NOVO}   alisson.gab.santos@gmail.com

*** Keywords ***
Abrir browser
    Open Browser    browser=${BROWSER}
    Maximize Browser Window

Fechar browser
    Capture Page Screenshot
    Close Browser

Acessar sistema Emiratads
    Go To    http://localhost:3000
    Wait Until Element Is Visible    //img[@alt='emiratads-logo']

Navegar para a página de autocadastro
    Click Element    //a[normalize-space()='Cadastre-se']
    Wait Until Element Is Visible    //h1[normalize-space()='CADASTRO']

Preencher dados do cliente
    Input Text    //input[@name='nome']  ${CLIENTE_NOME}
    Input Text    //input[@name='email']  ${CLIENTE_EMAIL}
    Input Text    //input[@name='cpf']    ${CLIENTE_CPF}
    Input Text    //input[@name='endereco.cep']    ${CLIENTE_CEP}
    Click Element    //h1[normalize-space()='CADASTRO']
    Sleep    1s
    Input Text    //input[@name='endereco.numero']    123
    Input Text    //input[@name='endereco.complemento']    Apto 101

Clicar no botão de cadastro
    Click Button    //button[@type='submit']
    Sleep    5s

O cadastro deve ser realizado com sucesso
    Wait Until Element Is Visible    //h2[normalize-space()='Cadastro realizado com sucesso!!!']
    Element Should Be Visible    //span[normalize-space()='Login']

Recuperar senha do email de cadastro
    Log    Acesse o email ${CLIENTE_EMAIL} e informe a senha recebida no console.
    Log    Pressione Enter para continuar após informar a senha.
    ${senha} =  Get Value From User    message=Informe a senha recebida no email ${CLIENTE_EMAIL}
    Log    A senha informada foi: ${senha}
    Set Suite Variable    ${CLIENTE_SENHA}    ${senha}

Informar dados de login
    Input Text    //input[@name='email']  ${CLIENTE_EMAIL}
    Input Text    //input[@name='password']  ${CLIENTE_SENHA}

Clicar no botão de login
    Click Button    //button[@type='submit']
    Sleep    1s

O login deve ser realizado com sucesso
    Wait Until Element Is Visible    //h1[normalize-space()='Bem-vindo ao Emiratads, ${CLIENTE_NOME}']

Informar dados de login incorretos
    Input Text    //input[@name='email']  ${CLIENTE_EMAIL}
    Input Text    //input[@name='password']  senha_incorreta

O login deve falhar com ${mensagem_erro}
    Wait Until Element Is Visible    //span[@class='text-red-500 text-sm text-center']
    Element Should Contain    //span[@class='text-red-500 text-sm text-center']    ${mensagem_erro}

Realizar login cliente
    Informar dados de login
    Clicar no botão de login

Realizar login funcionário
    Input Text    //input[@name='email']  ${FUNCIONARIO_LOGIN}
    Input Text    //input[@name='password']  ${FUNCIONARIO_SENHA}
    Click Button    //button[@type='submit']

Realizar logout
    Click Element    //div[@class='w-full h-0.5 bg-white rounded transition-all duration-300 ease-in-out opacity-100']
    Wait Until Element Is Visible    //span[normalize-space()='Logout']
    Click Element    //span[normalize-space()='Logout']
    Wait Until Element Is Visible    //h1[normalize-space()='LOGIN']

A tela inicial deve conter operações que podem ser efetuadas
    Wait Until Element Is Visible    //nav[@class='bg-slate-950 border-b-2 border-indigo-950 h-16 flex items-center justify-between px-4']
    Element Should Be Visible    //div[@id='shortcuts-session']//a[normalize-space()='Milhas']
    Element Should Be Visible    //div[@id='shortcuts-session']//a[normalize-space()='Voos']
    Element Should Be Visible    //div[@id='shortcuts-session']//a[normalize-space()='Reservas']
    Element Should Be Visible    //div[@id='shortcuts-session']//a[normalize-space()='Check-in']

A tela inicial deve conter o saldo atual em milhas
    Element Should Be Visible    //h1[normalize-space()='Seu saldo em milhas: 0']

Acessar a página de compra de milhas
    Click Element    //a[normalize-space()='Comprar milhas']
    Wait Until Element Is Visible    //h1[normalize-space()='Compra de Milhas']

Preencher quantidade de milhas
    Input Text    //input[@placeholder='N. de Milhas']  1000

Confirmar compra de milhas
    Click Element    //span[normalize-space()='Comprar Milhas']
    Wait Until Element Is Visible    //span[normalize-space()='Confirmar']
    Page Should Contain    5.000,00
    Sleep    1s
    Click Element    //span[normalize-space()='Confirmar']
    Sleep    0.5s

Acessar a página de extrato de milhas
    Sleep    1s
    Click Element    //div[@id='shortcuts-session']//a[contains(@class,'text-slate-200 text-md w-full uppercase text-center p-2__className_c21540')][normalize-space()='Milhas']
    Wait Until Element Is Visible    //h1[normalize-space()='Extrato de Milhas']

Acessar a página de voos
    Sleep    1s
    Click Element    //div[@id='shortcuts-session']//a[contains(@class,'text-slate-200 text-md w-full uppercase text-center p-2__className_c21540')][normalize-space()='Voos']
    Wait Until Element Is Visible    //h1[normalize-space()='Buscar Voos']

Acessar a página de Reservas
    Sleep    1s
    Click Element    //div[@id='shortcuts-session']//a[contains(@class,'text-slate-200 text-md w-full uppercase text-center p-2__className_c21540')][normalize-space()='Reservas']
    Wait Until Element Is Visible    //h1[normalize-space()='CONSULTAR RESERVA']

Acessar a página de Check-in
    Sleep    1s
    Click Element    //div[@id='shortcuts-session']//a[contains(@class,'text-slate-200 text-md w-full uppercase text-center p-2__className_c21540')][normalize-space()='Check-in']
    Wait Until Element Is Visible    //h1[normalize-space()='Check-in de Voos']

Acessar a página de início
    Sleep    1s
    Click Element    //div[@id='shortcuts-session']//a[contains(@class,'text-slate-200 text-md w-full uppercase text-center p-2__className_c21540')][normalize-space()='Início']
    Wait Until Element Is Visible    //h1[normalize-space()='Bem-vindo ao Emiratads, ${CLIENTE_NOME}']

Acessar a página de cadastro de voo
    Sleep    1s
    Click Element    //div[@id='shortcuts-session']//a[contains(@class,'text-slate-200 text-md w-full uppercase text-center p-2__className_c21540')][normalize-space()='Voos']
    Wait Until Element Is Visible    //h1[normalize-space()='CADASTRO DE VOO']

Acessar a página de funcionários
    Sleep    1s
    Click Element    //div[@id='shortcuts-session']//a[contains(@class,'text-slate-200 text-md w-full uppercase text-center p-2__className_c21540')][normalize-space()='Funcionários']
    Wait Until Element Is Visible    //h1[normalize-space()='Funcionários']

Verificar se novo saldo de milhas é ${VALOR}
    Sleep    0.5s
    ${VALOR} =  Strip String    ${VALOR}
    Element Should Be Visible    //h1[normalize-space()='Seu saldo em milhas: ${VALOR}']
    ${strtemp} =    Get Text    //h1[normalize-space()='Seu saldo em milhas: ${VALOR}']
    ${saldo} =    Replace String    ${strtemp}    Seu saldo em milhas:    ${EMPTY}
    ${saldo} =    Convert To Integer    ${saldo}
    Log    O saldo atual em milhas é: ${saldo}
    Set Suite Variable    ${CLIENTE_SALDO}    ${saldo}

Selecionar aeroporto de origem ${ORIGEM} e destino ${DESTINO} para o voo ${VOO}
    Select From List By Value    //select[@name='OriginAirport']    ${ORIGEM}
    Select From List By Value    //select[@name='DestinationAirport']    ${DESTINO}
    Click Element    //button[@type='submit']
    Sleep    0.5s
    Element Should Be Visible    //td[normalize-space()='${VOO}']

Selecionar voo ${voo} e assentos ${assentos}
    ${assentos} =    Split String    ${assentos}    ,
    Click Element    //button[@class='cursor-pointer flex items-center justify-center gap-2 bg-transparent border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white p-3 rounded-lg ']
    Wait Until Element Is Visible    //h1[normalize-space()='Detalhes do voo: ${voo}']
    ${strtemp} =    Get Text    //h1[normalize-space()='Detalhes do voo: ${voo}']
    ${codigo_voo} =    Fetch From Right    ${strtemp}    DETALHES DO VOO: 
    ${codigo_voo} =    Strip String    ${codigo_voo}
    Log    O código do voo é: ${codigo_voo}
    Set Suite Variable    ${CLIENTE_CODIGO_VOO}    ${codigo_voo}
    FOR   ${assento}    IN    @{assentos}
        ${assento} =    Strip String    ${assento}
        Click Element    (//p[normalize-space()='${assento}'])[1]
    END

Inserir quantidade de milhas a ser utilizadas
    Input Text    //input[@placeholder='0']  150

Confirmar reserva
    Click Element    //span[normalize-space()='Reservar']
    Wait Until Element Is Visible    //h2[normalize-space()='Confirmar reserva']
    Page Should Contain    Você está prestes a reservar 2 assentos.
    Page Should Contain    Utilizando 150 milhas para esta reserva.
    Click Element    //span[normalize-space()='Confirmar']

A reserva deve ser criada e o sistema deve retornar o código da reserva
    Wait Until Element Is Visible    //h2[normalize-space()='Código de reserva']
    ${strtemp} =    Get Text    //div[@class='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm']//p[1]
    ${codigo_reserva} =    Fetch From Right    ${strtemp}    Seu código de reserva é: 
    ${codigo_reserva} =    Strip String    ${codigo_reserva}
    Log    O código da reserva é: ${codigo_reserva}
    Set Suite Variable    ${CLIENTE_CODIGO_RESERVA}    ${codigo_reserva}

Fechar modal de reserva
    Click Element    //button[@class='text-white hover:text-gray-300 text-3xl cursor-pointer transition']
    Sleep    0.5s

Verificar se a transação de compra de milhas está presente no extrato
    Element Should Be Visible    //div[normalize-space()='ENTRADA']
    Element Should Be Visible    //div[normalize-space()='COMPRA DE MILHAS']

Verificar se a transação de reserva de voo está presente no extrato
    Element Should Be Visible    //div[normalize-space()='SAIDA']
    Element Should Be Visible    //a[normalize-space()='Ver reserva']   

Pesquisar reserva pelo código ${CODIGO}
    Input Text    //input[@placeholder='Pesquisar:']   ${CODIGO}

Consultar reserva pelo código ${CODIGO}
    Input Text    //input[@name='CodeReservation']    ${CODIGO}
    Click Element    //span[normalize-space()='Consultar']

Pesquisar voo pelo código ${CODIGO}
    Sleep    0.5s
    Input Text    //input[@placeholder='Pesquisar:']   ${CODIGO}
    
Clicar em Ver Reserva
    Click Element    //span[normalize-space()='Ver Reserva']
    Wait Until Element Is Visible    //h1[normalize-space()='Detalhes da Reserva']

A reserva deve estar no estado ${estado}
    Element Should Be Visible    //p[normalize-space()='${estado}']

O voo deve estar com o status ${status}
    Element Should Be Visible    //p[normalize-space()='${status}']

Criar uma nova reserva de ${ORIGEM} para ${DESTINO} em ${VOO}
    Acessar a página de voos
    Selecionar aeroporto de origem ${ORIGEM} e destino ${DESTINO} para o voo ${VOO}
    Selecionar voo ${VOO} e assentos 9,10
    Inserir quantidade de milhas a ser utilizadas
    Confirmar reserva
    Wait Until Element Is Visible    //h2[normalize-space()='Código de reserva']
    ${strtemp} =    Get Text    //div[@class='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm']//p[1]
    ${codigo_reserva} =    Fetch From Right    ${strtemp}    Seu código de reserva é:
    ${codigo_reserva} =    Strip String    ${codigo_reserva}
    Log    O código da reserva é: ${codigo_reserva}
    Set Suite Variable    ${CLIENTE_CODIGO_RESERVA_CANCELAMENTO}    ${codigo_reserva}

Clicar em Cancelar Reserva
    Click Element    //span[normalize-space()='Cancelar Reserva']
    Wait Until Element Is Visible    //h2[normalize-space()='Cancelar Reserva ${CLIENTE_CODIGO_RESERVA_CANCELAMENTO}']

Confirmar Cancelamento
    Click Element    //span[normalize-space()='Confirmar']

O status da reserva deve ser ${ESTADO}
    Sleep    0.5s
    ${status}  Get Value    //input[@name='bookingStatus']
    Should Be Equal As Strings    ${status}    ${ESTADO}
    Log    O status da reserva é: ${status}

Clicar em Fazer Check-in
    Click Element    //span[normalize-space()='Fazer Check-in']
    Wait Until Element Is Visible    //h2[normalize-space()='Confirmação de Check-in']

Confirmar Check-in
    Page Should Contain    Código da Reserva: ${CLIENTE_CODIGO_RESERVA}
    Click Element    //span[normalize-space()='Confirmar Check-in']
    Wait Until Element Is Visible    //h3[normalize-space()='Check-in realizado com sucesso!']
    Click Element    //span[normalize-space()='Fechar']

A tela inicial deve mostrar os voos que acontecerão nas próximas 48 horas
    Wait Until Element Is Visible    //h1[normalize-space()='Próximos voos (48h)']
    Pesquisar voo pelo código ${CLIENTE_CODIGO_VOO}
    Sleep    0.5s

A tela inicial deve conter operações para confirmar embarque, cancelar voo e realizar voo
    Element Should Be Visible    (//span[contains(text(),'Confirmar Embarque')])[1]
    Element Should Be Visible    (//span[contains(text(),'Cancelar Voo')])[1]
    Element Should Be Visible    (//span[contains(text(),'Finalizar Voo')])[1]

Clicar em Confirmar Embarque
    Click Element    (//span[contains(text(),'Confirmar Embarque')])[1]
    Wait Until Element Is Visible    //h2[normalize-space()='Confirmar Embarque do Passageiro']

Inserir codigo de reserva ${CODIGO}
    Input Text    //input[@type='text']    ${CODIGO}
    Click Element    //span[normalize-space()='Confirmar']

Confirmar Embarque
    Wait Until Element Is Visible    //h2[normalize-space()='Embarque realizado com sucesso']
    Click Element    //button[@class='text-white hover:text-gray-300 text-3xl cursor-pointer transition']

Cancelar Voo
    Click Element    (//span[contains(text(),'Cancelar Voo')])[1]
    Wait Until Element Is Visible    //h2[normalize-space()='Cancelar Voo']
    Click Element    //span[normalize-space()='Confirmar Cancelamento']

Clicar em Realizar Voo
    Click Element    (//span[contains(text(),'Finalizar Voo')])[1]
    Wait Until Element Is Visible    //h2[normalize-space()='Finalizar Voo']

Confirmar Realização do Voo
    Click Element    //span[normalize-space()='Confirmar Realização']

Preencher dados do voo
    Select From List By Value    //select[@name='OriginAirport']    CWB
    Select From List By Value    //select[@name='DestinationAirport']    GRU
    Input Text    //input[@name='dateTimeFlight']    03/06/2025
    Press Keys    //input[@name='dateTimeFlight']    \t
    Input Text    //input[@name='dateTimeFlight']    12:00
    Input Text    //input[@name='seatsQuantity']    150
    Input Text    //input[@name='ticketValue']    50000
    ${miles} =   Get Value    //input[@name='miles']
    Should Be Equal As Strings    ${miles}    100

Cadastrar voo
    Click Element    //span[normalize-space()='Cadastrar Voo']
    Sleep    0.5s
    Page Should Contain   VOO CADASTRADO COM SUCESSO!

Verificar se a lista de funcionários é exibida
    Wait Until Element Is Visible    //h1[normalize-space()='Funcionários']
    Element Should Be Visible    //table[@class='w-full border-indigo-950 bg-slate-950 border-2']

Verificar se ${FUNCIONARIO_LOGIN} está presente na lista de funcionários
    Input Text    //input[@placeholder='Pesquisar:']   ${FUNCIONARIO_LOGIN}
    Sleep    1s
    Element Should Be Visible    //td[normalize-space()='${FUNCIONARIO_LOGIN}']

Verificar se ${FUNCIONARIO_LOGIN} não está mais presente na lista de funcionários
    Input Text    //input[@placeholder='Pesquisar:']   ${FUNCIONARIO_LOGIN}
    Sleep    0.5s
    Element Should Not Be Visible    //td[normalize-space()='${FUNCIONARIO_LOGIN}']

Clicar em Adicionar Funcionário
    Click Element    //span[normalize-space()='Cadastrar']
    Wait Until Element Is Visible    //h2[normalize-space()='Cadastrar Funcionário']

Preencher dados do funcionário
    Input Text    //div[@class='flex gap-4 w-full']//div[1]//input[1]    Alisson Gabriel Santos
    Input Text    //input[@type='email']    ${FUNCIONARIO_NOVO}
    Input Text    //input[@name='cpf']    98351305073
    Select From List By Label    //select[@class='w-full bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border-2 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none border-indigo-700 focus:border-indigo-800 hover:border-indigo-500 shadow-sm focus:shadow ']    Ativo
    Input Text    //input[@name='telefone']    41999999999

Clicar em Criar Funcionário
    Click Element    //span[normalize-space()='Confirmar']
    Sleep    5s

Clicar em Salvar Funcionário
    Click Element    //span[normalize-space()='Salvar']
    Sleep    1s

Clicar em Editar Funcionário
    Click Element    //tbody/tr[contains(@class,'odd:bg-slate-900 even:bg-slate-800 __className_c21540 text-slate-300')]/td[7]/button[1]
    Wait Until Element Is Visible    //h2[normalize-space()='Editar Funcionário']

Preencher novo dados do funcionário
    Input Text    //input[@name='telefone']    41987654321

Verificar se ${FUNCIONARIO_NOVO} foi atualizado na lista de funcionários
    Verificar se ${FUNCIONARIO_NOVO} está presente na lista de funcionários
    Sleep    0.5s
    Element Should Be Visible    //td[normalize-space()='(41) 98765-4321']

Clicar em Remover Funcionário
    Click Element    //button[contains(@class,'cursor-pointer flex items-center justify-center gap-2 bg-red-800 hover:bg-red-700 text-white border-0 p-2 rounded-lg')]
    Wait Until Element Is Visible    //h2[normalize-space()='Desativar usuário']

Confirmar Remoção de Funcionário
    Click Element    //span[normalize-space()='Deletar']
    Sleep    0.5s