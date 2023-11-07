-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-11-2023 a las 07:27:37
-- Versión del servidor: 8.0.32
-- Versión de PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

CREATE DATABASE IF NOT EXISTS BDV1;
USE BDV1;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `socialmedia`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `IdComentario` int NOT NULL,
  `texto` varchar(250) NOT NULL,
  `IdUsuario` int NOT NULL,
  `date` date NOT NULL,
  `IdPost` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialchat`
--

CREATE TABLE `historialchat` (
  `IdHistorial` int NOT NULL,
  `IdUsuario` int NOT NULL,
  `IdChatPartner` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `likes`
--

CREATE TABLE `likes` (
  `IdLike` int NOT NULL,
  `IdUser` int NOT NULL,
  `IdPost` int NOT NULL,
  `date` date NOT NULL,
  `IdTypeLike` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `IdMensaje` int NOT NULL,
  `IdEmisor` int NOT NULL,
  `IdReceptor` int NOT NULL,
  `MensajeTexto` text NOT NULL,
  `Fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post`
--

CREATE TABLE `post` (
  `IdPost` int NOT NULL,
  `IdUsuario` int NOT NULL,
  `IdTypePost` int NOT NULL,
  `text` varchar(50) NOT NULL,
  `IdPostShared` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `typelike`
--

CREATE TABLE `typelike` (
  `IdTypeLike` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `typelike`
--

INSERT INTO `typelike` (`IdTypeLike`, `nombre`) VALUES
(1, 'UpVote'),
(2, 'DownVote');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `typepost`
--

CREATE TABLE `typepost` (
  `IdTypePost` int NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `IdUsuario` int NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `Correo` varchar(50) NOT NULL,
  `Matricula` int NOT NULL,
  `password` varchar(50) NOT NULL,
  `profile_image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`IdComentario`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdPost` (`IdPost`);

--
-- Indices de la tabla `historialchat`
--
ALTER TABLE `historialchat`
  ADD PRIMARY KEY (`IdHistorial`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdChatPartner` (`IdChatPartner`);

--
-- Indices de la tabla `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`IdLike`),
  ADD KEY `IdPost` (`IdPost`),
  ADD KEY `IdUser` (`IdUser`),
  ADD KEY `IdTypeLike` (`IdTypeLike`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`IdMensaje`),
  ADD KEY `IdEmisor` (`IdEmisor`),
  ADD KEY `IdReceptor` (`IdReceptor`);

--
-- Indices de la tabla `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`IdPost`),
  ADD KEY `IdPost` (`IdPost`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdPostShared` (`IdPostShared`);

--
-- Indices de la tabla `typelike`
--
ALTER TABLE `typelike`
  ADD PRIMARY KEY (`IdTypeLike`);

--
-- Indices de la tabla `typepost`
--
ALTER TABLE `typepost`
  ADD PRIMARY KEY (`IdTypePost`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`IdUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `historialchat`
--
ALTER TABLE `historialchat`
  MODIFY `IdHistorial` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `IdMensaje` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `IdUsuario` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`IdPost`) REFERENCES `post` (`IdPost`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historialchat`
--
ALTER TABLE `historialchat`
  ADD CONSTRAINT `historialchat_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`),
  ADD CONSTRAINT `historialchat_ibfk_2` FOREIGN KEY (`IdChatPartner`) REFERENCES `usuarios` (`IdUsuario`);

--
-- Filtros para la tabla `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`IdPost`) REFERENCES `post` (`IdPost`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`IdUser`) REFERENCES `usuarios` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`IdTypeLike`) REFERENCES `typelike` (`IdTypeLike`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`IdEmisor`) REFERENCES `usuarios` (`IdUsuario`),
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`IdReceptor`) REFERENCES `usuarios` (`IdUsuario`);

--
-- Filtros para la tabla `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`IdPost`) REFERENCES `post` (`IdPostShared`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `typepost`
--
ALTER TABLE `typepost`
  ADD CONSTRAINT `typepost_ibfk_1` FOREIGN KEY (`IdTypePost`) REFERENCES `post` (`IdPostShared`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `comentarios` (`IdUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
