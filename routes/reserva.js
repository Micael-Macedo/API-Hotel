const express = require("express");
const db = require("../mysql");
const session = require("express-session");
const fs = require("fs");
const cripto = require("crypto");
const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes-256-cbc",
    key: "12345678",
    iv: cripto.randomBytes(16),
};
function criptografar(senha) {
    const cipher = cripto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.key, DADOS_CRIPTOGRAFAR.iv);
    let encrypted = cipher.update(senha);
    encrypted += cipher.final('hex');
    return encrypted;
};

const route = express.Router();

route.use(session({
    secret: "qualquercoisa",
    resave: true,
    saveUninitialized: true
}))

route.get("/", (req, res) => {
    console.log(req.session.login)
    db.getHotel(req.body.id, function (err, data) {
        if (err) { res.status(404).send("Erro ao buscar hotéis") }
        else {
            console.log("estou no hotel encontrados", data[0]);
            res.status(200).json(data[0]);
        }
    })
})
route.post("/", (req, res) => {
    console.log(req.body)
    db.createHotel(req.body.nome, req.body.endereco);
    res.status(200).send("Hotel Cadastrado com sucesso");
})
route.put("/", (req, res) => {
    console.log(req.body)
    db.updateHotel(req.body.id, req.body.nome, req.body.endereco);
    res.status(200).send("Hotel Atualizado com sucesso");
})
route.delete("/", (req, res) => {
    console.log(req.body)
    db.deleteHotel(req.body.id);
    res.status(200).send("Hotel Deletado com sucesso");
})

route.get("/usuario/", (req, res) => {
    console.log(req.body);
    db.getUsuario(req.body.email, req.body.senha, function (err, data) {
        if (err) { res.status(404).send("Login inválido ou inexistente") }
        else {
            req.session.login = {
                email: data.email,
                senha: data.senha
            }
            fs.writeFile("sessoes.txt", JSON.stringify(req.session.login), (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log(req.session.login)
                    res.status(200).send(req.session.login)
                }
            });
        }
    })
})
route.post("/usuario", (req, res) => {
    db.createUsuario(req.body.email, req.body.senha);
    res.status(200).send("Usuario cadastrado")
})
route.put("/usuario", (req, res) => {
    db.updateUsuario(req.body.id, req.body.email, req.body.senha);
    res.status(200).send("Usuario atualizado")
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
route.put("/quarto", (req, res) => {
    db.updateQuarto(req.body.id, req.body.numero, req.body.hotelID);
    res.sendStatus(200);
})
route.delete("/quarto", (req, res) => {
    db.deleteQuarto(req.body.id);
    res.sendStatus(200);
})

route.post("/disponibilidade", (req, res) => {
    db.createDisponibilidade(req.body.quartoId, req.body.dia);
    res.sendStatus(200);
})
route.get("/disponibilidade", (req, res) => {
    console.log(req.body)
    db.buscarReserva(req.body.id, function (err, data) {
        console.log("Data", data)
        if (err) { res.send(false).status(404) }
        else { res.send(data).status(200) }
    })
})
route.put("/disponibilidade", (req, res) => {
    console.log(req.body)
    db.createReserva(req.body.id, req.body.quartoId, req.body.usuarioId, req.body.dia);
    res.status(200).send("Reserva realizada com sucesso")
})
route.put("/disponibilidade/cancelar", (req, res) => {
    db.cancelarReserva = (req.body.id, req.body.quartoId, req.body.dia);
    res.status(200)
})
route.delete("/disponibilidade", (req, res) => {
    db.createReserva(req.body.id);
    res.status(200).send("Reserva deleta com sucesso")
})

module.exports = route