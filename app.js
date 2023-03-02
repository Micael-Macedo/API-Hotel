const express = require("express");
const app = express();
const bp = require("body-parser");
const path = require("path");

app.use(express.static(__dirname + "public"));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const pages = __dirname + "/views/pages/";
const reservaRoute = require("./routes/reserva");

app.use("/hotel", reservaRoute);
app.get("/", (req, res) => {
    res.sendFile(pages, "index.html")
})
app.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, pages, "cadastro.html"))
})
app.get("/hoteis", (req, res) => {
    res.sendFile(pages, "")
})
app.get("/login", (req, res) => {
    res.sendFile(pages, "")
})
app.get("/reserva", (req, res) => {

})

module.exports = app