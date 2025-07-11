-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: ballast.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  `is_enabled` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (4,'Jus',16,1),(5,'Legumes',16,1),(6,'Desserts',16,1),(7,'Diner',16,1),(8,'Entrées',16,1),(9,'Plats Traditionnels',16,1),(10,'Grillades',16,1),(11,'Fruits de Mer',16,1);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `phone` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `is_member` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `tenant_id` int NOT NULL,
  PRIMARY KEY (`phone`,`tenant_id`),
  KEY `customers_ibfk_1` (`tenant_id`),
  CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('671262483','romel Kenfack','goldmasterteam33@gmail.com','2025-08-03',NULL,0,'2025-07-09 08:34:20','2025-07-09 08:34:20',16);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exchange_rates`
--

DROP TABLE IF EXISTS `exchange_rates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exchange_rates` (
  `currency_code` varchar(5) NOT NULL,
  `rate_to_usd` decimal(10,6) DEFAULT NULL,
  PRIMARY KEY (`currency_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exchange_rates`
--

LOCK TABLES `exchange_rates` WRITE;
/*!40000 ALTER TABLE `exchange_rates` DISABLE KEYS */;
/*!40000 ALTER TABLE `exchange_rates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_id` int DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `average_rating` double(10,2) DEFAULT NULL,
  `food_quality_rating` double(10,2) DEFAULT NULL,
  `service_rating` double(10,2) DEFAULT NULL,
  `staff_behavior_rating` double(10,2) DEFAULT NULL,
  `ambiance_rating` double(10,2) DEFAULT NULL,
  `recommend_rating` double(10,2) DEFAULT NULL,
  `remarks` mediumtext,
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `invoice_id` (`invoice_id`,`tenant_id`),
  KEY `phone` (`phone`,`tenant_id`),
  CONSTRAINT `feedbacks_ibfk_3` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedbacks_ibfk_4` FOREIGN KEY (`invoice_id`, `tenant_id`) REFERENCES `invoices` (`id`, `tenant_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `feedbacks_ibfk_5` FOREIGN KEY (`phone`, `tenant_id`) REFERENCES `customers` (`phone`, `tenant_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (9,1,'671262483','2025-07-09 08:34:20',NULL,3.80,5.00,2.00,3.00,4.00,5.00,'Saisissez vos coordonnées pour enregistrer votre réponse !',16),(10,8,'671262483','2025-07-09 09:48:31',NULL,4.20,4.00,5.00,4.00,3.00,5.00,'Très bien que les autres pays de la Commission de la loi de l\'impôt sur le',16);
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_items`
--

DROP TABLE IF EXISTS `inventory_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `quantity` decimal(10,4) DEFAULT '0.0000',
  `unit` enum('pc','kg','g','l','ml') NOT NULL,
  `min_quantity_threshold` decimal(10,4) NOT NULL,
  `status` enum('low','in','out') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tenant_id_idx` (`tenant_id`),
  CONSTRAINT `fk_tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_items`
--

LOCK TABLES `inventory_items` WRITE;
/*!40000 ALTER TABLE `inventory_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_logs`
--

DROP TABLE IF EXISTS `inventory_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenant_id` int NOT NULL,
  `inventory_item_id` int NOT NULL,
  `type` enum('IN','OUT','WASTAGE') NOT NULL,
  `quantity_change` decimal(10,4) NOT NULL,
  `previous_quantity` decimal(10,4) DEFAULT NULL,
  `new_quantity` decimal(10,4) DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  KEY `inventory_item_id` (`inventory_item_id`),
  KEY `inventory_logs_ibfk_3` (`created_by`),
  CONSTRAINT `inventory_logs_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_logs_ibfk_2` FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `inventory_logs_ibfk_3` FOREIGN KEY (`created_by`) REFERENCES `users` (`username`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_logs`
--

LOCK TABLES `inventory_logs` WRITE;
/*!40000 ALTER TABLE `inventory_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `inventory_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice_sequences`
--

DROP TABLE IF EXISTS `invoice_sequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice_sequences` (
  `tenant_id` int NOT NULL,
  `sequence_no` int DEFAULT NULL,
  PRIMARY KEY (`tenant_id`),
  CONSTRAINT `invoice_sequences_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice_sequences`
--

LOCK TABLES `invoice_sequences` WRITE;
/*!40000 ALTER TABLE `invoice_sequences` DISABLE KEYS */;
INSERT INTO `invoice_sequences` VALUES (16,10);
/*!40000 ALTER TABLE `invoice_sequences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoices` (
  `id` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `sub_total` decimal(10,2) DEFAULT NULL,
  `tax_total` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `tenant_id` int NOT NULL,
  `payment_type_id` int DEFAULT NULL,
  `service_charge_total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`,`tenant_id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
INSERT INTO `invoices` VALUES (1,'2025-07-09 08:33:42',60000.00,0.00,60000.00,16,13,0.00),(2,'2025-07-09 09:15:06',9000.00,0.00,9000.00,16,12,0.00),(3,'2025-07-09 09:15:33',10000.00,0.00,10000.00,16,13,0.00),(4,'2025-07-09 09:16:29',16000.00,0.00,16000.00,16,12,0.00),(5,'2025-07-09 09:47:01',20000.00,0.00,20000.00,16,12,0.00),(6,'2025-07-09 09:47:10',20000.00,0.00,20000.00,16,13,0.00),(7,'2025-07-09 09:47:27',135000.00,0.00,135000.00,16,13,0.00),(8,'2025-07-09 09:47:49',375000.00,0.00,375000.00,16,13,0.00),(9,'2025-07-09 13:19:57',266000.00,0.00,266000.00,16,13,0.00),(10,'2025-07-09 13:49:36',106000.00,0.00,106000.00,16,12,0.00);
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_item_addons`
--

DROP TABLE IF EXISTS `menu_item_addons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_item_addons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`,`item_id`),
  KEY `fk_menu_item_idx` (`item_id`),
  KEY `fk_menu_item_idx_index` (`item_id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `fk_addon_menu_item` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_item_addons_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_item_addons`
--

LOCK TABLES `menu_item_addons` WRITE;
/*!40000 ALTER TABLE `menu_item_addons` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu_item_addons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_item_recipes`
--

DROP TABLE IF EXISTS `menu_item_recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_item_recipes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `menu_item_id` int DEFAULT NULL,
  `variant_id` int NOT NULL DEFAULT '0',
  `addon_id` int NOT NULL DEFAULT '0',
  `inventory_item_id` int NOT NULL,
  `quantity` decimal(10,4) NOT NULL,
  `tenant_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_recipe_combo` (`menu_item_id`,`inventory_item_id`,`variant_id`,`addon_id`),
  KEY `inventory_item_id` (`inventory_item_id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `menu_item_recipes_ibfk_1` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_item_recipes_ibfk_2` FOREIGN KEY (`inventory_item_id`) REFERENCES `inventory_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `menu_item_recipes_ibfk_3` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_item_recipes`
--

LOCK TABLES `menu_item_recipes` WRITE;
/*!40000 ALTER TABLE `menu_item_recipes` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu_item_recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_item_variants`
--

DROP TABLE IF EXISTS `menu_item_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_item_variants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `item_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`,`item_id`),
  KEY `fk_variant_menu_item_id_idx` (`item_id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `fk_variant_menu_item_id` FOREIGN KEY (`item_id`) REFERENCES `menu_items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `menu_item_variants_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_item_variants`
--

LOCK TABLES `menu_item_variants` WRITE;
/*!40000 ALTER TABLE `menu_item_variants` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu_item_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `net_price` decimal(10,2) DEFAULT NULL,
  `tax_id` int DEFAULT NULL,
  `image` varchar(2000) DEFAULT NULL,
  `category` int DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  `is_enabled` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `menu_items_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (19,'Poulet DG','Poulet tendre mijoté avec légumes croquants, plantains dorés et pommes de terre aux épices locales.',5000.00,5000.00,NULL,'/public/16/19',9,16,1),(20,'Bœuf grillé ','Cette recette ensoleille la viande de boeuf avec un mélange de cumin réhaussé de quatre épices, du piment d\'Espelette et des herbes de Provence, une association étonnante mais très savoureuse à tester sans hésiter.',3000.00,3000.00,NULL,'/public/16/20',10,16,1),(21,'Mousse chocolat','La mousse au chocolat est un dessert dont la composition traditionnelle comporte au minimum du chocolat et du blanc d\'œuf, monté en neige. Elle peut parfois être agrémentée de sel ou de jaune d’œuf, de sucre ou de crème montée, d\'épices ou de zestes d\'agrumes.',2500.00,2500.00,NULL,'/public/16/21',6,16,1),(22,'Crevettes sautées à l’ail','Les fruits de mer, en particulier les crevettes, sont très peu caloriques. Elles permettent ainsi de se régaler sans culpabiliser, et de faire le plein de protéines tout en ne faisant pas celui de lipides ! Les crevettes marinées ou cuisinées avec un peu d\'huile d\'olive et relevées par l\'ail, des herbes et des épices, ces recettes de crevettes sautées font frétiller les papilles des plus gourmands. Cette recette de crevettes sautées à l’ail vous est proposée par Dominique Boute, fondateur et nut',5000.00,5000.00,NULL,'/public/16/22',11,16,1);
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `status` enum('created','preparing','completed','cancelled','delivered') DEFAULT 'created',
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `notes` varchar(255) DEFAULT NULL,
  `addons` mediumtext,
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=362 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (151,109,19,NULL,5000.00,12,'completed','2025-07-09 08:31:14','Remarques (100 caractères max.)',NULL,16),(152,110,20,NULL,3000.00,1,'completed','2025-07-09 09:15:06',NULL,NULL,16),(153,110,20,NULL,3000.00,1,'completed','2025-07-09 09:15:06',NULL,NULL,16),(154,110,20,NULL,3000.00,1,'completed','2025-07-09 09:15:06',NULL,NULL,16),(155,111,20,NULL,3000.00,1,'completed','2025-07-09 09:15:22',NULL,NULL,16),(156,111,19,NULL,5000.00,1,'completed','2025-07-09 09:15:22',NULL,NULL,16),(157,111,20,NULL,3000.00,1,'completed','2025-07-09 09:15:22',NULL,NULL,16),(158,111,19,NULL,5000.00,1,'completed','2025-07-09 09:15:22',NULL,NULL,16),(159,112,19,NULL,5000.00,1,'completed','2025-07-09 09:15:33',NULL,NULL,16),(160,112,19,NULL,5000.00,1,'completed','2025-07-09 09:15:33',NULL,NULL,16),(161,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(162,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(163,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(164,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(165,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(166,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(167,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(168,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(169,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(170,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(171,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(172,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(173,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(174,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(175,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(176,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(177,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(178,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(179,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(180,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(181,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(182,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(183,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(184,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(185,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(186,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(187,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(188,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(189,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(190,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(191,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(192,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(193,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(194,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(195,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(196,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(197,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(198,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(199,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(200,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(201,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(202,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(203,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(204,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(205,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(206,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(207,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(208,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(209,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(210,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(211,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(212,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(213,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(214,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(215,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(216,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(217,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(218,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(219,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(220,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(221,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(222,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(223,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(224,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(225,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(226,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(227,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(228,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(229,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(230,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(231,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(232,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(233,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(234,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(235,113,22,NULL,5000.00,1,'created','2025-07-09 09:46:39',NULL,NULL,16),(236,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(237,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(238,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(239,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(240,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(241,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(242,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(243,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(244,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(245,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(246,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(247,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(248,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(249,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(250,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(251,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(252,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(253,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(254,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(255,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(256,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(257,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(258,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(259,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(260,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(261,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(262,114,19,NULL,5000.00,1,'created','2025-07-09 09:46:51',NULL,NULL,16),(263,115,19,NULL,5000.00,1,'created','2025-07-09 09:47:01',NULL,NULL,16),(264,115,19,NULL,5000.00,1,'created','2025-07-09 09:47:01',NULL,NULL,16),(265,115,19,NULL,5000.00,1,'created','2025-07-09 09:47:01',NULL,NULL,16),(266,115,19,NULL,5000.00,1,'created','2025-07-09 09:47:01',NULL,NULL,16),(267,116,19,NULL,5000.00,1,'created','2025-07-09 09:47:10',NULL,NULL,16),(268,116,19,NULL,5000.00,1,'created','2025-07-09 09:47:10',NULL,NULL,16),(269,116,19,NULL,5000.00,1,'created','2025-07-09 09:47:10',NULL,NULL,16),(270,116,19,NULL,5000.00,1,'created','2025-07-09 09:47:10',NULL,NULL,16),(271,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(272,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(273,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(274,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(275,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(276,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(277,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(278,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(279,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(280,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(281,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(282,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(283,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(284,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(285,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(286,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(287,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(288,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(289,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(290,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(291,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(292,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(293,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(294,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(295,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(296,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(297,117,20,NULL,3000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(298,117,21,NULL,2500.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(299,117,21,NULL,2500.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(300,117,21,NULL,2500.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(301,117,21,NULL,2500.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(302,117,21,NULL,2500.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(303,117,21,NULL,2500.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(304,117,21,NULL,2500.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(305,117,21,NULL,2500.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(306,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(307,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(308,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(309,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(310,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(311,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(312,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(313,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(314,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(315,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(316,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(317,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(318,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(319,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(320,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(321,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(322,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(323,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(324,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(325,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(326,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(327,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(328,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(329,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(330,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(331,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(332,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(333,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(334,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(335,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(336,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(337,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(338,117,22,NULL,5000.00,1,'created','2025-07-09 13:19:57',NULL,NULL,16),(339,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(340,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(341,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(342,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(343,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(344,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(345,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(346,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(347,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(348,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(349,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(350,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(351,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(352,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(353,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(354,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37','Tableau de bord complet et détaillé. ⚡',NULL,16),(355,118,19,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(356,118,20,NULL,3000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(357,118,21,NULL,2500.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(358,118,22,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(359,118,21,NULL,2500.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(360,118,20,NULL,3000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16),(361,118,19,NULL,5000.00,1,'created','2025-07-09 13:49:37',NULL,NULL,16);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `delivery_type` varchar(90) DEFAULT NULL,
  `customer_type` enum('WALKIN','CUSTOMER') DEFAULT 'WALKIN',
  `customer_id` varchar(20) DEFAULT NULL,
  `table_id` int DEFAULT NULL,
  `status` enum('created','completed','cancelled') DEFAULT 'created',
  `token_no` int DEFAULT NULL,
  `payment_status` enum('pending','paid') DEFAULT 'pending',
  `invoice_id` int DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (109,'2025-07-09 08:31:14','dinein','WALKIN',NULL,NULL,'completed',1,'paid',1,16),(110,'2025-07-09 09:15:06','','CUSTOMER','671262483',NULL,'completed',2,'paid',2,16),(111,'2025-07-09 09:15:22','','WALKIN',NULL,NULL,'completed',3,'paid',4,16),(112,'2025-07-09 09:15:33','','WALKIN',NULL,NULL,'completed',4,'paid',3,16),(113,'2025-07-09 09:46:39','','CUSTOMER','671262483',NULL,'completed',5,'paid',8,16),(114,'2025-07-09 09:46:51','','WALKIN',NULL,NULL,'completed',6,'paid',7,16),(115,'2025-07-09 09:47:01','','WALKIN',NULL,NULL,'completed',7,'paid',5,16),(116,'2025-07-09 09:47:10','','WALKIN',NULL,NULL,'completed',8,'paid',6,16),(117,'2025-07-09 13:19:57','','CUSTOMER','671262483',NULL,'cancelled',9,'paid',9,16),(118,'2025-07-09 13:49:37','','CUSTOMER','671262483',NULL,'completed',10,'paid',10,16);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_types`
--

DROP TABLE IF EXISTS `payment_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `payment_types_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_types`
--

LOCK TABLES `payment_types` WRITE;
/*!40000 ALTER TABLE `payment_types` DISABLE KEYS */;
INSERT INTO `payment_types` VALUES (11,'MOMO',1,16,'cash'),(12,'OM',1,16,'card'),(13,'CASH',1,16,'discount'),(14,'PAYPAL',1,16,'qrcode');
/*!40000 ALTER TABLE `payment_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `print_settings`
--

DROP TABLE IF EXISTS `print_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `print_settings` (
  `tenant_id` int NOT NULL,
  `page_format` varchar(5) DEFAULT NULL,
  `header` varchar(2000) DEFAULT NULL,
  `footer` varchar(2000) DEFAULT NULL,
  `show_notes` tinyint(1) DEFAULT NULL,
  `is_enable_print` tinyint(1) DEFAULT NULL,
  `show_store_details` tinyint(1) DEFAULT NULL,
  `show_customer_details` tinyint(1) DEFAULT NULL,
  `print_token` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`tenant_id`),
  CONSTRAINT `ps_tenantid_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `print_settings`
--

LOCK TABLES `print_settings` WRITE;
/*!40000 ALTER TABLE `print_settings` DISABLE KEYS */;
/*!40000 ALTER TABLE `print_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qr_order_items`
--

DROP TABLE IF EXISTS `qr_order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qr_order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `status` enum('created','preparing','completed','cancelled','delivered') DEFAULT 'created',
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `notes` varchar(255) DEFAULT NULL,
  `addons` mediumtext,
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `tenant_id` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_order_items`
--

LOCK TABLES `qr_order_items` WRITE;
/*!40000 ALTER TABLE `qr_order_items` DISABLE KEYS */;
INSERT INTO `qr_order_items` VALUES (48,39,19,NULL,5000.00,12,'created','2025-07-09 08:24:44',NULL,NULL,16),(49,40,20,NULL,3000.00,1,'created','2025-07-09 08:47:32',NULL,NULL,16),(50,40,20,NULL,3000.00,1,'created','2025-07-09 08:47:32',NULL,NULL,16),(51,40,20,NULL,3000.00,1,'created','2025-07-09 08:47:32',NULL,NULL,16),(52,41,20,NULL,3000.00,1,'created','2025-07-09 09:02:32',NULL,NULL,16),(53,41,19,NULL,5000.00,1,'created','2025-07-09 09:02:32',NULL,NULL,16),(54,41,20,NULL,3000.00,1,'created','2025-07-09 09:02:32',NULL,NULL,16),(55,41,19,NULL,5000.00,1,'created','2025-07-09 09:02:32',NULL,NULL,16),(56,42,19,NULL,5000.00,1,'created','2025-07-09 09:14:30',NULL,NULL,16),(57,42,19,NULL,5000.00,1,'created','2025-07-09 09:14:30',NULL,NULL,16),(58,43,19,NULL,5000.00,1,'created','2025-07-09 09:25:40',NULL,NULL,16),(59,43,19,NULL,5000.00,1,'created','2025-07-09 09:25:40',NULL,NULL,16),(60,43,19,NULL,5000.00,1,'created','2025-07-09 09:25:40',NULL,NULL,16),(61,43,19,NULL,5000.00,1,'created','2025-07-09 09:25:40',NULL,NULL,16),(62,44,19,NULL,5000.00,1,'created','2025-07-09 09:25:40',NULL,NULL,16),(63,44,19,NULL,5000.00,1,'created','2025-07-09 09:25:40',NULL,NULL,16),(64,44,19,NULL,5000.00,1,'created','2025-07-09 09:25:40',NULL,NULL,16),(65,44,19,NULL,5000.00,1,'created','2025-07-09 09:25:40',NULL,NULL,16),(66,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(67,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(68,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(69,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(70,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(71,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(72,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(73,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(74,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(75,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(76,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(77,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(78,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(79,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(80,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(81,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(82,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(83,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(84,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(85,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(86,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(87,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(88,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(89,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(90,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(91,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(92,45,19,NULL,5000.00,1,'created','2025-07-09 09:26:00',NULL,NULL,16),(93,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(94,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(95,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(96,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(97,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(98,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(99,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(100,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(101,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(102,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(103,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(104,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(105,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(106,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(107,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(108,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(109,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(110,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(111,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(112,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(113,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(114,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(115,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(116,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(117,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(118,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(119,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(120,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(121,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(122,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(123,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(124,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(125,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(126,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(127,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(128,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(129,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(130,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(131,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(132,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(133,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(134,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(135,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(136,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(137,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(138,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(139,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(140,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(141,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(142,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(143,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(144,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(145,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(146,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(147,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(148,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(149,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(150,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(151,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(152,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(153,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(154,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(155,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(156,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(157,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(158,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(159,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(160,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(161,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(162,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(163,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(164,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(165,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(166,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(167,46,22,NULL,5000.00,1,'created','2025-07-09 09:45:25',NULL,NULL,16),(168,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(169,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(170,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(171,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(172,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(173,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(174,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(175,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(176,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(177,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(178,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(179,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(180,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(181,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(182,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(183,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(184,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(185,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(186,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(187,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(188,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(189,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(190,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(191,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(192,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(193,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(194,47,20,NULL,3000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(195,47,21,NULL,2500.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(196,47,21,NULL,2500.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(197,47,21,NULL,2500.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(198,47,21,NULL,2500.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(199,47,21,NULL,2500.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(200,47,21,NULL,2500.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(201,47,21,NULL,2500.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(202,47,21,NULL,2500.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(203,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(204,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(205,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(206,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(207,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(208,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(209,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(210,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(211,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(212,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(213,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(214,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(215,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(216,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(217,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(218,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(219,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(220,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(221,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(222,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(223,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(224,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(225,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(226,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(227,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(228,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(229,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(230,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(231,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(232,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(233,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(234,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(235,47,22,NULL,5000.00,1,'created','2025-07-09 10:41:08',NULL,NULL,16),(236,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(237,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(238,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(239,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(240,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(241,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(242,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(243,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(244,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(245,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(246,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(247,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(248,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(249,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(250,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00',NULL,NULL,16),(251,48,22,NULL,5000.00,1,'created','2025-07-09 13:49:00','Tableau de bord complet et détaillé. ⚡',NULL,16),(252,49,19,NULL,5000.00,1,'created','2025-07-09 18:36:43',NULL,NULL,16),(253,49,21,NULL,2500.00,1,'created','2025-07-09 18:36:43',NULL,NULL,16),(254,49,22,NULL,5000.00,1,'created','2025-07-09 18:36:43',NULL,NULL,16),(255,49,22,NULL,5000.00,1,'created','2025-07-09 18:36:43',NULL,NULL,16);
/*!40000 ALTER TABLE `qr_order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qr_orders`
--

DROP TABLE IF EXISTS `qr_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `qr_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `delivery_type` varchar(90) DEFAULT NULL,
  `customer_type` enum('WALKIN','CUSTOMER') DEFAULT 'WALKIN',
  `customer_id` varchar(20) DEFAULT NULL,
  `table_id` int DEFAULT NULL,
  `status` enum('created','completed','cancelled') DEFAULT 'created',
  `payment_status` enum('pending','paid') DEFAULT 'pending',
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `tenantId` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_orders`
--

LOCK TABLES `qr_orders` WRITE;
/*!40000 ALTER TABLE `qr_orders` DISABLE KEYS */;
INSERT INTO `qr_orders` VALUES (39,'2025-07-09 08:24:44',NULL,'WALKIN',NULL,NULL,'completed','pending',16),(40,'2025-07-09 08:47:32',NULL,'CUSTOMER','671262483',NULL,'completed','pending',16),(41,'2025-07-09 09:02:32',NULL,'WALKIN',NULL,NULL,'completed','pending',16),(42,'2025-07-09 09:14:30',NULL,'WALKIN',NULL,NULL,'completed','pending',16),(43,'2025-07-09 09:25:40',NULL,'WALKIN',NULL,NULL,'completed','pending',16),(44,'2025-07-09 09:25:40',NULL,'WALKIN',NULL,NULL,'completed','pending',16),(45,'2025-07-09 09:26:00',NULL,'WALKIN',NULL,NULL,'completed','pending',16),(46,'2025-07-09 09:45:25',NULL,'CUSTOMER','671262483',NULL,'completed','pending',16),(47,'2025-07-09 10:41:08',NULL,'CUSTOMER','671262483',NULL,'completed','pending',16),(48,'2025-07-09 13:49:00',NULL,'CUSTOMER','671262483',NULL,'completed','pending',16),(49,'2025-07-09 18:36:43',NULL,'WALKIN',NULL,NULL,'created','pending',16);
/*!40000 ALTER TABLE `qr_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refresh_tokens`
--

DROP TABLE IF EXISTS `refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refresh_tokens` (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `refresh_token` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `device_ip` varchar(50) DEFAULT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `device_location` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `expiry` datetime DEFAULT NULL,
  `device_id` int NOT NULL AUTO_INCREMENT,
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`device_id`,`username`,`refresh_token`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `refresh_tokens_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES ('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE2LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlNrYWxlIFJlc3RhdXJhbnQiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIwNDUwNzMsImV4cCI6MTc1NDYzNzA3MywiaXNzIjoiLnVpcm9vbS5wcm8ifQ.6yXKWYC9A7-L5nWAGuoh5lHaxba2C0HPy80BWdDTTB8','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-09 07:11:13','2025-08-08 07:11:13',30,16),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE2LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlNrYWxlIFJlc3RhdXJhbnQiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIwNDY3MDQsImV4cCI6MTc1NDYzODcwNCwiaXNzIjoiLnVpcm9vbS5wcm8ifQ.oyTgZPp3hWswIngO-AYZ7nJAKa61lVoomQvUyk541YU','::1','Android\nBrowser: Chrome','','2025-07-09 07:38:24','2025-08-08 07:38:24',31,16),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE2LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlNrYWxlIFJlc3RhdXJhbnQiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIwODIyMTksImV4cCI6MTc1NDY3NDIxOSwiaXNzIjoiLnVpcm9vbS5wcm8ifQ.kkULCkTbVZQXwTPo-2O1VYPdDdHtC_-uzM_YZL6xkS0','::1','Android\nBrowser: Chrome','','2025-07-09 17:30:19','2025-08-08 17:30:20',32,16),('kenfackjoelkevin@yahoo.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtlbmZhY2tqb2Vsa2V2aW5AeWFob28uY29tIiwibmFtZSI6IktldmluIEtlbmZhY2siLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTc1MjEwOTQ5NiwiZXhwIjoxNzU0NzAxNDk2LCJpc3MiOiIudWlyb29tLnBybyJ9.v4r9Pzb1spP8V9nkMDu-gOEF_vFvtdGEYJspDHuEvBg','::1','Microsoft Windows\nBrowser: Chrome',NULL,'2025-07-10 01:04:56','2025-08-09 01:04:56',33,NULL);
/*!40000 ALTER TABLE `refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(20) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `table_id` int DEFAULT NULL,
  `status` varchar(100) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `people_count` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `unique_code` varchar(20) DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_index` (`unique_code`) USING BTREE,
  KEY `INDEX` (`date`) USING BTREE,
  KEY `INDEX_CUSTOMER_SEARCH` (`customer_id`) USING BTREE,
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_password_tokens`
--

DROP TABLE IF EXISTS `reset_password_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reset_password_tokens` (
  `username` varchar(255) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_password_tokens`
--

LOCK TABLES `reset_password_tokens` WRITE;
/*!40000 ALTER TABLE `reset_password_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `reset_password_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_details`
--

DROP TABLE IF EXISTS `store_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `store_name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `store_image` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  `is_qr_menu_enabled` tinyint(1) DEFAULT '0',
  `unique_qr_code` varchar(255) DEFAULT NULL,
  `is_qr_order_enabled` tinyint(1) DEFAULT NULL,
  `is_feedback_enabled` tinyint(1) DEFAULT '0',
  `unique_id` varchar(255) DEFAULT NULL,
  `service_charge` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tenant_id_pk` (`tenant_id`) USING BTREE,
  CONSTRAINT `store_details_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_details`
--

LOCK TABLES `store_details` WRITE;
/*!40000 ALTER TABLE `store_details` DISABLE KEYS */;
INSERT INTO `store_details` VALUES (1,'Skale Restaurant',' Cuisine camerounaise raffinée et moderne dans une ambiance chaleureuse au cœur de Douala.','671262483','hello@skale.com','XOF','/public/16/EqiPUCUlnluJ63VG52Cso',16,1,'pPdaickCo-GyiAzEFwyww',1,1,'EqiPUCUlnluJ63VG52Cso',NULL);
/*!40000 ALTER TABLE `store_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_tables`
--

DROP TABLE IF EXISTS `store_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_tables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_title` varchar(100) DEFAULT NULL,
  `floor` varchar(50) DEFAULT NULL,
  `seating_capacity` smallint DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `store_tables_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_tables`
--

LOCK TABLES `store_tables` WRITE;
/*!40000 ALTER TABLE `store_tables` DISABLE KEYS */;
/*!40000 ALTER TABLE `store_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscription_history`
--

DROP TABLE IF EXISTS `subscription_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscription_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tenant_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `starts_on` datetime DEFAULT NULL,
  `expires_on` datetime DEFAULT NULL,
  `status` enum('updated','created','cancelled') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `subscription_history_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscription_history`
--

LOCK TABLES `subscription_history` WRITE;
/*!40000 ALTER TABLE `subscription_history` DISABLE KEYS */;
INSERT INTO `subscription_history` VALUES (3,16,'2025-07-09 07:11:07','2025-07-09 00:00:00','2025-08-09 00:00:00','created'),(4,16,'2025-07-09 07:11:09','2025-07-09 00:00:00','2025-08-09 00:00:00','updated');
/*!40000 ALTER TABLE `subscription_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `superadmins`
--

DROP TABLE IF EXISTS `superadmins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `superadmins` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `superadmins`
--

LOCK TABLES `superadmins` WRITE;
/*!40000 ALTER TABLE `superadmins` DISABLE KEYS */;
INSERT INTO `superadmins` VALUES ('kenfackjoelkevin@yahoo.com','$2a$10$cBDqMRXoLb8AKeycJIIuJ.57HrIW7QXuBiaE3KyC1aLBRKOxgwI4y','Kevin Kenfack');
/*!40000 ALTER TABLE `superadmins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taxes`
--

DROP TABLE IF EXISTS `taxes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taxes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `rate` double DEFAULT NULL,
  `type` enum('inclusive','exclusive','other') DEFAULT 'other',
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `taxes_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxes`
--

LOCK TABLES `taxes` WRITE;
/*!40000 ALTER TABLE `taxes` DISABLE KEYS */;
/*!40000 ALTER TABLE `taxes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tenants`
--

DROP TABLE IF EXISTS `tenants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tenants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(95) DEFAULT NULL,
  `is_active` tinyint DEFAULT NULL,
  `subscription_id` varchar(255) DEFAULT NULL,
  `payment_customer_id` varchar(255) DEFAULT NULL,
  `subscription_start` datetime DEFAULT NULL,
  `subscription_end` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tenants`
--

LOCK TABLES `tenants` WRITE;
/*!40000 ALTER TABLE `tenants` DISABLE KEYS */;
INSERT INTO `tenants` VALUES (16,'Skale Restaurant',1,'sub_1Ris9jE3xIGiJ7c74VBXREjv','cus_SeAUpXZT4aad6x','2025-07-09 00:00:00','2025-08-09 00:00:00','2025-07-09 07:10:30');
/*!40000 ALTER TABLE `tenants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_sequences`
--

DROP TABLE IF EXISTS `token_sequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_sequences` (
  `tenant_id` int NOT NULL,
  `sequence_no` int DEFAULT NULL,
  `last_updated` date DEFAULT NULL,
  PRIMARY KEY (`tenant_id`),
  CONSTRAINT `token_sequences_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_sequences`
--

LOCK TABLES `token_sequences` WRITE;
/*!40000 ALTER TABLE `token_sequences` DISABLE KEYS */;
INSERT INTO `token_sequences` VALUES (16,10,'2025-07-09');
/*!40000 ALTER TABLE `token_sequences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(95) DEFAULT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `photo` varchar(2000) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `scope` varchar(2000) DEFAULT NULL,
  `tenant_id` int DEFAULT NULL,
  PRIMARY KEY (`username`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('kevinkenfackjoel@gmail.com','$2b$10$4vs4OD3OpNE84GLwHJj79eYj7VU0SpzL.lpxXOvkT9S1tjqY6frTm','Skale Restaurant','admin',NULL,NULL,NULL,NULL,NULL,16);
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

-- Dump completed on 2025-07-10  2:19:17
