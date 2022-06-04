CREATE DATABASE IF NOT EXISTS Clientes;

USE clientes;


CREATE TABLE clientes (
    cliente_id VARCHAR (9) PRIMARY KEY NOT NULL,
    nombre VARCHAR (100),
    apellido VARCHAR (4),
    edad INTEGER,
    foto VARCHAR (255),
    direccion VARCHAR (255),
    telefono  VARCHAR (255)
);