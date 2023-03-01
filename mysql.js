const db = require("mysql2");
const conn = db.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'suhotel',
    password: '1234'
})
const cripto = require("crypto");
const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes-256-cbc",
    key: cripto.randomBytes(32),
    iv: cripto.randomBytes(16),
};
function descriptografar(senha) {
    const decipher = cripto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, Buffer.from(DADOS_CRIPTOGRAFAR.key), DADOS_CRIPTOGRAFAR.iv);
    console.log("senha:",senha)
    let decrypted = decipher.update(senha, 'utf8', 'hex') + decipher.final('hex');
    return decrypted.toString();
};

module.exports.createUsuario = (email, senha) =>{
    console.log(email, senha);
    conn.query("Insert into usuarios(email, senha) value (?,?)", [email, senha])
}
module.exports.getUsuario = (email, senha, callback) => {
    conn.query("Select * from usuarios where email = ?", [email], function(err, result){
        if(err) callback(err, null);
        else{
            let dbsenha = descriptografar(result[0].senha)
            if (dbsenha === senha){
                callback(null, result[0])
            }else{
                callback(err, null);
            }
        } 
    })
}
module.exports.deleteUsuario = (usuarioId) => {
    conn.query("Delete from usuarios where id = ?", [usuarioId])
}

module.exports.getHotel = (id, callback) =>{
    conn.query("SELECT * FROM Hoteis where id = ?", [id], function(err, result){
        
        if(err) {
            callback(err, null)
        }
        else {
            callback(null, result)}
    })
}
module.exports.createHotel = (nome, endereco) =>{
    conn.query("Insert into Hoteis(nome, endereco) value (?,?)", [nome, endereco])
}
module.exports.createQuarto = (numero, hotelId) =>{
    conn.query("Insert into Quartos(numero, hotelId) value (?,?)", [numero, hotelId])
}
module.exports.getQuarto = (quartoId, callback) =>{
    conn.query("SELECT * FROM Quartos where id = ?", [quartoId], function(err, result){
        if(err) callback(err, null);
        else callback(null, result)
    })
}
module.exports.deleteQuarto = (quartoId, callback) =>{
    conn.query("Delete FROM Quartos where id = ?", [quartoId], function(err, result){
        if(err) callback(err, null);
        else callback(null, result)
    })
}

module.exports.buscarReserva = (quartoId, callback) =>{
    conn.query("SELECT * FROM disponibilidade where reservado = 0 and quartoId = ?", [quartoId], function(err, result){
        if(err) callback(err, null);
        else { console.log(result)
            callback(null, result)}
    })
}
module.exports.createReserva = (id, quartoId, usuarioId, dia) =>{
    conn.query("update Disponibilidade set quartoId = ?, usuarioId = ?, dia = ?, reservado = ? where id = ?", [quartoId, usuarioId, dia, 1, id])
}
module.exports.createDisponibilidade = (quartoId, dia) =>{
    console.log(quartoId, dia);
    conn.query("Insert into Disponibilidade(quartoId, dia) value (?,?)", [quartoId, dia])
}
module.exports.cancelarReserva = (quartoId, dia) =>{
    conn.query("update Disponibilidade set usuarioId = ?, dia = ?, reservado = ? where id = ?", ["",dia, 0, quartoId])
}
