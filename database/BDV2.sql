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
        status INT NOT NULL DEFAULT 0 REFERENCES UserTables(id)
    );

    CREATE TABLE Posts (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        content TEXT NOT NULL,
        userFK INT REFERENCES Users(id) ON DELETE CASCADE
    );

    CREATE TABLE Messages(
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        content TEXT,
        user_senderFK INT REFERENCES Users(id) ON DELETE CASCADE,
        user_receiverFK INT REFERENCES Users(id) ON DELETE CASCADE
    );

    CREATE TABLE Follows(
        followedFK INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
        followerFK INT NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
        PRIMARY KEY (followedFK, followerFK)
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
        ('210110037', '$2a$10$N8PXR/ladUnljsUTbNHV6edDQNl5V5xnusgmZUNvp128M3DF/rjfm', 'Felipe', 'Felipinhdez@gmail.com', 'a1.jpg', 0, 0),
        ('210110038', '$2a$10$Z9Y.OxcE.E4afRJA3r5bY.I11wqlG/8st0UFKsFMkuivlIVzMzlkO', 'Chava', 'chava1898@gmail.com', 'a2.jpg', 0, 0),
        ('210110047', '$2a$10$OaKOJiCrk32tNuUwJnQotuMRFUpYJeHgcMaGC3Si.82jTDhBKT/ye', 'Fulanito', 'funalitodetal@gmail.com', 'a3.jpg', 0, 1),
        ('210110045', '$2a$10$ce48PJwh2NqOGr8hI7CexOI0Yrg4UUo3xALiequdF7B7PESmaRymy', 'JoseJuan', 'Josejuan@gmail.com', 'a4.jpg', 0, 0);

    INSERT INTO Posts (content, userFK)
    VALUES 
        ('Buenos días, ya están los resultados en SUBES para la beca jóvenes escribiendo el futuro para que revisen su estatus en el apartado de 
Solicitud → solicitar beca →estatus', 1),
        ('Buen dia el día viernes, de hoy en ocho sus clases las van a tomar en un laboratorio. La siguiente semana les confirmo en cual será solo por ese día. Ya que ocupamos de arreglar toda el aula de usos multiples para la semana de ciencia y tecnologia.', 2),
        ('Perdón va ser a las 10 de la mañana.', 3),
        ('Buen día recordarles que la evaluación de sus proyectos será el día martes 7 de noviembre a las 11:00 en su aula.', 3),
        ('AVISO: A todos los que participaron en altares de muerto o alguna comisión en el evento y que no han entregado la relación de materia y unidad en que se les hará efectivo los 10 puntos extra, favor de entregar en el departamento de vinculación, a más tardar el próximo viernes.', 4),
        ('REDi Inspira Arandas te invita a nuestra próxima conferencia "¿Quién quiere ser millonario? " Explora tecnologías  innovadoras ( NFTs, Blockchain y cripto) Impartida por Guillermo Gutiérrez.   No pierdas las oportunidad ', 5);

    INSERT INTO Messages (content, user_senderFK, user_receiverFK)
    VALUES 
        ('Buenos días, ya están los resultados en SUBES para la beca jóvenes escribiendo el futuro para que revisen su estatus en el apartado de 
Solicitud → solicitar beca →estatus', 1, 2),
        ('Buen dia el día viernes, de hoy en ocho sus clases las van a tomar en un laboratorio. La siguiente semana les confirmo en cual será solo por ese día. Ya que ocupamos de arreglar toda el aula de usos multiples para la semana de ciencia y tecnologia.', 2, 3),
        ('Buen día recordarles que la evaluación de sus proyectos será el día martes 7 de noviembre a las 11:00 en su aula.', 3, 4),
        ('Perdón va ser a las 10 de la mañana.', 3, 4),
        ('REDi Inspira Arandas te invita a nuestra próxima conferencia "¿Quién quiere ser millonario? " Explora tecnologías  innovadoras ( NFTs, Blockchain y cripto) Impartida por Guillermo Gutiérrez.   No pierdas las oportunidad ', 4, 5),
        ('AVISO: A todos los que participaron en altares de muerto o alguna comisión en el evento y que no han entregado la relación de materia y unidad en que se les hará efectivo los 10 puntos extra, favor de entregar en el departamento de vinculación, a más tardar el próximo viernes.', 5, 1);

    INSERT INTO Follows (followedFK, followerFK)
    VALUES 
        (1, 2),
        (2, 3),
        (3, 4),
        (4, 5),
        (5, 1);
