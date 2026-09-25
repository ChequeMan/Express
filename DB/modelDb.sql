CREATE DATABASE express_test; 

USE express_test; 

CREATE TABLE Users ( 
    userId int PRIMARY KEY, 
    name varchar(255) NOT NULL
);

INSERT INTO Users (userId, name) VALUES (1, 'Javier'),(2, 'Jaime');