USE BDV1;
CREATE USER 'bdv1_user'@'localhost' IDENTIFIED BY 'contrasemnia';
GRANT ALL PRIVILEGES ON BDV1.* TO 'bdv1_user'@'localhost';
FLUSH PRIVILEGES;