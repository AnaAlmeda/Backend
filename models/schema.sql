CREATE DATABASE IF NOT EXISTS movies;

USE movies;


CREATE TABLE movie (
    movie_id VARCHAR (9) PRIMARY KEY NOT NULL,
    title VARCHAR (100),
    release VARCHAR (4),
    rating DECIMAL (2 , 1),
    image VARCHAR (255)
);