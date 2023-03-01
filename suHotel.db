create database suhotel;
use suhotel;
create table hoteis(
id int primary key auto_increment,
nome varchar(255),
endereco varchar(255)
);
create table quartos(
id int primary key auto_increment,
numero int,
hotelID int,
FOREIGN KEY (hotelID) REFERENCES hoteis(id)
);
create table usuarios(
id int primary key auto_increment,
email varchar(255),
senha varchar(255)
);
create table disponibilidade(
id int primary key auto_increment,
quartoID int,
usuarioID int,
dia date,
reservado tinyint default 0,
FOREIGN KEY (quartoID) REFERENCES quartos(id),
FOREIGN KEY (usuarioID) REFERENCES usuarios(id)
);