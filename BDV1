 

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

 
CREATE TABLE `comentarios` (
  `IdComentario` int NOT NULL,
  `texto` varchar(250) NOT NULL,
  `IdUsuario` int NOT NULL,
  `date` date NOT NULL,
  `IdPost` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

 
CREATE TABLE `likes` (
  `IdLike` int NOT NULL,
  `IdUser` int NOT NULL,
  `IdPost` int NOT NULL,
  `date` date NOT NULL,
  `IdTypeLike` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
 

CREATE TABLE `post` (
  `IdPost` int NOT NULL,
  `IdUsuario` int NOT NULL,
  `IdTypePost` int NOT NULL,
  `text` varchar(50) NOT NULL,
  `IdPostShared` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

 
CREATE TABLE `typelike` (
  `IdTypeLike` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

 
INSERT INTO `typelike` (`IdTypeLike`, `nombre`) VALUES
(1, 'UpVote'),
(2, 'DownVote');

 

CREATE TABLE `typepost` (
  `IdTypePost` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

 
CREATE TABLE `usuarios` (
  `IdUsuario` int NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Matricula` int NOT NULL,
  `password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

 
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`IdComentario`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdPost` (`IdPost`);
 
ALTER TABLE `likes`
  ADD PRIMARY KEY (`IdLike`),
  ADD KEY `IdPost` (`IdPost`),
  ADD KEY `IdUser` (`IdUser`),
  ADD KEY `IdTypeLike` (`IdTypeLike`);
 
ALTER TABLE `post`
  ADD PRIMARY KEY (`IdPost`),
  ADD KEY `IdPost` (`IdPost`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdPostShared` (`IdPostShared`);

 
ALTER TABLE `typelike`
  ADD PRIMARY KEY (`IdTypeLike`);
 
ALTER TABLE `typepost`
  ADD PRIMARY KEY (`IdTypePost`);

 
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`IdUsuario`);
 
--
ALTER TABLE `usuarios`
  MODIFY `IdUsuario` int NOT NULL AUTO_INCREMENT;

 
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`IdPost`) REFERENCES `post` (`IdPost`) ON DELETE CASCADE ON UPDATE CASCADE;

 
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`IdPost`) REFERENCES `post` (`IdPost`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`IdUser`) REFERENCES `usuarios` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`IdTypeLike`) REFERENCES `typelike` (`IdTypeLike`) ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`IdPost`) REFERENCES `post` (`IdPostShared`) ON DELETE CASCADE ON UPDATE CASCADE;
 
ALTER TABLE `typepost`
  ADD CONSTRAINT `typepost_ibfk_1` FOREIGN KEY (`IdTypePost`) REFERENCES `post` (`IdPostShared`) ON DELETE CASCADE ON UPDATE CASCADE;

 
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `comentarios` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
 
