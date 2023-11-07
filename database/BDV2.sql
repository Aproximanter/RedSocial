DROP DATABASE BDV2;
CREATE DATABASE IF NOT EXISTS BDV2;
USE BDV2;

CREATE TABLE Users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    control_number VARCHAR(30) NOT NULL UNIQUE,
    pass VARCHAR(60) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE USER 'tc_server'@'localhost' IDENTIFIED BY 'contrasemnia';
GRANT ALL PRIVILEGES ON BDV2.* TO 'tc_server'@'localhost';
FLUSH PRIVILEGES;