const express = require("express");
const db = require("../mysql");
const jsonwebtoken = require("jsonwebtoken");

const cripto = require("crypto");
const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes-256-cbc",
    key: cripto.randomBytes(32),
    iv: cripto.randomBytes(16),
};
function criptografar(senha) {
    const cipher = cripto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, Buffer.from(DADOS_CRIPTOGRAFAR.key), DADOS_CRIPTOGRAFAR.iv);
    let encrypted = cipher.update(senha);
    encrypted += cipher.final('hex');
    return encrypted ;
};
function descriptografar(senha) {
    let encryptedText = Buffer.from(senha.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};

const route = express.Router();
const JWT_SECRET = "goK!pusp6ThEdURUtRenOwUhAsWUCLheBazl!uJLPlS8EbreWLdrupIwabRAsiBu";

route.get("/", (req, res) => {
    db.getHotel(req.body.id, function(err, data){
        if(err){ res.status(404).send("Erro ao buscar hotéis")}
        else {console.log("estou no hotel encontrados",data[0]);
        res.status(200).json(data[0]);}
    })
})
route.post("/", (req, res) => {
    console.log(req.body)
    db.createHotel(req.body.nome, req.body.endereco);
    res.status(200).send("Hotel Cadastrado com sucesso");
})

route.get("/usuario/", (req, res) => {
    db.getUsuario(req.body.email, req.body.senha, function (err, data) {
        if (err) { res.status(404).send("Login inválido ou inexistente")}
        else { res.status(200).send(data[0]) }
    })
})
route.post("/usuario", (req, res) => {
    let senha = criptografar(req.body.senha);
    console.log(senha)
    db.createUsuario(req.body.email, senha);
})
route.delete("/usuario", (req, res) => {
    db.deleteUsuario(req.body.usuarioId);
})

route.get("/quarto/", (req, res) => {
    db.getQuarto = (req.body.id, function (err, data) {
        if (err) { res.status(404) }
        else { res.send(data[0]).status(200) }
    })
})
route.post("/quarto", (req, res) => {
    db.createQuarto(req.body.numero, req.body.hotelID);
    res.sendStatus(200);
})
route.delete("/quarto", (req, res) => {
    db.deleteQuarto(req.body.quartoId);
    res.sendStatus(200);
})

route.post("/disponibilidade", (req, res) => {
    db.createDisponibilidade(req.body.quartoId, req.body.dia);
    res.sendStatus(200);
})
route.get("/disponibilidade", (req, res) => {
    db.buscarReserva(req.body.quartoId, function (err, data) {
        if (err) { res.send(false).status(404) }
        else { res.send(data).status(200) }
    })
})
route.put("/disponibilidade", (req, res) => {
    db.createReserva = (req.body.id, req.body.quartoId, req.body.usuarioId, req.body.dia);
})
route.put("/disponibilidade/cancelar", (req, res) => {
    db.cancelarReserva = (req.body.id, req.body.quartoId, req.body.dia);
})

module.exports = route