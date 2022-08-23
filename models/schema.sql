/*USUARIOS*/
CREATE DATABASE IF NOT EXISTS user;
 
USE user;
 
 
CREATE TABLE users (
    id_user INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombre VARCHAR (60) NOT NULL,
    mail VARCHAR (60) NOT NULL,
);
    




/*PROYECTOS*/
CREATE DATABASE IF NOT EXISTS user;
 
USE user;
 
 
CREATE TABLE proyectos (
    id_proyecto INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nombreProyecto VARCHAR (60) NOT NULL,
    fechaCreacion DATE NOT NULL,
    manzanas INTEGER NOT NULL,
    casas INTEGER NOT NULL,
    herrajesyS FLOAT (10,2) NOT NULL,
    cables FLOAT(10,2) NOT NULL,
    pasivos FLOAT(10,2) NOT NULL,
    manoObra FLOAT(10,2) NOT NULL,
    costoTRed FLOAT(10,2) NOT NULL,
    hDatos FLOAT(10,2) NOT NULL, 
    costoTRyD FLOAT(10,2) NOT NULL, 
    costoMHD FLOAT(10,2) NOT NULL, 
    costoCHD FLOAT(10,2) NOT NULL, 
    hDatosyTV FLOAT(10,2) NOT NULL, 
    costoTRDyTV FLOAT(10,2) NOT NULL, 
    costoMHDyTV FLOAT(10,2) NOT NULL, 
    costoCHDyTV FLOAT(10,2) NOT NULL,
    fActivas INTEGER NOT NULL,
    conexionesP INTEGER NOT NULL, 
    comentarios VARCHAR (60) NOT NULL,
    estado VARCHAR (60) NOT NULL);

    /*INSERTAR VALORES DE PRUEBA*/

INSERT INTO `proyectos` (`id_proyecto`, `nombreProyecto`, `fechaCreacion`, `manzanas`, `casas`, `herrajesyS`, `cables`, `pasivos`, `manoObra`, `costoTRed`,  `hDatos`, `costoTRyD`, `costoMHD`, `costoCHD`, `hDatosyTV`, `costoTRDyTV`, `costoMHDyTV`, `costoCHDyTV`,  `fActivas`, `conexionesP`, `comentarios`,  `estado`)
VALUES (NULL, 'J P Primero', '2021-06-15', '24', '524', '737.62', '737.63', '737.64', '737.65',  '87', '3753.57', '11670.59', '524', '486.27', '22.27', '5712.50', '13629.52', '567.89', '26', '18', 'lalal', 'lalal2');

