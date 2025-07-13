-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: restropro_saas
-- ------------------------------------------------------
-- Server version	8.0.42

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (7,'Fruits',17,1),(9,'Jus',17,1),(10,'Legumes',17,1),(11,'Desserts',17,1),(12,'Diner',17,1),(13,'Entrées',17,1),(14,'Plats Traditionnels',17,1),(15,'Grillades',17,1),(16,'Fruits de Mer',17,1),(17,'Spécialité locale',17,1),(18,'Déjeuner',17,1);
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
INSERT INTO `customers` VALUES ('671262483','Nanfah Romel','analyticsrank1@gmail.com','2025-07-20','male',0,'2025-07-04 08:35:10','2025-07-04 08:35:10',17),('673234329','Kevin Kenfack','kevinkenfackjoel@gmail.com','2025-07-11','male',0,'2025-07-11 19:42:23','2025-07-11 19:42:23',17);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
INSERT INTO `feedbacks` VALUES (9,1,'671262483','2025-07-04 08:35:10',NULL,5.00,5.00,5.00,5.00,5.00,5.00,'Saisissez vos coordonnées pour enregistrer votre réponse !',17),(10,3,'671262483','2025-07-04 12:45:17',NULL,5.00,5.00,5.00,5.00,5.00,5.00,'The scene is well-lit, with a professional, tech-savvy, and creator-style look. 9:16 aspect ratio, realistic style.\nNo change in face full image',17),(11,7,'671262483','2025-07-07 15:47:41',NULL,3.40,4.00,5.00,3.00,2.00,3.00,'Si oui, change immédiatement ton mot de passe, active la double authentification et contacte l’assistance Google. Plus tu réagis vite, plus tu as de chances de garder le contrôle.',17),(12,8,'671262483','2025-07-11 15:24:09',NULL,4.00,2.00,5.00,3.00,5.00,5.00,'GET /api/v1/orders?lang=fr 200 1656 - 4.944 ms\nPOST /api/v1/orders/get-invoice-id?lang=fr 200 43 - 2.871 ms\nPOST /api/v1/orders/get-invoice-id?lang=fr 200 43 - 1.983 ms\nPOST /api/v1/orders/complete-order-payment-summary?lang=fr 200 2159 - 3.511 ms\nPOST /api/v1/orders/complete-and-pay-order?lang=fr 200 136 - 117.976 ms',17);
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
INSERT INTO `invoice_sequences` VALUES (17,31);
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
INSERT INTO `invoices` VALUES (1,'2025-07-04 08:33:46',2200.00,0.00,2200.00,17,11,0.00),(2,'2025-07-04 11:01:49',200.00,0.00,200.00,17,11,0.00),(3,'2025-07-04 12:41:25',8200.00,0.00,8200.00,17,11,0.00),(4,'2025-07-04 14:58:00',200.00,0.00,200.00,17,11,0.00),(5,'2025-07-04 15:16:32',8800.00,0.00,8800.00,17,11,0.00),(6,'2025-07-04 15:16:39',1600.00,0.00,1600.00,17,11,0.00),(7,'2025-07-07 15:43:34',8900.00,0.00,8900.00,17,11,0.00),(8,'2025-07-11 15:23:08',10700.00,0.00,10700.00,17,11,0.00),(9,'2025-07-11 15:26:56',28200.00,0.00,28200.00,17,11,0.00),(10,'2025-07-11 18:11:43',1000.00,0.00,1000.00,17,13,0.00),(11,'2025-07-11 18:24:48',12700.00,0.00,12700.00,17,13,0.00),(12,'2025-07-11 18:25:38',8200.00,0.00,8200.00,17,12,0.00),(13,'2025-07-11 18:30:26',6500.00,0.00,6500.00,17,12,0.00),(14,'2025-07-11 18:36:15',5200.00,0.00,5200.00,17,11,0.00),(15,'2025-07-11 18:54:30',10700.00,0.00,10700.00,17,12,0.00),(16,'2025-07-11 19:04:54',10700.00,0.00,10700.00,17,12,0.00),(17,'2025-07-11 19:13:46',2000.00,0.00,2000.00,17,12,0.00),(18,'2025-07-11 19:43:13',5200.00,0.00,5200.00,17,13,0.00),(19,'2025-07-11 19:46:11',5000.00,0.00,5000.00,17,12,0.00),(20,'2025-07-11 19:46:58',6000.00,0.00,6000.00,17,13,0.00),(21,'2025-07-11 19:47:19',6000.00,0.00,6000.00,17,11,0.00),(22,'2025-07-11 19:49:41',5000.00,0.00,5000.00,17,12,0.00),(23,'2025-07-11 19:52:52',5000.00,0.00,5000.00,17,12,0.00),(24,'2025-07-11 19:55:35',400.00,0.00,400.00,17,11,0.00),(25,'2025-07-11 20:00:01',5200.00,0.00,5200.00,17,13,0.00),(26,'2025-07-11 20:29:32',200.00,0.00,200.00,17,12,0.00),(27,'2025-07-11 20:34:45',5000.00,0.00,5000.00,17,12,0.00),(28,'2025-07-11 20:34:52',5000.00,0.00,5000.00,17,11,0.00),(29,'2025-07-11 20:57:47',8200.00,0.00,8200.00,17,13,0.00),(30,'2025-07-11 20:58:55',1000.00,0.00,1000.00,17,12,0.00),(31,'2025-07-12 16:46:43',4500.00,77.00,4577.00,17,13,0.00);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_item_addons`
--

LOCK TABLES `menu_item_addons` WRITE;
/*!40000 ALTER TABLE `menu_item_addons` DISABLE KEYS */;
INSERT INTO `menu_item_addons` VALUES (9,19,'Champignons frais ou séchés',0.00,17),(10,19,'Courgettes coupées en rondelles',0.00,17),(11,19,'Aubergines en cubes',0.00,17),(12,19,'Choux coupés en lanières',0.00,17),(13,20,'Plantain Murs',0.00,17),(14,20,'Fritte de pommes',0.00,17),(15,24,'Crevettes séchées',0.00,17),(16,24,'Viande de bœuf',0.00,17),(17,24,'Poisson fumé',0.00,17),(18,23,'Boullie',0.00,17),(19,23,'Pate de Piment rouge',0.00,17),(20,23,'Sachet de lait',0.00,17);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_item_variants`
--

