CREATE DATABASE  IF NOT EXISTS `sp_air` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sp_air`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sp_air
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `airports`
--

DROP TABLE IF EXISTS `airports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airports` (
  `airportid` int NOT NULL AUTO_INCREMENT,
  `airportname` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  PRIMARY KEY (`airportid`),
  UNIQUE KEY `airportname_UNIQUE` (`airportname`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airports`
--

LOCK TABLES `airports` WRITE;
/*!40000 ALTER TABLE `airports` DISABLE KEYS */;
INSERT INTO `airports` VALUES (1,'Changi','Singapore','Main International Airport of Singapore'),(2,'Narita','Tokyo','Main International Airport of Tokyo'),(3,'Heathrow','London','Main International Airport of London'),(4,'Kansai','Osaka','Main International Airport of Japan'),(5,'Suvarnabhumi','Bangkok','Main International Airport of Thailand');
/*!40000 ALTER TABLE `airports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `bookingid` int NOT NULL AUTO_INCREMENT,
  `flightid` int NOT NULL,
  `userid` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `passport` varchar(45) NOT NULL,
  `nationality` varchar(45) NOT NULL,
  `age` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bookingid`),
  KEY `flightid_idx` (`flightid`),
  KEY `userid_idx` (`userid`),
  CONSTRAINT `flightid` FOREIGN KEY (`flightid`) REFERENCES `flights` (`flightid`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `userid` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flights`
--

DROP TABLE IF EXISTS `flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flights` (
  `flightid` int NOT NULL AUTO_INCREMENT,
  `flightCode` varchar(45) NOT NULL,
  `aircraft` varchar(45) NOT NULL,
  `originAirport` int NOT NULL,
  `destinationAirport` int NOT NULL,
  `embarkDate` varchar(45) NOT NULL,
  `travelTime` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`flightid`),
  KEY `originAirport_idx` (`originAirport`),
  KEY `destinationAirport_idx` (`destinationAirport`),
  CONSTRAINT `destinationAirport` FOREIGN KEY (`destinationAirport`) REFERENCES `airports` (`airportid`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `originAirport` FOREIGN KEY (`originAirport`) REFERENCES `airports` (`airportid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flights`
--

LOCK TABLES `flights` WRITE;
/*!40000 ALTER TABLE `flights` DISABLE KEYS */;
INSERT INTO `flights` VALUES (2,'SP370','BOEING 787',2,3,'2022/12/23 08:20','10 hours 10 mins','985.40','2022-06-25 19:06:00'),(3,'SP110','BOEING 737',1,2,'2022/12/22 08:20','6 hours 50 mins','855.50','2022-06-25 19:12:28'),(4,'SP112','BOEING 737',1,4,'2022/12/22 08:20','6 hours 50 mins','855.50','2022-07-01 08:11:13'),(5,'SP113','BOEING 747',4,5,'2022/12/22 09:20','10 hours','100','2022-07-01 08:16:36'),(6,'SP114','BOEING 747',4,5,'2022/12/23 10:20','10 hours','200','2022-07-17 11:46:30'),(7,'SP114','BOEING 747',5,4,'2022/12/25 10:20','10 hours','300','2022-07-17 11:46:30');
/*!40000 ALTER TABLE `flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `imageid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `imagepath` varchar(1000) NOT NULL,
  PRIMARY KEY (`imageid`),
  KEY `usertid_fk_idx` (`userid`),
  CONSTRAINT `usertid_fk` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,3,'uploads\\2022-08-06T18-17-49.928ZScreenshot 2021-03-27 224643.png'),(2,4,'uploads\\default.png'),(3,5,'uploads\\default.png'),(4,6,'uploads\\2022-08-07T04-42-04.838ZAnnotation 2020-05-30 153152.png');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `promoid` int NOT NULL AUTO_INCREMENT,
  `promoflightid` int NOT NULL,
  `promostart` varchar(100) NOT NULL,
  `promoend` varchar(100) NOT NULL,
  `discount` varchar(45) NOT NULL,
  PRIMARY KEY (`promoid`),
  KEY `promoflightid_idx` (`promoflightid`),
  CONSTRAINT `promoflightid` FOREIGN KEY (`promoflightid`) REFERENCES `flights` (`flightid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (1,3,'2022-06-24','2022-12-24','30%'),(2,4,'2022-06-24','2022-12-24','20%');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transfers`
--

DROP TABLE IF EXISTS `transfers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transfers` (
  `transferid` int NOT NULL AUTO_INCREMENT,
  `firstFlightid` int NOT NULL,
  `secondFlightid` int NOT NULL,
  `originAirportid` int NOT NULL,
  `transferAirportid` int NOT NULL,
  `destinationAirportid` int NOT NULL,
  PRIMARY KEY (`transferid`),
  KEY `firstFlightid_idx` (`firstFlightid`),
  KEY `secondFlightid_idx` (`secondFlightid`),
  KEY `originAirportid_idx` (`originAirportid`),
  KEY `transferAirportid_idx` (`transferAirportid`),
  KEY `destinationAirportid_idx` (`destinationAirportid`),
  CONSTRAINT `destinationAirportid` FOREIGN KEY (`destinationAirportid`) REFERENCES `airports` (`airportid`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `firstFlightid` FOREIGN KEY (`firstFlightid`) REFERENCES `flights` (`flightid`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `originAirportid` FOREIGN KEY (`originAirportid`) REFERENCES `airports` (`airportid`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `secondFlightid` FOREIGN KEY (`secondFlightid`) REFERENCES `flights` (`flightid`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `transferAirportid` FOREIGN KEY (`transferAirportid`) REFERENCES `airports` (`airportid`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transfers`
--

LOCK TABLES `transfers` WRITE;
/*!40000 ALTER TABLE `transfers` DISABLE KEYS */;
INSERT INTO `transfers` VALUES (1,3,2,1,2,3),(2,4,5,1,4,5);
/*!40000 ALTER TABLE `transfers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contact` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` varchar(45) NOT NULL,
  `profile_pic_url` varchar(45) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'mooingcow','moo@cow.com','77777777','abcd1234','Customer','https://www.abc.com/cow.jpg','2022-07-12 12:36:20'),(4,'cowingmoo','cow@moo.com','88888888','1234abcd','Admin','https://www.abc.com/moo.jpg','2022-07-26 10:13:24'),(5,'a','a','99','a','Admin','https://www.abc.com/a.jpg','2022-07-26 12:59:50'),(6,'b','b@b','6666','b','Customer','https://www.abc.com/b.jpg','2022-08-07 04:39:25');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-07 13:55:07
