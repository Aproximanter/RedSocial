DROP DATABASE BDV2;
CREATE DATABASE IF NOT EXISTS BDV2;
USE BDV2;

CREATE TABLE Users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    unique_id int(255) NOT NULL,
    control_number VARCHAR(30) NOT NULL UNIQUE,
    pass VARCHAR(60) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    img varchar(255) NOT NULL,
    status varchar(255) NOT NULL
    
);

CREATE TABLE Posts (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE messages(
   msg_id int(11) NOT NULL,
   incoming_msg_id int(255) NOT NULL,
   outgoing_msg_id int(255) NOT NULL,
   msg varchar(1000) NOT NULL
);


CREATE USER 'tc_server'@'localhost' IDENTIFIED BY 'contrasemnia';
GRANT ALL PRIVILEGES ON BDV2.* TO 'tc_server'@'localhost';
FLUSH PRIVILEGES;