LOCK TABLES `menu_item_variants` WRITE;
/*!40000 ALTER TABLE `menu_item_variants` DISABLE KEYS */;
INSERT INTO `menu_item_variants` VALUES (13,19,'Poulet DG classique',2500.00,17),(14,19,'Poulet DG aux légumes variés',2500.00,17),(15,19,'Poulet DG aux pommes de terre',3000.00,17),(16,19,'Poulet DG mixte',3500.00,17);
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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (19,'beigtnet haricot','Morceaux de poulet sautés avec plantains dorés, carottes, haricots verts et poivrons dans l\'huile de palme et épices locales. \n\nPlat copieux aux saveurs authentiques, parfait pour les fêtes. Se déguste avec du riz blanc.',200.00,300.00,3,'/public/17/19',17,17,1),(20,'Bœuf grillé ','Morceaux de bœuf marinés aux épices locales et grillés sur feu de bois. Viande tendre et savoureuse aux arômes fumés authentiques.\n\n Plat simple mais délicieux, parfait avec du riz, plantains ou pain. Une spécialité populaire des maquis camerounais.',5000.00,5000.00,3,'/public/17/20',15,17,1),(21,'Mousse chocolat','Dessert léger et aérien à base de chocolat fondu, œufs et crème. Texture onctueuse et fondante, saveur chocolatée intense. Parfait pour terminer un repas sur une note sucrée et gourmande. \n\nUn classique intemporel apprécié de tous.',2000.00,2000.00,NULL,'/public/17/21',11,17,1),(22,'Crevettes sautées à l’ail','Crevettes fraîches sautées avec de l\'ail doré, persil et épices. Cuisson rapide qui préserve la tendreté et le goût iodé des crevettes.\n\n Plat savoureux aux arômes méditerranéens, parfait en entrée ou plat léger. Se déguste avec du riz ou du pain.',1000.00,1000.00,NULL,'/public/17/22',13,17,1),(23,'Beignets Haricots (Akaras)','Beignets croustillants à base de haricots blancs écrasés, oignons et épices locales. Frits jusqu\'à obtenir une texture dorée et croquante à l\'extérieur, moelleuse à l\'intérieur. \n\nSpécialité camerounaise savoureuse, parfaite pour le petit-déjeuner ou en-cas.',500.00,500.00,NULL,'/public/17/23',18,17,1),(24,'Taro à la sauce jaune','Morceaux de taro (macabo) cuits dans une sauce jaune onctueuse à base d\'huile de palme, épices et aromates. Plat traditionnel camerounais aux saveurs authentiques et couleur dorée caractéristique. \n\nConsistant et nourrissant, parfait avec du poisson ou de la viande.',5000.00,5000.00,3,'/public/17/24',14,17,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=231 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (151,109,19,NULL,200.00,11,'completed','2025-07-04 08:30:44','gghhhhh',NULL,17),(152,110,19,NULL,200.00,1,'completed','2025-07-04 11:01:49',NULL,NULL,17),(153,111,19,NULL,200.00,41,'delivered','2025-07-04 12:41:25','The scene is well-lit, with a professional, tech-savvy, and creator-style look. 9:16 aspect ratio, realistic style. No change in face full image',NULL,17),(154,112,19,NULL,200.00,1,'completed','2025-07-04 14:58:00',NULL,NULL,17),(155,113,19,NULL,200.00,44,'completed','2025-07-04 15:10:25','and creator-style look. 9:16 aspect ratio, realistic style. No change in face full image',NULL,17),(156,114,19,NULL,200.00,1,'completed','2025-07-04 15:12:38',NULL,NULL,17),(157,114,19,NULL,200.00,1,'completed','2025-07-04 15:12:38',NULL,NULL,17),(158,114,19,NULL,200.00,1,'completed','2025-07-04 15:12:38',NULL,NULL,17),(159,114,19,NULL,200.00,1,'completed','2025-07-04 15:12:38',NULL,NULL,17),(160,114,19,NULL,200.00,1,'completed','2025-07-04 15:12:38',NULL,NULL,17),(161,114,19,NULL,200.00,1,'completed','2025-07-04 15:12:38',NULL,NULL,17),(162,114,19,NULL,200.00,1,'completed','2025-07-04 15:12:38',NULL,NULL,17),(163,114,19,NULL,200.00,1,'completed','2025-07-04 15:12:38',NULL,NULL,17),(164,115,19,NULL,200.00,1,'delivered','2025-07-07 15:43:35',NULL,NULL,17),(165,115,24,NULL,2000.00,1,'delivered','2025-07-07 15:43:35',NULL,NULL,17),(166,115,22,NULL,1000.00,1,'delivered','2025-07-07 15:43:35',NULL,NULL,17),(167,115,23,NULL,500.00,1,'delivered','2025-07-07 15:43:35',NULL,NULL,17),(168,115,20,NULL,5000.00,1,'delivered','2025-07-07 15:43:35',NULL,NULL,17),(169,115,19,NULL,200.00,1,'delivered','2025-07-07 15:43:35',NULL,NULL,17),(170,116,23,NULL,500.00,1,'delivered','2025-07-11 15:20:51',NULL,NULL,17),(171,116,24,NULL,2000.00,1,'delivered','2025-07-11 15:20:51',NULL,NULL,17),(172,116,22,NULL,1000.00,1,'delivered','2025-07-11 15:20:51',NULL,NULL,17),(173,116,21,NULL,2000.00,1,'delivered','2025-07-11 15:20:51',NULL,NULL,17),(174,116,20,NULL,5000.00,1,'delivered','2025-07-11 15:20:51',NULL,NULL,17),(175,116,19,NULL,200.00,1,'delivered','2025-07-11 15:20:51',NULL,NULL,17),(176,117,19,NULL,200.00,141,'created','2025-07-11 15:26:56',' Cuisine camerounaise raffinée et moderne dans une ambiance chaleureuse au cœur de Douala.',NULL,17),(177,118,19,NULL,200.00,1,'completed','2025-07-11 17:53:50',NULL,NULL,17),(178,119,22,NULL,1000.00,1,'completed','2025-07-11 17:55:41',NULL,NULL,17),(179,120,22,NULL,1000.00,1,'created','2025-07-11 18:00:27',NULL,NULL,17),(180,121,22,NULL,1000.00,1,'created','2025-07-11 18:11:43',NULL,NULL,17),(181,122,19,NULL,200.00,1,'created','2025-07-11 18:19:43',NULL,NULL,17),(182,122,20,NULL,5000.00,1,'created','2025-07-11 18:19:43',NULL,NULL,17),(183,122,21,NULL,2000.00,1,'created','2025-07-11 18:19:43',NULL,NULL,17),(184,122,22,NULL,1000.00,1,'created','2025-07-11 18:19:43',NULL,NULL,17),(185,122,23,NULL,500.00,1,'created','2025-07-11 18:19:43',NULL,NULL,17),(186,122,24,NULL,2000.00,1,'created','2025-07-11 18:19:43',NULL,NULL,17),(187,123,19,NULL,200.00,1,'created','2025-07-11 18:25:38',NULL,NULL,17),(188,123,20,NULL,5000.00,1,'created','2025-07-11 18:25:38',NULL,NULL,17),(189,123,21,NULL,2000.00,1,'created','2025-07-11 18:25:38',NULL,NULL,17),(190,123,22,NULL,1000.00,1,'created','2025-07-11 18:25:38',NULL,NULL,17),(191,124,23,NULL,500.00,1,'completed','2025-07-11 18:27:57',NULL,NULL,17),(192,124,24,NULL,2000.00,3,'completed','2025-07-11 18:27:57',NULL,NULL,17),(193,125,19,NULL,200.00,1,'completed','2025-07-11 18:34:18',NULL,NULL,17),(194,125,20,NULL,5000.00,1,'completed','2025-07-11 18:34:18',NULL,NULL,17),(195,126,19,NULL,200.00,1,'completed','2025-07-11 18:43:55',NULL,NULL,17),(196,126,20,NULL,5000.00,1,'completed','2025-07-11 18:43:55',NULL,NULL,17),(197,126,21,NULL,2000.00,1,'completed','2025-07-11 18:43:55',NULL,NULL,17),(198,126,22,NULL,1000.00,1,'completed','2025-07-11 18:43:55',NULL,NULL,17),(199,126,23,NULL,500.00,1,'completed','2025-07-11 18:43:55',NULL,NULL,17),(200,126,24,NULL,2000.00,1,'completed','2025-07-11 18:43:55',NULL,NULL,17),(201,127,21,NULL,2000.00,1,'created','2025-07-11 18:59:54',NULL,NULL,17),(202,128,19,NULL,200.00,1,'completed','2025-07-11 19:04:54',NULL,NULL,17),(203,128,20,NULL,5000.00,1,'completed','2025-07-11 19:04:54',NULL,NULL,17),(204,128,21,NULL,2000.00,1,'completed','2025-07-11 19:04:54',NULL,NULL,17),(205,128,22,NULL,1000.00,1,'completed','2025-07-11 19:04:54',NULL,NULL,17),(206,128,23,NULL,500.00,1,'completed','2025-07-11 19:04:54',NULL,NULL,17),(207,128,24,NULL,2000.00,1,'completed','2025-07-11 19:04:54',NULL,NULL,17),(208,129,20,NULL,5000.00,1,'completed','2025-07-11 19:32:04',NULL,NULL,17),(209,129,22,NULL,1000.00,1,'completed','2025-07-11 19:32:04',NULL,NULL,17),(210,130,20,NULL,5000.00,1,'completed','2025-07-11 19:32:15',NULL,NULL,17),(211,130,22,NULL,1000.00,1,'completed','2025-07-11 19:32:15',NULL,NULL,17),(212,131,19,NULL,200.00,1,'created','2025-07-11 19:43:13',NULL,NULL,17),(213,131,20,NULL,5000.00,1,'created','2025-07-11 19:43:13',NULL,NULL,17),(214,132,20,NULL,5000.00,1,'created','2025-07-11 19:46:11',NULL,NULL,17),(215,133,20,NULL,5000.00,1,'completed','2025-07-11 19:48:24',NULL,NULL,17),(216,134,20,NULL,5000.00,1,'completed','2025-07-11 19:49:41',NULL,NULL,17),(217,135,19,NULL,200.00,1,'created','2025-07-11 19:55:35',NULL,NULL,17),(218,135,19,NULL,200.00,1,'created','2025-07-11 19:55:35',NULL,NULL,17),(219,136,19,NULL,200.00,1,'delivered','2025-07-11 20:00:01',NULL,NULL,17),(220,136,20,NULL,5000.00,1,'delivered','2025-07-11 20:00:01',NULL,NULL,17),(221,137,19,NULL,200.00,1,'completed','2025-07-11 20:28:00',NULL,NULL,17),(222,138,20,NULL,5000.00,1,'completed','2025-07-11 20:32:28',NULL,NULL,17),(223,139,20,NULL,5000.00,1,'created','2025-07-11 20:34:17','Remarques (100 caractères max.)',NULL,17),(224,140,19,NULL,200.00,1,'completed','2025-07-11 20:45:50',NULL,NULL,17),(225,140,20,NULL,5000.00,1,'completed','2025-07-11 20:45:50',NULL,NULL,17),(226,140,22,NULL,1000.00,1,'completed','2025-07-11 20:45:50',NULL,NULL,17),(227,140,21,NULL,2000.00,1,'completed','2025-07-11 20:45:50',NULL,NULL,17),(228,141,22,NULL,1000.00,1,'completed','2025-07-11 20:58:55',NULL,NULL,17),(229,142,22,NULL,1000.00,1,'completed','2025-07-12 16:44:49',NULL,NULL,17),(230,142,19,16,3500.00,1,'completed','2025-07-12 16:44:49',NULL,'[9,10,11,12]',17);
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
) ENGINE=InnoDB AUTO_INCREMENT=143 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (109,'2025-07-04 08:30:44','delivery','WALKIN',NULL,NULL,'completed',1,'paid',1,17),(110,'2025-07-04 11:01:49','','WALKIN',NULL,NULL,'completed',2,'paid',2,17),(111,'2025-07-04 12:41:25','','WALKIN',NULL,NULL,'completed',3,'paid',3,17),(112,'2025-07-04 14:58:00','','WALKIN',NULL,NULL,'completed',4,'paid',4,17),(113,'2025-07-04 15:10:25','','WALKIN',NULL,NULL,'completed',5,'paid',5,17),(114,'2025-07-04 15:12:38','','WALKIN',NULL,NULL,'completed',6,'paid',6,17),(115,'2025-07-07 15:43:35','','WALKIN',NULL,NULL,'completed',1,'paid',7,17),(116,'2025-07-11 15:20:51','dinein','CUSTOMER','671262483',NULL,'completed',1,'paid',8,17),(117,'2025-07-11 15:26:56','','WALKIN',NULL,NULL,'completed',2,'paid',9,17),(118,'2025-07-11 17:53:50','','CUSTOMER','671262483',NULL,'cancelled',3,'pending',NULL,17),(119,'2025-07-11 17:55:41','dinein','CUSTOMER','671262483',10,'cancelled',4,'pending',NULL,17),(120,'2025-07-11 18:00:27','takeaway','CUSTOMER','671262483',10,'completed',5,'paid',11,17),(121,'2025-07-11 18:11:43','delivery','CUSTOMER','671262483',10,'completed',6,'paid',11,17),(122,'2025-07-11 18:19:43','dinein','CUSTOMER','671262483',10,'completed',7,'paid',11,17),(123,'2025-07-11 18:25:38','','CUSTOMER','671262483',NULL,'completed',8,'paid',12,17),(124,'2025-07-11 18:27:57','delivery','CUSTOMER','671262483',NULL,'completed',9,'paid',13,17),(125,'2025-07-11 18:34:18','dinein','WALKIN',NULL,11,'completed',10,'paid',14,17),(126,'2025-07-11 18:43:55','dinein','WALKIN',NULL,12,'completed',11,'paid',15,17),(127,'2025-07-11 18:59:54','dinein','WALKIN',NULL,11,'completed',12,'paid',17,17),(128,'2025-07-11 19:04:54','dinein','WALKIN',NULL,12,'completed',13,'paid',16,17),(129,'2025-07-11 19:32:04','','CUSTOMER','671262483',NULL,'completed',14,'paid',20,17),(130,'2025-07-11 19:32:15','','CUSTOMER','671262483',NULL,'completed',15,'paid',21,17),(131,'2025-07-11 19:43:13','dinein','CUSTOMER','673234329',10,'completed',16,'paid',18,17),(132,'2025-07-11 19:46:11','dinein','WALKIN',NULL,10,'completed',17,'paid',19,17),(133,'2025-07-11 19:48:24','','WALKIN',NULL,NULL,'completed',18,'paid',23,17),(134,'2025-07-11 19:49:41','dinein','WALKIN',NULL,11,'completed',19,'paid',22,17),(135,'2025-07-11 19:55:35','','WALKIN',NULL,NULL,'cancelled',20,'paid',24,17),(136,'2025-07-11 20:00:01','delivery','CUSTOMER','673234329',12,'completed',21,'paid',25,17),(137,'2025-07-11 20:28:00','dinein','WALKIN',NULL,11,'completed',22,'paid',26,17),(138,'2025-07-11 20:32:28','','WALKIN',NULL,NULL,'completed',23,'paid',27,17),(139,'2025-07-11 20:34:17','dinein','WALKIN',NULL,11,'completed',24,'paid',28,17),(140,'2025-07-11 20:45:50','','WALKIN',NULL,NULL,'completed',25,'paid',29,17),(141,'2025-07-11 20:58:55','','WALKIN',NULL,NULL,'completed',26,'paid',30,17),(142,'2025-07-12 16:44:49','','WALKIN',NULL,NULL,'completed',1,'paid',31,17);
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_types`
--

LOCK TABLES `payment_types` WRITE;
/*!40000 ALTER TABLE `payment_types` DISABLE KEYS */;
INSERT INTO `payment_types` VALUES (11,'MOMO',1,17,'Mobile Money'),(12,'CASH',1,17,'cash'),(13,'ORANGE MONEY',1,17,'Orange Money');
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
INSERT INTO `print_settings` VALUES (17,'57','Cuisine camerounaise raffinée et moderne dans une ambiance chaleureuse.','Merci d\'avoir pris un repas chez nous !',1,1,1,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_order_items`
--

