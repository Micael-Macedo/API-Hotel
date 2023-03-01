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
1 - ROTA http://localhost:8090/hotel/:idHotel
    * GET: Permite a busca do hotel
    * POST: Permite o cadastramento do hotel passando do body nome e endereco
2 - ROTA http://localhost:8090/hotel/usuario
    * GET: Permite a busca de um usuario passando no body email e senha
    * POST: Permite o cadastramento do usuario com email e a senha criptografada
3 - ROTA http://localhost:8090/hotel/disponibilidade/:idQuarto
    * GET: Permite a busca dos dias disponíveis para a reserva daquele quarto passando o id do quarto como parametro
    * POST: Permite o cadastramento da reserva o quarto passando no body id do quarto como quartoId, id do usuario como usuarioId, e o dia na sequência ANO/MES/DIA
    4 - ROTA http://localhost:8090/hotel/quarto
    * GET: Permite a busca dos quartos
    * POST: Permite o cadastramento do o quarto passando no body id do quarto como quartoId, id do usuario como usuarioId, e o dia na sequência ANO/MES/DIA