Requisitos:
* Ligar o Mysql através do xampp pressionando no botão start;
dados de conexão com o banco de dados:
    host: 'localhost',
    user: 'root',
    database: 'suhotel',
    port: 3307
Iniciando o projeto:
é necessário no terminal digitar o comando: npm run dev
Quando aparecer a mensagem "starting `node server.js`" o projeto já estará funcionando no endereço http://localhost:8090/
A partir de então para utilizar a api é necessário utilizar a rota http://localhost:8090/hotel

Utilizando a API:
1 - ROTA http://localhost:8090/hotel/
    * GET: Permite a busca do hotel passando o id do hotel como id
    * POST: Permite o cadastramento do hotel passando do body nome e endereco
    * PUT: Permite atualizar as informações do hotel passando no body nome, endereco e id do hotel como id
    * DELETE: Permite a exclusão de um hotel passando dentro do body o id do hotel como id
2 - ROTA http://localhost:8090/hotel/usuario
    * GET: Permite a busca de um usuario passando no body email e senha
    * POST: Permite o cadastramento do usuario passando no body email e a senha, obs: a senha será criptografada por medidas de segurança
    * PUT: Permite atualizar as informações do usuario passando no body o id do usuario, email e senha
    * DELETE: Permite a exclusão do usuario passando dentro do body o id do usuario como id
3 - ROTA http://localhost:8090/hotel/disponibilidade/
    * GET: Permite a busca dos dias disponíveis para a reserva daquele quarto passando o id do quarto dentro do body como id
    * POST: Permite o cadastramento da disponibilidade de reserva do quarto passando no body id do quarto como quartoId, e o dia na sequência ANO/MES/DIA
    * PUT: Permite a realização da reserva passando no body o id da reserva como id, id do quarto como quartoId, o dia na sequência ANO/MES/DIA e o id do usuario como usuarioId
    * DELETE: Permite a exclusão da reserva passando dentro do body o id da reserva como id
4 - ROTA http://localhost:8090/hotel/disponibilidade/cancelar
    *PUT: Permite o cancelamento da reserva e retornando a disponibilidade para a reserva do dia, deve ser passado no body o dia e o id do quarto
5 - ROTA http://localhost:8090/hotel/quarto
    * GET: Permite a busca dos quartos passando dentro do body o id do quarto como id
    * POST: Permite o cadastramento do o quarto passando no body id do quarto como quartoId, id do usuario como usuarioId, e o dia na sequência ANO/MES/DIA
    * PUT: Permite atualizar as informações do quarto passando no body o id do quarto como id, numero e o id do hotel como hotelID
    * DELETE: Permite a exclusão do quarto passando dentro do body o id do quarto como id