LOCK TABLES `qr_order_items` WRITE;
/*!40000 ALTER TABLE `qr_order_items` DISABLE KEYS */;
INSERT INTO `qr_order_items` VALUES (48,34,19,NULL,200.00,1,'created','2025-07-04 08:27:27',NULL,NULL,17),(49,35,19,NULL,200.00,1,'created','2025-07-04 11:00:18',NULL,NULL,17),(50,35,19,NULL,200.00,1,'created','2025-07-04 11:00:18',NULL,NULL,17),(51,35,19,NULL,200.00,1,'created','2025-07-04 11:00:18',NULL,NULL,17),(52,36,19,NULL,200.00,1,'created','2025-07-04 11:10:37',NULL,NULL,17),(53,37,19,NULL,200.00,41,'created','2025-07-04 12:40:20','The scene is well-lit, with a professional, tech-savvy, and creator-style look. 9:16 aspect ratio, realistic style. No change in face full image',NULL,17),(54,38,19,NULL,200.00,1,'created','2025-07-04 15:01:48','and creator-style look. 9:16 aspect ratio, realistic style. No change in face full image',NULL,17),(55,39,19,NULL,200.00,4,'created','2025-07-04 15:03:21',NULL,NULL,17),(56,40,19,NULL,200.00,14,'created','2025-07-04 15:04:12',NULL,NULL,17),(57,41,19,NULL,200.00,1,'created','2025-07-04 15:09:28',NULL,NULL,17),(58,42,19,NULL,200.00,1,'created','2025-07-07 15:42:48',NULL,NULL,17),(59,42,24,NULL,2000.00,1,'created','2025-07-07 15:42:48',NULL,NULL,17),(60,42,22,NULL,1000.00,1,'created','2025-07-07 15:42:48',NULL,NULL,17),(61,42,23,NULL,500.00,1,'created','2025-07-07 15:42:48',NULL,NULL,17),(62,42,20,NULL,5000.00,1,'created','2025-07-07 15:42:48',NULL,NULL,17),(63,42,19,NULL,200.00,1,'created','2025-07-07 15:42:48',NULL,NULL,17),(64,43,19,NULL,200.00,141,'created','2025-07-09 08:52:14',' Cuisine camerounaise raffinée et moderne dans une ambiance chaleureuse au cœur de Douala.',NULL,17),(65,44,23,NULL,500.00,1,'created','2025-07-11 15:18:31',NULL,NULL,17),(66,44,24,NULL,2000.00,1,'created','2025-07-11 15:18:31',NULL,NULL,17),(67,44,22,NULL,1000.00,1,'created','2025-07-11 15:18:31',NULL,NULL,17),(68,44,21,NULL,2000.00,1,'created','2025-07-11 15:18:31',NULL,NULL,17),(69,44,20,NULL,5000.00,1,'created','2025-07-11 15:18:31',NULL,NULL,17),(70,44,19,NULL,200.00,1,'created','2025-07-11 15:18:31',NULL,NULL,17),(71,45,19,NULL,200.00,1,'created','2025-07-11 17:53:18',NULL,NULL,17),(72,46,22,NULL,1000.00,1,'created','2025-07-11 17:55:05',NULL,NULL,17),(73,47,19,NULL,200.00,1,'created','2025-07-11 18:18:07',NULL,NULL,17),(74,47,20,NULL,5000.00,1,'created','2025-07-11 18:18:07',NULL,NULL,17),(75,47,21,NULL,2000.00,1,'created','2025-07-11 18:18:07',NULL,NULL,17),(76,47,22,NULL,1000.00,1,'created','2025-07-11 18:18:07',NULL,NULL,17),(77,47,23,NULL,500.00,1,'created','2025-07-11 18:18:07',NULL,NULL,17),(78,47,24,NULL,2000.00,1,'created','2025-07-11 18:18:07',NULL,NULL,17),(79,48,19,NULL,200.00,1,'created','2025-07-11 18:25:21',NULL,NULL,17),(80,48,20,NULL,5000.00,1,'created','2025-07-11 18:25:21',NULL,NULL,17),(81,48,21,NULL,2000.00,1,'created','2025-07-11 18:25:21',NULL,NULL,17),(82,48,22,NULL,1000.00,1,'created','2025-07-11 18:25:21',NULL,NULL,17),(83,49,23,NULL,500.00,1,'created','2025-07-11 18:27:30',NULL,NULL,17),(84,49,24,NULL,2000.00,3,'created','2025-07-11 18:27:30',NULL,NULL,17),(85,50,19,NULL,200.00,1,'created','2025-07-11 18:42:35',NULL,NULL,17),(86,50,20,NULL,5000.00,1,'created','2025-07-11 18:42:35',NULL,NULL,17),(87,50,21,NULL,2000.00,1,'created','2025-07-11 18:42:35',NULL,NULL,17),(88,50,22,NULL,1000.00,1,'created','2025-07-11 18:42:35',NULL,NULL,17),(89,50,23,NULL,500.00,1,'created','2025-07-11 18:42:35',NULL,NULL,17),(90,50,24,NULL,2000.00,1,'created','2025-07-11 18:42:35',NULL,NULL,17),(91,51,19,NULL,200.00,1,'created','2025-07-11 19:37:31',NULL,NULL,17),(92,51,20,NULL,5000.00,1,'created','2025-07-11 19:37:31',NULL,NULL,17),(93,51,21,NULL,2000.00,1,'created','2025-07-11 19:37:31',NULL,NULL,17),(94,51,22,NULL,1000.00,1,'created','2025-07-11 19:37:31',NULL,NULL,17),(95,52,19,NULL,200.00,1,'created','2025-07-11 19:42:23',NULL,NULL,17),(96,52,20,NULL,5000.00,1,'created','2025-07-11 19:42:23',NULL,NULL,17),(97,53,19,NULL,200.00,1,'created','2025-07-11 19:59:14',NULL,NULL,17),(98,53,20,NULL,5000.00,1,'created','2025-07-11 19:59:14',NULL,NULL,17),(99,54,19,NULL,200.00,1,'created','2025-07-11 20:27:01',NULL,NULL,17),(100,55,19,NULL,200.00,1,'created','2025-07-11 20:44:42',NULL,NULL,17),(101,55,20,NULL,5000.00,1,'created','2025-07-11 20:44:42',NULL,NULL,17),(102,55,22,NULL,1000.00,1,'created','2025-07-11 20:44:42',NULL,NULL,17),(103,55,21,NULL,2000.00,1,'created','2025-07-11 20:44:42',NULL,NULL,17),(104,56,22,NULL,1000.00,1,'created','2025-07-12 16:44:22',NULL,NULL,17),(105,56,19,16,3500.00,1,'created','2025-07-12 16:44:22',NULL,'[\"9\",\"10\",\"11\",\"12\"]',17),(106,57,19,15,3000.00,1,'created','2025-07-12 19:01:49',NULL,'[\"9\",\"10\",\"11\"]',17);
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qr_orders`
--

LOCK TABLES `qr_orders` WRITE;
/*!40000 ALTER TABLE `qr_orders` DISABLE KEYS */;
INSERT INTO `qr_orders` VALUES (34,'2025-07-04 08:27:27',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(35,'2025-07-04 11:00:18',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(36,'2025-07-04 11:10:37',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(37,'2025-07-04 12:40:20',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(38,'2025-07-04 15:01:48',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(39,'2025-07-04 15:03:21',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(40,'2025-07-04 15:04:12',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(41,'2025-07-04 15:09:28',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(42,'2025-07-07 15:42:48',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(43,'2025-07-09 08:52:14',NULL,'WALKIN',NULL,NULL,'cancelled','pending',17),(44,'2025-07-11 15:18:31',NULL,'CUSTOMER','671262483',NULL,'cancelled','pending',17),(45,'2025-07-11 17:53:18',NULL,'CUSTOMER','671262483',NULL,'cancelled','pending',17),(46,'2025-07-11 17:55:05',NULL,'CUSTOMER','671262483',NULL,'cancelled','pending',17),(47,'2025-07-11 18:18:07',NULL,'CUSTOMER','671262483',NULL,'cancelled','pending',17),(48,'2025-07-11 18:25:21',NULL,'CUSTOMER','671262483',NULL,'cancelled','pending',17),(49,'2025-07-11 18:27:30',NULL,'CUSTOMER','671262483',NULL,'cancelled','pending',17),(50,'2025-07-11 18:42:35',NULL,'CUSTOMER','671262483',NULL,'cancelled','pending',17),(51,'2025-07-11 19:37:31',NULL,'CUSTOMER','671262483',NULL,'cancelled','pending',17),(52,'2025-07-11 19:42:23',NULL,'CUSTOMER','673234329',NULL,'completed','pending',17),(53,'2025-07-11 19:59:14',NULL,'CUSTOMER','673234329',NULL,'completed','pending',17),(54,'2025-07-11 20:27:01',NULL,'WALKIN',NULL,NULL,'completed','pending',17),(55,'2025-07-11 20:44:42',NULL,'WALKIN',NULL,NULL,'completed','pending',17),(56,'2025-07-12 16:44:22',NULL,'WALKIN',NULL,NULL,'completed','pending',17),(57,'2025-07-12 19:01:49',NULL,'WALKIN',NULL,NULL,'created','pending',17);
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
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refresh_tokens`
--

