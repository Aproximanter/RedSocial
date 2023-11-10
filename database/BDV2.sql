DROP DATABASE BDV2;
CREATE DATABASE IF NOT EXISTS BDV2;
USE BDV2;

CREATE TABLE UserTables(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description TINYTEXT NOT NULL
);

CREATE TABLE Users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    control_number VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    img varchar(255) NOT NULL DEFAULT 'default.jpg',
    privilege INT NOT NULL DEFAULT 0,
    status INT NOT NULL DEFAULT 0 REFERENCES Users(id)
);

CREATE TABLE Posts (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    content TEXT NOT NULL,
    userFK INT REFERENCES Users(id)
);

CREATE TABLE Messages(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    content TEXT,
    user_senderFK INT REFERENCES Users(id),
    user_receiverFK INT REFERENCES Users(id)
);

CREATE TABLE Follows(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    followedFK INT REFERENCES Users(id),
    followerFK INT REFERENCES Users(id)
);

-- sessions table for express-sessions internals
CREATE TABLE sessions (
  session_id varchar(128) NOT NULL PRIMARY KEY,
  expires int unsigned NOT NULL,
  data mediumtext,
  INDEX (expires)
);

CREATE USER 'tc_server'@'localhost' IDENTIFIED BY 'contrasemnia';
GRANT ALL PRIVILEGES ON BDV2.* TO 'tc_server'@'localhost';
FLUSH PRIVILEGES;

INSERT INTO UserTables (description)
VALUES 
    ('usuario normal'),
    ('egresado');

-- PASSWORDS
-- Administrator
-- :D?B97SUE"82?xT
-- ChavaPass
-- FulanitoPass
-- JosePass
INSERT INTO Users (control_number, password, full_name, email, img, privilege, status)
VALUES 
    ('0', '$2a$10$6d2jeJ55rc1OqDpnX9ctKeV34qNfn9Ji78DO.qf4as4yCfcvbjgba', 'Administrador', 'Admin@google.com', 'default.jpg', 1, 0),
    ('210110037', '$2a$10$N8PXR/ladUnljsUTbNHV6edDQNl5V5xnusgmZUNvp128M3DF/rjfm', 'Felipe', 'Felipinhdez@gmail.com', 'default.jpg', 0, 0),
    ('210110038', '$2a$10$Z9Y.OxcE.E4afRJA3r5bY.I11wqlG/8st0UFKsFMkuivlIVzMzlkO', 'Chava', 'chava1898@gmail.com', 'default.jpg', 0, 0),
    ('210110047', '$2a$10$OaKOJiCrk32tNuUwJnQotuMRFUpYJeHgcMaGC3Si.82jTDhBKT/ye', 'Fulanito', 'funalitodetal@gmail.com', 'default.jpg', 0, 1),
    ('210110045', '$2a$10$ce48PJwh2NqOGr8hI7CexOI0Yrg4UUo3xALiequdF7B7PESmaRymy', 'JoseJuan', 'Josejuan@gmail.com', 'default.jpg', 0, 0);

INSERT INTO Posts (content, userFK)
VALUES 
    ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1),
    ('Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2),
    ('Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 3),
    ('Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 4),
    ('Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 5);

INSERT INTO Messages (content, user_senderFK, user_receiverFK)
VALUES 
    ('Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1, 2),
    ('Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2, 3),
    ('Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 3, 4),
    ('Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 4, 5),
    ('Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 5, 1);

INSERT INTO Follows (followedFK, followerFK)
VALUES 
    (1, 2),
    (2, 3),
    (3, 4),
    (4, 5),
    (5, 1);
