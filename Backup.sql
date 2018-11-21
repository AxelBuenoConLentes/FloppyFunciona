-- MySQL dump 10.13  Distrib 5.7.21, for Win64 (x86_64)
--
-- Host: localhost    Database: Floppy
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id_adm` mediumint(9) NOT NULL AUTO_INCREMENT,
  `nom_adm` varchar(100) NOT NULL,
  `pas_adm` text NOT NULL,
  `cor_adm` varchar(100) NOT NULL,
  PRIMARY KEY (`id_adm`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'Mauricio','U2FsdGVkX1+QTw2RuHGTeZso5eaWqcKM8IHjbWsOCpc=','mauricioruiz01@live.com');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car` (
  `id_car` mediumint(9) NOT NULL AUTO_INCREMENT,
  `let_car` varchar(100) NOT NULL,
  `est_car` bit(1) DEFAULT b'1',
  `mar_car` varchar(100) NOT NULL,
  `id_usu` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`id_car`),
  KEY `id_usu` (`id_usu`),
  CONSTRAINT `car_ibfk_1` FOREIGN KEY (`id_usu`) REFERENCES `habitante` (`id_usu`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,'ACB899','\0','Chevrolet',NULL),(2,'PLI6456','','Mazda',NULL),(3,'PLS899','','Volkswagen',NULL),(4,'TYS999','','Ferrari',NULL),(5,'TBS9345','','Audi',NULL),(6,'MAS887','','Mazda',NULL),(7,'MAP9987','','Chevrolet',NULL),(8,'BSP7987','','Lincoln',NULL),(9,'LIP7987','','Lincoln',NULL);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fraccionamiento`
--

DROP TABLE IF EXISTS `fraccionamiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fraccionamiento` (
  `id_fra` mediumint(9) NOT NULL AUTO_INCREMENT,
  `dir_fra` varchar(100) NOT NULL,
  `cap_fra` int(11) NOT NULL,
  `cla_fra` text,
  `id_vig` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`id_fra`),
  KEY `id_vig` (`id_vig`),
  CONSTRAINT `fraccionamiento_ibfk_1` FOREIGN KEY (`id_vig`) REFERENCES `vigilante` (`id_vig`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fraccionamiento`
--

LOCK TABLES `fraccionamiento` WRITE;
/*!40000 ALTER TABLE `fraccionamiento` DISABLE KEYS */;
INSERT INTO `fraccionamiento` VALUES (2,'Ciudad Almeja',9,'MdlkTLZ3FrKlaMFZ2uBFPw==',2),(3,'Ciudad De Saltadilla',9,'MJIXEI+oAqT/QhiYgb5TS8EpEZSSDEdQbZ5Gp43aHwA=',3);
/*!40000 ALTER TABLE `fraccionamiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitante`
--

DROP TABLE IF EXISTS `habitante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `habitante` (
  `id_usu` mediumint(9) NOT NULL AUTO_INCREMENT,
  `nom_usu` varchar(100) NOT NULL,
  `cor_usu` varchar(100) NOT NULL,
  `pas_usu` text NOT NULL,
  `let_hab` varchar(100) NOT NULL,
  `id_car` mediumint(9) DEFAULT NULL,
  `id_fra` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`id_usu`),
  KEY `id_fra` (`id_fra`),
  CONSTRAINT `habitante_ibfk_1` FOREIGN KEY (`id_fra`) REFERENCES `fraccionamiento` (`id_fra`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitante`
--

LOCK TABLES `habitante` WRITE;
/*!40000 ALTER TABLE `habitante` DISABLE KEYS */;
INSERT INTO `habitante` VALUES (1,'Aguilar Dorantes Irma','agular@gmail.com','qU1PZPP6HMAQQTgqtsBH5Q==','ACB899',1,2),(2,'Alcoverde Martínez Roberto Antonio','robert_09@gmail.com','ck/xIufnhy3qLMof4N/VRg==','PLI6456',2,2),(3,'Aguilar Dorantes Irma','irma666@gmail.com','vzlz9tZfcwIdRw1GOI96/Q==','PLS899',3,2),(4,'Bolaños Sánchez César ','cesarscracht55@gmail.com','vzlz9tZfcwIdRw1GOI96/Q==','TYS999',4,2),(5,'Buenfil Díaz Iván','ivan@yahoo.com','fw3WKD5LhVcGmU8uwr2LIQ==','TBS9345',5,2),(6,'Cámara Contreras César Armando','armando@yahoo.com','LKk2xlp1VApezgThwIyMLg==','MAS887',6,2),(7,'Carrillo Trujillo Mayra del Carmen','bobi_yte@yahoo.com','B8B2/SdwYvEfbMiFt44DYw==','MAP9987',7,2),(8,'Delgado Salgado Clemente','unvcato@yahoo.com','sFEHhgU8lQ6cSQ8GbKEvvw==','BSP7987',8,2),(9,'Domínguez Romo Gerardo','domingo@yahoo.com','sFEHhgU8lQ6cSQ8GbKEvvw==','LIP7987',9,2);
/*!40000 ALTER TABLE `habitante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vigilante`
--

DROP TABLE IF EXISTS `vigilante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vigilante` (
  `id_vig` mediumint(9) NOT NULL AUTO_INCREMENT,
  `nom_vig` varchar(100) NOT NULL,
  `pas_vig` text NOT NULL,
  `cor_vig` varchar(100) NOT NULL,
  `dir_vig` varchar(100) NOT NULL,
  `tel_vig` varchar(100) NOT NULL,
  `id_fra` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`id_vig`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vigilante`
--

LOCK TABLES `vigilante` WRITE;
/*!40000 ALTER TABLE `vigilante` DISABLE KEYS */;
INSERT INTO `vigilante` VALUES (2,'Mauricio Emiliano Ruiz Alamilla','VhChukf0fDIIqiGB2F+cvw==','mauricioruiz01@live.com','Ciudad Almeja','Tz3NiwLdelGGfVLe66GKEw==',NULL),(3,'Axel Malvaes','ck/xIufnhy3qLMof4N/VRg==','malva@live.com','Ciudad De Saltadilla','pR6SB+aoiKUh2LL+i92Lzg==',NULL);
/*!40000 ALTER TABLE `vigilante` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-14 11:10:20
