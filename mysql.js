const db = require("mysql2");
const conn = db.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'suhotel',
    password: '1234'
})
const cripto = require("crypto");

let DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes-128-cbc",
    key: "1234567812345678",
    iv: cripto.randomBytes(16),
    codificacao: "utf8",
    tipo: "hex"
};

const cipher = cripto.createCipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.key, DADOS_CRIPTOGRAFAR.iv);
const decipher = cripto.createDecipheriv(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.key, DADOS_CRIPTOGRAFAR.iv);

function criptografia(senha, op){
    if(op == 1){
        console.log("Opção um selecionada")
        let encrypted = cipher.update(senha, "utf8", "hex");
        encrypted += cipher.final('hex');
        return encrypted ;
    }else{
        console.log("Opção dois selecionada")
        console.log("senha:", senha)
        let decrypted = decipher.update(senha, "hex", "utf8");
        decrypted += decipher.final('utf8');
        console.log("decrypted",decrypted)
        return decrypted
    }

}


module.exports.createUsuario = (email, senha) => {
    console.log(email, senha);
    conn.query("Insert into usuarios(email, senha) value (?,?)", [email, criptografia(senha, 1)])
}
module.exports.getUsuario = (email, senha, callback) => {
    conn.query("Select * from usuarios where email = ?", [email], function (err, result) {
        if (err) callback(err, null);
        else {
            usuario = result[0]
            console.log("Senha descriptografada:", criptografia(usuario.senha, 0) )
            if(senha == criptografia(usuario.senha, 0)){
                callback(null, usuario)
            }
        }
    })
}
module.exports.updateUsuario = (id, email, senha) => {
    conn.query("update usuarios set email = ?, senha = ? where id = ?", [email, criptografia(senha), id])
}
module.exports.deleteUsuario = (usuarioId) => {
    conn.query("Delete from usuarios where id = ?", [usuarioId])
}

module.exports.getHotel = (id, callback) => {
    conn.query("SELECT * FROM Hoteis where id = ?", [id], function (err, result) {

        if (err) {
            callback(err, null)
        }
        else {
            callback(null, result)
        }
    })
}
module.exports.createHotel = (nome, endereco) => {
    conn.query("Insert into Hoteis(nome, endereco) value (?,?)", [nome, endereco])
}
module.exports.deleteHotel = (id) => {
    conn.query("Delete from hoteis where id = ?", [id])
}
module.exports.updateHotel= (id, nome, endereco) => {
    conn.query("update Hoteis set nome=?, endereco = ? where id = ?", [nome, endereco, id])
}

module.exports.createQuarto = (numero, hotelId) => {
    conn.query("Insert into Quartos(numero, hotelId) value (?,?)", [numero, hotelId])
}
module.exports.getQuarto = (quartoId, callback) => {
    conn.query("SELECT * FROM Quartos where id = ?", [quartoId], function (err, result) {
        if (err) callback(err, null);
        else callback(null, result)
    })
}
module.exports.deleteQuarto = (quartoId, callback) => {
    conn.query("Delete FROM Quartos where id = ?", [quartoId], function (err, result) {
        if (err) callback(err, null);
        else callback(null, result)
    })
}
module.exports.updateQuarto = (id, numero, hotelId) => {
    conn.query("update Quartos set numero = ?, hotelId = ? where id = ?", [numero, hotelId, id])
}

module.exports.buscarReserva = (quartoId, callback) => {
    conn.query("SELECT * FROM disponibilidade where reservado = 0 and quartoID = ?", [quartoId], function (err, result) {
        if (err) {callback(err, null)}
        else {
            callback(null, result)
        }
    })
}
module.exports.createReserva = (id, quartoId, usuarioId, dia) => {
    console.log(id, quartoId, usuarioId, dia)
    conn.query("update disponibilidade set quartoId = ?, usuarioId = ?, dia = ?, reservado = ? where id = ?", [quartoId, usuarioId, dia.replace("\\", ""), 1, id], function(err, data){
        if(err){console.log(err)}
        else {console.log(data)}
    })
}
module.exports.createDisponibilidade = (quartoId, dia) => {
    console.log(quartoId, dia);
    conn.query("Insert into Disponibilidade(quartoId, dia) value (?,?)", [quartoId, dia])
}
module.exports.cancelarReserva = (quartoId, dia) => {
    conn.query("update Disponibilidade set usuarioId = ?, dia = ?, reservado = ? where id = ?", ["", dia, 0, quartoId])
}
module.exports.deleteReserva = (id, callback) => {
    conn.query("Delete FROM Disponibilidade where id = ?", [id], function (err, result) {
        if (err) callback(err, null);
        else callback(null, result)
    })
}