LOCK TABLES `refresh_tokens` WRITE;
/*!40000 ALTER TABLE `refresh_tokens` DISABLE KEYS */;
INSERT INTO `refresh_tokens` VALUES ('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIyNDQwNTEsImV4cCI6MTc1NDgzNjA1MSwiaXNzIjoibG9jYWxob3N0In0.jSS6ohX4v4osf95PL4ZV7SdBYXCsjPr3IfwoR-m0e_Y','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-11 15:27:31','2025-08-10 15:27:31',59,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIyNTQ2MjUsImV4cCI6MTc1NDg0NjYyNSwiaXNzIjoibG9jYWxob3N0In0.ue8NyxCCdFWZz34hD1WsTw1pkdmyW9i6I8Yd1KS4ZQQ','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-11 18:23:45','2025-08-10 18:23:46',60,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIyNTQ5MzMsImV4cCI6MTc1NDg0NjkzMywiaXNzIjoibG9jYWxob3N0In0.FamQcK17hdnarM-uyVPbNkj-iEMtQwq_ijWvwEkTpYM','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-11 18:28:53','2025-08-10 18:28:53',61,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIyNTU3NzIsImV4cCI6MTc1NDg0Nzc3MiwiaXNzIjoibG9jYWxob3N0In0.DOyjE0Dg0N_0ODMQD6n__ty9qaskFhlMY4Po39-gP1M','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-11 18:42:52','2025-08-10 18:42:53',62,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIyNTc1OTksImV4cCI6MTc1NDg0OTU5OSwiaXNzIjoibG9jYWxob3N0In0.7Es2qvQMLknW0HyoQO4P0e3gvhblnU3APDxou1ubkrI','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-11 19:13:19','2025-08-10 19:13:19',63,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIyNTkwNTksImV4cCI6MTc1NDg1MTA1OSwiaXNzIjoibG9jYWxob3N0In0.k79IJzaqmhzAqpz0Zv0vjr7xH4DEeJ_Qf8eBmngJKEQ','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-11 19:37:39','2025-08-10 19:37:39',64,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIyNjAzNjMsImV4cCI6MTc1NDg1MjM2MywiaXNzIjoibG9jYWxob3N0In0.v0-7iMcVfZ_RPdCtQSp2ct9I7xhsKAZEO1PxEwllxVo','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-11 19:59:23','2025-08-10 19:59:23',65,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIyNjExNzMsImV4cCI6MTc1NDg1MzE3MywiaXNzIjoibG9jYWxob3N0In0.w04dE13ASPCMvgNdQdDagF-X-YMZTugTsh5rFXAGuHo','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-11 20:12:53','2025-08-10 20:12:53',66,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIyNjIzMDksImV4cCI6MTc1NDg1NDMwOSwiaXNzIjoibG9jYWxob3N0In0.eQyn8D2bYtaq-1AH1OJMfFNDVByHs4MXf8VeEwH0cak','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-11 20:31:49','2025-08-10 20:31:50',67,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIzMjU1NjYsImV4cCI6MTc1NDkxNzU2NiwiaXNzIjoibG9jYWxob3N0In0.RorGvFvNHErwTC50V_-6ve4ctHSCeM95V63JIOQJ6m8','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-12 14:06:06','2025-08-11 14:06:07',68,17),('kevinkenfackjoel@gmail.com','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjE3LCJ1c2VybmFtZSI6Imtldmlua2VuZmFja2pvZWxAZ21haWwuY29tIiwibmFtZSI6IlVpcm9vbSBMTEMiLCJyb2xlIjoiYWRtaW4iLCJzY29wZSI6bnVsbCwiaXNfYWN0aXZlIjoxLCJpYXQiOjE3NTIzMjgxODgsImV4cCI6MTc1NDkyMDE4OCwiaXNzIjoibG9jYWxob3N0In0.9nqWPDptFdewSsap2h_4dH2z6bXnES2Vj-vOnnj-Zb0','::1','Microsoft Windows\nBrowser: Chrome','','2025-07-12 14:49:48','2025-08-11 14:49:48',69,17);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservations`
--

LOCK TABLES `reservations` WRITE;
/*!40000 ALTER TABLE `reservations` DISABLE KEYS */;
INSERT INTO `reservations` VALUES (14,'673234329','2025-07-20 19:48:00',13,'booked','TESTP POUR VOIR CI TOUT FONTIONE CORRECTEMENT',15,'2025-07-11 20:48:54','2025-07-11 20:48:54','FDKBDeyplh',17),(15,'673234329','2025-07-31 19:49:00',14,'paid','JUSTE UN TEST6 DE RESERVTION',11,'2025-07-11 20:50:10','2025-07-11 20:50:10','v_01aNkVfd',17),(16,'673234329','2025-07-11 19:56:00',12,'booked','JUSTE UN TEST',24,'2025-07-11 20:56:53','2025-07-11 20:56:53','mlOHjZxhYK',17);
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
INSERT INTO `reset_password_tokens` VALUES ('kevinkenfackjoel@gmail.com','01e80ead26553745d9cc2c433b6d1773191a421b20b8cba1f239191194e80ebc','2025-07-03 03:42:58');
/*!40000 ALTER TABLE `reset_password_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_details`
--

DROP TABLE IF EXISTS `store_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_details` (
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
  UNIQUE KEY `tenant_id_pk` (`tenant_id`) USING BTREE,
  CONSTRAINT `store_details_ibfk_1` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_details`
--

LOCK TABLES `store_details` WRITE;
/*!40000 ALTER TABLE `store_details` DISABLE KEYS */;
INSERT INTO `store_details` VALUES ('Skale Restaurant','Skale Restaurant – Agence Douala\nRue des Manguiers, Bonapriso\nB.P. 2157, Douala, Cameroun','671262483','contact@skaleresto.com','XAF','/public/17/c-3gep07LIJ9V8gmlXD4l',17,1,'CS-peNRg_-8De8EaAa2Hs',1,1,'c-3gep07LIJ9V8gmlXD4l',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_tables`
--

LOCK TABLES `store_tables` WRITE;
/*!40000 ALTER TABLE `store_tables` DISABLE KEYS */;
INSERT INTO `store_tables` VALUES (10,'Table Murale','1',5,17),(11,'Table  Bristo','1',2,17),(12,'Table Haute','1',1,17),(13,'Table Banquet','2',10,17),(14,'Table Chef','2',15,17),(15,'Table de services','2',3,17),(16,'Table de petit Dejeuner','2',4,17);
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
INSERT INTO `subscription_history` VALUES (3,17,'2025-07-03 21:17:38','2025-07-03 00:00:00','2025-08-03 00:00:00','created'),(4,17,'2025-07-03 21:17:39','2025-07-03 00:00:00','2025-08-03 00:00:00','updated');
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
INSERT INTO `superadmins` VALUES ('kevinkenfackjoel@gmail.com','$2a$10$vqqdUnDH9JXnoPrt275LROiZbjXR7u7Y/oG4/VFh4H8Om65voWEhW','Kevin Kenfack');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taxes`
--

LOCK TABLES `taxes` WRITE;
/*!40000 ALTER TABLE `taxes` DISABLE KEYS */;
INSERT INTO `taxes` VALUES (3,'TAX MINFI',2.2,'exclusive',17);
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tenants`
--

LOCK TABLES `tenants` WRITE;
/*!40000 ALTER TABLE `tenants` DISABLE KEYS */;
INSERT INTO `tenants` VALUES (17,'Uiroom LLC',1,'sub_1RgtZcE3xIGiJ7c7HbtKbyje','cus_Sc7phw1nmPeIwh','2025-07-03 00:00:00','2025-08-03 00:00:00','2025-07-03 20:20:53');
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
INSERT INTO `token_sequences` VALUES (17,1,'2025-07-12');
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
INSERT INTO `users` VALUES ('kevinkenfackjoel@gmail.com','$2b$10$18XMQJNKdlRP/LZFDrYZcuPtaY8oqc/YFjfPeXCQZSUSE92Moettm','Uiroom LLC','admin',NULL,NULL,NULL,NULL,NULL,17);
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

-- Dump completed on 2025-07-13 16:00:10
