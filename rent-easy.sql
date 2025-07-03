-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 09:56 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rent-easy`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `status` enum('pending','complete','failed') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `id`, `propertyId`, `status`, `created_at`) VALUES
(724, 45, 222, 'complete', '2025-05-24 03:02:01'),
(725, 45, 221, 'pending', '2025-05-24 04:01:44'),
(726, 45, 221, 'pending', '2025-05-24 07:27:17'),
(727, 76, 221, 'complete', '2025-05-26 01:08:48'),
(728, 76, 221, 'complete', '2025-05-26 01:08:48'),
(732, 45, 220, 'pending', '2025-05-25 14:35:33'),
(733, 76, 221, 'complete', '2025-05-26 01:08:48'),
(734, 76, 221, 'complete', '2025-05-26 01:08:48'),
(735, 76, 221, 'complete', '2025-05-26 01:08:48');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categories_id` int(11) NOT NULL,
  `type` enum('House','Room','ShopHouse') NOT NULL,
  `propertyId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categories_id`, `type`, `propertyId`) VALUES
(194, 'Room', 199),
(195, 'House', 200),
(197, '', 202),
(211, 'ShopHouse', 216),
(212, '', 217),
(213, '', 218),
(214, 'ShopHouse', 219),
(215, '', 220),
(216, 'House', 221),
(217, 'ShopHouse', 222);

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `contactId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phoneNumber` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`contactId`, `name`, `phoneNumber`, `email`, `message`, `created_at`) VALUES
(1, 'varat', '12345678', 'varat.thapa21@gmail.com', 'qwertyui', '2025-02-27 11:58:40'),
(2, 'Varat thapa', '9827484131', 'varat.thapa21@gmail.com', 'hello', '2025-02-27 12:19:28'),
(3, 'asdfasd', ';j', 'kljlk', 'lk', '2025-03-23 04:48:00'),
(4, 'asdfafsd;lfj;lj', ';lj;lj;l', ';lj;lj', ';lj', '2025-03-23 04:48:30'),
(5, 'ghjk', '45651', 'xcvbn@kkk', 'bnm,', '2025-03-23 14:56:26'),
(6, '7777', '451', 'hello@gmail.com', 'zxcvbnm,', '2025-03-23 14:56:58'),
(7, 'Bob', '9827484131', 'varat.thapa21@gmail.com', 'sxm', '2025-04-18 10:14:44'),
(8, 'Varat thapa', '9827484131', 'varat.thapa21@gmail.com', 'a place to live that is only part of a larger building. Usually it is a group of rooms on one floor of a building in a city, where land is too expensive for people to have separate houses.', '2025-04-18 10:24:11');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `documentId` int(11) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `document` varchar(255) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`documentId`, `propertyId`, `document`, `uploaded_at`, `id`) VALUES
(37, 202, '680847b2ba9e3.png', '2025-04-23 01:51:46', 45),
(45, 216, '681d9abf32859.png', '2025-05-09 06:03:43', 45),
(46, 217, '681d9b99764ce.png', '2025-05-09 06:07:21', 61),
(47, 218, '681d9cab25ba4.png', '2025-05-09 06:11:55', 61),
(48, 220, '681da1a4461a0.png', '2025-05-09 06:33:08', 61),
(49, 221, '681da32ab5aba.png', '2025-05-09 06:39:38', 61),
(50, 222, '6830968398a63.png', '2025-05-23 15:38:43', 61);

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `faqs_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `category` varchar(50) DEFAULT 'general',
  `is_active` tinyint(1) DEFAULT 1,
  `sort_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`faqs_id`, `question`, `answer`, `category`, `is_active`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, 'How do I pay my rent?', 'You can pay your rent through bank transfer, credit/debit card, or via our online payment portal.', 'rent', 1, 1, '2025-04-07 00:59:05', '2025-04-07 00:59:05'),
(2, 'What is the process for terminating my lease early?', 'Lease termination policies vary. You may need to provide a notice period and pay an early termination fee. Check your lease agreement for details.', 'lease', 1, 2, '2025-04-07 00:59:05', '2025-04-07 00:59:05'),
(3, 'How is my security deposit handled?', 'Your security deposit is held until you move out. If there are no damages beyond normal wear and tear, it will be refunded.', 'deposit', 1, 3, '2025-04-07 00:59:05', '2025-04-07 00:59:05'),
(4, 'How do I submit a maintenance request?', 'You can submit maintenance requests through our tenant portal or by contacting property management directly.', 'maintenance', 1, 4, '2025-04-07 00:59:05', '2025-04-07 00:59:05'),
(5, 'Are pets allowed in the rental units?', 'Pet policies vary by property. Some allow pets with an additional deposit and monthly fee, while others have restrictions.', 'pets', 1, 5, '2025-04-07 00:59:05', '2025-04-07 00:59:05');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `imageId` int(11) NOT NULL,
  `propertyId` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `document` varchar(255) NOT NULL,
  `id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`imageId`, `propertyId`, `image`, `uploaded_at`, `document`, `id`) VALUES
(311, 199, '68025c594dde3.jpg', '2025-04-18 14:06:17', '', 45),
(312, 199, '68025c594fcb6.jpg', '2025-04-18 14:06:17', '', 45),
(313, 199, '68025c59501e4.jpeg', '2025-04-18 14:06:17', '', 45),
(314, 199, '68025c59505de.jpeg', '2025-04-18 14:06:17', '', 45),
(315, 199, '68025c59525de.jpeg', '2025-04-18 14:06:17', '', 45),
(329, 200, '200/img_bc318948bd5f5b30.jpeg', '2025-04-21 07:01:11', '', 45),
(330, 202, '680847b2b7d1a.jpg', '2025-04-23 01:51:46', '', 45),
(331, 202, '680847b2b9ba8.jpg', '2025-04-23 01:51:46', '', 45),
(332, 202, '680847b2ba2fc.jpg', '2025-04-23 01:51:46', '', 45),
(357, 217, '681d9b9972f47.jpg', '2025-05-09 06:07:21', '', 61),
(358, 218, '681d9cab1cca9.jpg', '2025-05-09 06:11:55', '', 61),
(359, 218, '681d9cab21b48.jpg', '2025-05-09 06:11:55', '', 61),
(360, 218, '681d9cab22338.jpg', '2025-05-09 06:11:55', '', 61),
(361, 219, '681d9f3b13cc8.jpg', '2025-05-09 06:22:51', '', 61),
(362, 220, '681da1a43c2e1.jpg', '2025-05-09 06:33:08', '', 61),
(363, 220, '681da1a43fd47.jpg', '2025-05-09 06:33:08', '', 61),
(364, 220, '681da1a443951.jpg', '2025-05-09 06:33:08', '', 61),
(365, 220, '681da1a4447e1.jpg', '2025-05-09 06:33:08', '', 61),
(366, 220, '681da1a445204.jpg', '2025-05-09 06:33:08', '', 61),
(367, 220, '681da1a445957.jpg', '2025-05-09 06:33:08', '', 61),
(368, 221, '681da32a9f367.jpg', '2025-05-09 06:39:38', '', 61),
(369, 221, '681da32aa1b75.jpg', '2025-05-09 06:39:38', '', 61),
(370, 221, '681da32aa278d.jpg', '2025-05-09 06:39:38', '', 61),
(371, 221, '681da32aa2fee.jpg', '2025-05-09 06:39:38', '', 61),
(372, 221, '681da32aa36c9.jpg', '2025-05-09 06:39:38', '', 61),
(373, 221, '681da32aa643a.jpg', '2025-05-09 06:39:38', '', 61),
(374, 221, '681da32ab42c5.jpg', '2025-05-09 06:39:38', '', 61),
(375, 221, '681da32ab4cc6.jpg', '2025-05-09 06:39:38', '', 61),
(376, 221, '681da32ab53c1.jpg', '2025-05-09 06:39:38', '', 61),
(377, 222, '6830968397130.jpg', '2025-05-23 15:38:43', '', 61),
(378, 222, '6830968398703.jpg', '2025-05-23 15:38:43', '', 61),
(379, 216, '216/img_4a6024325d9716f1.jpg', '2025-05-23 12:26:46', '', 45);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `country` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `municipality` varchar(100) DEFAULT NULL,
  `ward_no` int(11) DEFAULT NULL,
  `province` varchar(100) DEFAULT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `country`, `city`, `municipality`, `ward_no`, `province`, `latitude`, `longitude`) VALUES
(149, 'Nepal', 'Lalitpur', 'Lalitpur', 9, 'Kathmandu', 27.68170394, 85.31275177),
(150, 'Nepal', 'Kathmandu', 'Kathmandu', 14, 'Gandaki', 27.92064979, 85.37915032),
(151, 'Nepal', 'Dhobighat', 'dhobighat', 12, 'Lumbini', 27.74771863, 84.80786126),
(152, 'Nepal', 'Maharajgung, ', 'Kathmandu', 90, 'gandaki', 27.70842462, 85.32108593),
(153, 'Nepal', 'Lalitpur', 'Lalitpur', 15, 'gandaki', 28.02156056, 85.27148411),
(154, 'Nepal', 'Pokhara', 'Gandaki', 8, 'Gandaki', 28.26689000, 83.96851000),
(155, 'Nepal', 'Pokhara', 'Rupandehi', 16, 'Lumbini', 28.26689000, 83.96851000),
(156, 'Nepal', 'pokhara', 'Gandaki', 13, 'Kaski', 28.26689000, 83.96851000),
(157, 'Nepal', 'pokhara', 'Gandaki', 13, '4', 28.26689000, 83.96851000),
(158, '234234', '3412421', '1232132', 123, '23412', 28.27771665, 83.97132110),
(159, 'Nepal', 'Pokhara', 'Rupandehi', 8, '2', 28.26689000, 83.96851000),
(160, 'Nepal', 'Pokhara', 'Rupandehi', 74, 'dndndnnd', 28.26689000, 83.96851000),
(161, 'Nepal', 'Pokhara', 'Rupandehi', 15, 'Bagmati', 28.26314232, 83.93252563),
(162, 'Nepal', 'bnm,l.', 'Rupandehi', 78, 'Gandaki', 28.26689000, 83.96851000),
(163, 'Nepal', 'bnm,l.', 'Rupandehi', 16, 'Lumbini', 28.26689000, 83.96851000),
(164, 'Nepal', 'bnm,l.', 'Rupandehi', 16, 'Lumbini', 28.27330223, 84.06340027),
(165, 'Nepal', 'bnm,l.', 'gandaki', 9, 'Lumbini', 28.27030879, 83.95391464),
(166, 'Nepal', 'Sunwal', 'pokahara', 13, 'Gandaki', 28.26689000, 83.96851000),
(167, 'Nepal', 'Sunwal', 'gandaki', 9, 'Bagmatizdxfcgvhjklnjb v', 28.26689000, 83.96851000),
(168, 'Nepal', 'Sunwal', 'Gandaki', 9, 'Lumbini', 28.26689000, 83.96851000),
(169, 'Nepal', 'Pokhara', 'gandaki', 13, '7', 28.26689000, 83.96851000),
(170, 'Nepal', 'Pokhara', 'gandaki', 13, 'Bagmati', 28.26359591, 83.94337463),
(171, 'Nepal', 'Pokhara', 'Rupandehi', 15, 'Lumbini', 28.26689000, 83.96851000),
(172, 'Nepal', 'Pokhara', 'Gandaki', 16, 'Lumbini', 28.26689000, 83.96851000),
(173, 'Nepal', 'Pokhara', 'Rupandehi', 15, '5', 28.26689000, 83.96851000),
(174, 'Nepal', 'Pokhara', 'gandaki', 15, 'Bagmati', 28.25890874, 83.93341827),
(175, 'Nepal', 'Pokhara', 'gandaki', 15, '5', 28.26689000, 83.96851000),
(176, 'Nepal', 'Pokhara', 'gandaki', 16, '5', 28.26689000, 83.96851000),
(177, 'Nepal', 'Pokhara', 'Rupandehi', 15, 'Bagmati', 28.26689000, 83.96851000),
(178, 'Nepal', 'Pokhara', 'gandaki', 15, 'Bagmati', 28.26689000, 83.96851000),
(179, 'Nepal', 'Pokhara', 'Rupandehi', 15, '7', 28.26689000, 83.96851000),
(180, 'Nepal', 'Pokhara', 'Rupandehi', 15, 'Gandaki', 28.26689000, 83.96851000),
(181, 'Nepal', 'Pokhara', 'gandaki', 15, '7', 28.26689000, 83.96851000),
(182, 'Nepal', 'Pokhara', 'Gandaki', 15, '7', 28.26689000, 83.96851000),
(183, 'Nepal', 'bnm,l.', 'gandaki', 9, '8', 28.26689000, 83.96851000),
(184, 'Nepal', 'Pokhara', ' sad', 9, '5', 28.26689000, 83.96851000),
(185, 'Nepal', 'Pokhara', ' sad', 9, '5', 28.26689000, 83.96851000),
(186, 'Nepal', 'Pokhara', ' sad', 9, '5', 28.26689000, 83.96851000),
(187, 'Nepal', 'Pokhara', 'Gandaki', 8, 'Bagmati', 28.26689000, 83.96851000),
(188, 'Nepal', 'kathmandu', 'Bagmati', 13, '6', 28.26689000, 83.96851000),
(189, 'Nepal', 'Mandikatar', 'Mandikatar', 17, '6', 28.26689000, 83.96851000),
(193, 'Nepal', 'Waling', 'Waling', 14, '8', 28.26689000, 83.96851000),
(194, 'Nepal', 'Pokhara', 'Gandaki', 13, '4', 28.26689000, 83.96851000),
(196, 'Nepal', 'BUtwal', 'Lalitpur', 13, '3', 28.26689000, 83.96851000),
(197, 'Nepal', 'Waling', 'Waling', 13, 'Lumbini', 28.26689000, 83.96851000),
(198, 'Nepal', 'kathmandu', 'Gandaki', 13, '3', 28.26689000, 83.96851000),
(199, 'Nepal', 'Pokhara', 'Gandaki', 15, 'Gandaki', 28.26689000, 83.96851000),
(200, 'Nepal', 'Pokhara', 'gandaki', 16, 'Gandaki', 28.26689000, 83.96851000),
(201, 'Nepal', 'Butwal', 'gandaki', 9, 'Gandaki', 28.26689000, 83.96851000),
(202, 'Nepal', 'Kathmandu', 'Bagmati', 15, '5', 28.26689000, 83.96851000),
(203, 'Nepal', 'Pokhara', 'Lalitpur', 15, 'Bagmati', 28.26689000, 83.96851000),
(204, 'Nepal', 'Kathmandu', 'Gandaki', 15, '7', 28.26689000, 83.96851000),
(205, 'Nepal', 'Pokhara', 'Gandaki', 16, '7', 28.26078671, 83.96950151),
(206, 'Nepal', 'Pokhara', 'Gandaki', 16, '4', 28.26689000, 83.96851000),
(207, 'Nepal', 'Kathmandu', 'Lalitpur', 9, '2', 27.68547381, 85.30664066),
(208, 'Nepal', 'Kathmandu', 'Bagmati', 16, '2', 27.70553703, 85.33273316),
(209, 'Nepal', 'Birgunj', 'Birgunj', 16, '1', 27.52775821, 86.51074246),
(210, 'Nepal', 'Pokhara', 'gandaki', 13, '2', 28.26689000, 83.96851000),
(211, 'Nepal', 'Lalitpur', 'Lalitpur', 16, '2', 27.60567083, 85.22314433),
(212, 'Nepal', 'Pokhara', 'Gnandaki', 13, '3', 28.26689000, 83.96851000),
(213, 'Nepal', 'Pokhara', 'gandaki', 8, '2', 28.26689000, 83.96851000),
(214, 'Nepal', 'Pokhara', 'gandaki', 9, '2', 28.26689000, 83.96851000),
(215, 'Nepal', 'Bhaktapur', 'Bagmati', 16, '2', 27.96723571, 85.37884812),
(216, 'Nepal', 'Kathmandu', 'Bagmati', 9, '2', 27.71976147, 85.28930417),
(217, 'Nepal', 'Lalitpur', 'Lalitpur', 9, '2', 28.25794175, 85.55040046),
(218, 'Nepal', 'Lalitpur', 'Bagmati', 16, '2', 27.92259124, 85.37077171),
(219, 'Nepal', 'Ghorahi', 'Rupandehi', 16, '2', 28.26689000, 83.96851000),
(220, 'Nepal', 'Bhaktapur', 'Lalitpur', 90, 'gandaki', 28.26689000, 83.96851000),
(221, 'Nepal', 'Kathmandu', 'Rupandehi', 16, 'Gandaki', 28.26689000, 83.96851000),
(222, 'nepal', 'Lalitpur', 'mmm', 9, 'bagmati', 28.26689000, 83.96851000),
(223, 'nepal', 'Bhaktapur', 'mmm', 2, '2', 28.26689000, 83.96851000),
(224, 'nepal', 'Biratnagar', 'mmm', 1, '1', 28.26689000, 83.96851000),
(225, 'nepal', 'Biratnagar', 'mmm', 1, '1', 28.26689000, 83.96851000),
(226, 'Nepal', 'Pokhara', 'gandaki', 9, 'Gandaki', 28.26689000, 83.96851000),
(227, 'Nepal', 'Pokhara', 'gandaki', 16, 'Gandaki', 28.26689000, 83.96851000),
(228, 'Nepal', 'Pokhara', 'New road', 5, 'Gandaki', 28.26689000, 83.96851000),
(229, 'Nepal', 'Pokhara', 'Gandaki', 16, '3', 28.26689000, 83.96851000),
(230, 'Nepal', 'Kathmandu', 'Bagmati', 16, '2', 27.81770146, 85.22094727),
(231, 'Nepal', 'Kathmandu', 'Bagmati', 16, '2', 28.26689000, 83.96851000),
(232, 'nepal', 'Kathmandu', 'Bhaktapur', 3, '2', 27.65667968, 85.32996910),
(236, 'Nepal', 'Butwal', 'Rupndehi', 14, '5', 27.71076502, 83.44342009);

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `property_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `payment_status` enum('complete','pending','failed') NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` date NOT NULL DEFAULT current_timestamp(),
  `commission` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `id`, `propertyId`, `transaction_id`, `payment_status`, `payment_method`, `amount`, `created_at`, `updated_at`, `commission`) VALUES
(160, 45, 222, 'ORDER_683136a9e4f7c', 'complete', 'khalti', 15.00, '2025-05-24 03:02:01', '2025-05-24', 0.75),
(162, 76, 221, 'ORDER_6833bf20568b1', 'complete', 'khalti', 10.00, '2025-05-26 01:08:48', '2025-05-26', 0.50);

-- --------------------------------------------------------

--
-- Table structure for table `property`
--

CREATE TABLE `property` (
  `propertyId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location_id` int(11) DEFAULT NULL,
  `dimension` varchar(50) DEFAULT NULL,
  `road_type` varchar(100) DEFAULT NULL,
  `property_face` varchar(50) DEFAULT NULL,
  `id` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `propertyType` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('booked','available') NOT NULL,
  `views` int(11) DEFAULT 0,
  `bedrooms` varchar(255) DEFAULT NULL,
  `bathrooms` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property`
--

INSERT INTO `property` (`propertyId`, `title`, `description`, `location_id`, `dimension`, `road_type`, `property_face`, `id`, `price`, `propertyType`, `uploaded_at`, `status`, `views`, `bedrooms`, `bathrooms`) VALUES
(199, 'Room for rent', 'the monthly rent for a single room can range from 5,500 to 20,000 Nepalese Rupees (NPR), while a 1-bedroom apartment in the city center may cost between 20,000 and 50,000 NPR. For a 3-bedroom apartment in the city center, expect to pay between 30,000 and 100,000 NPR. Outside the city center, a 1-bedroom apartment might be found for 10,000 to 25,000 NPR', 209, '1000sqft', 'Pitch', 'West', 45, 10, 'Room', '2025-04-18 14:06:17', 'available', 1, '1', '1'),
(200, 'Commercial Property for Rent at ', 'Pokhara brings you a Commercial Property for Rent at Pokhara - 05, Siddhartha Chowk.\r\n\r\nThe property has main road access with efficient parking area, suitable for IT company, Bank, Firms,Consultancy. Lalpurja Nepal also provides you home loan at a very low interest rate on the Property listed here.', 210, '4000 sqft', 'Pitch', 'West', 45, 10, 'House', '2025-04-18 14:11:31', 'available', 1, '1', '9'),
(202, 'Commercial Property for Rent at ', ' Commercial Property for Rent at Pokhara - 12, Hospital Chowk.\r\nThe property has main road access with efficient parking area, suitable for Bank, Firms, Consultancy. Lalpurja Nepal also provides you home loan at a very low interest rate on the Property listed here', 212, '5000 sqft', 'Pitch', 'South', 45, 10, 'Apartment', '2025-04-23 01:51:46', 'available', 1, '', ''),
(216, 'Shop Houes For Rent', 'A beautiful, spacious semi-furnished 2BHK Flat is available for rent near Gandaki Regional Hospital, Pokhara.\r\n\r\n2 Spacious Bedrooms\r\nOpen Modern Kitchen\r\nOpen Living Room\r\n1 Bathroom & Toilet\r\n1 Store Room\r\nEnough natural light\r\n2 Minutes walk from Gandaki Hospital\r\nQuite & convenient location\r\n2 Wheeler parking\r\nAND very nice, kind and caring landlords', 226, '400 sqft', 'Pitch', 'West', 45, 10, 'ShopHouse', '2025-05-09 06:03:43', 'available', 1, '0', '0'),
(217, 'Flat For Rent in Pokhara Davis Fall', 'A huge spacious flat is for RENT in Pokhara, near Davis Fall. It\'s a very good opportunity and should not miss if you are looking for a nice flat in Pokhara for rent. The flat is on GROUND FLOOR of 3 story bungalow. The house owner occupies the 1st and 2nd floors.\r\n2 Big Attached Bedrooms\r\n2 Family Bedrooms\r\n1 Big Living Room\r\n1 Kitchen\r\n1 Dinning\r\nParking facility for car and bike\r\nLuxury carpet, lighting, and fresh paint\r\n', 227, '4000 sqft', 'Pitch', 'West', 61, 10, 'Apartment', '2025-05-09 06:07:21', 'available', 1, '4', '2'),
(218, 'Office space available for rent', 'अफिसको लागी ठांउ भाडामा / Office Space For Rent in Pokhara\r\nपोखरा न्युरोडमा पहिलो तल्लमा ३ कोठा भएको अफिसको लागी उपयुक्त / 3 Rooms on First Floor at New Road\r\nपुरा पार्किङ सुविधा सहित / With Full Parking Space\r\nभाडा : रु ३० हजार मासिक / Rent : Rs. 30,000 per month\r\nसम्पर्क : ☎️ 9856070085 or 9825107775', 228, '4000 sqft', 'Pitch', 'West', 61, 10, 'Apartment', '2025-05-09 06:11:55', 'available', 1, '', ''),
(219, ' Shope House for Rent  Mahendrapool', 'Prime Location Near Annapurna Supermarket, Mahendrapul\r\n\r\nShop Location: Side lane of Annapurna Supermarket, Mahendrapul – excellent foot traffic and running successfully.\r\n\r\nMonthly Rent: Rs. 18,000\r\n\r\nSecurity Deposit: Rs. 300,000\r\n\r\nReason for Sale: Selling due to personal reasons.\r\n\r\nSelling Price: Rs. 1,000,000\r\n\r\nNote: No need to pay the security deposit separately.', 229, '400 sqft', 'Pitch', 'North', 61, 10, 'ShopHouse', '2025-05-09 06:22:51', 'available', 1, '0', '0'),
(220, 'Flat on rent in bhaisipati', 'Likely a master bedroom.\r\n\r\nThe attached bath is private, accessible only from the bedroom.', 230, '4000 sqft', 'Pitch', 'West', 61, 10, 'Apartment', '2025-05-09 06:33:08', 'available', 1, '1', '1'),
(221, 'House on rent in bashbari', 'Property Details:\r\nLand Area: 12 Aana (approx. 4095 sq. ft.)\r\n\r\nHouse Type: Fully Furnished Residential House\r\n\r\nBedrooms: 4 Spacious Bedrooms (4BHK)\r\n\r\nBathrooms: 4 Bathrooms\r\n\r\n2 Attached Bathrooms (En-suite)\r\n\r\n2 Common Bathrooms\r\n\r\nLiving/Dining: Large living area and separate dining space\r\n\r\nKitchen: Modular kitchen with modern fittings\r\n\r\nGarden: Private garden space—perfect for family gatherings or relaxation\r\n\r\nParking: Parking space for 3–4 cars\r\n\r\nRoad Access: [Mention width if known, e.g., 13 ft, blacktop road]\r\n\r\nmore details 98510800', 231, '4095 sq. ft.', 'Pitch', 'West', 61, 10, 'House', '2025-05-09 06:39:38', 'booked', 1, '4', '4'),
(222, 'Commercial Space for Rent at Naxal', 'brings you a Commercial Property for Rent at Naxal. You can either rent a floor or rent upto 2 floor. The property has main road access with efficient parking area, suitable for IT company, firms, showrooms', 232, '500 sqft', 'Pitch', 'North', 61, 15, 'ShopHouse', '2025-05-23 15:38:43', 'booked', 1, '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `property_views`
--

CREATE TABLE `property_views` (
  `id` int(11) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `property_views`
--

INSERT INTO `property_views` (`id`, `propertyId`, `ip_address`, `viewed_at`) VALUES
(1, 148, '::1', '2025-03-16 16:37:56'),
(2, 149, '::1', '2025-03-16 16:53:25'),
(3, 150, '::1', '2025-03-19 16:06:24'),
(4, 151, '::1', '2025-03-19 16:08:29'),
(5, 152, '::1', '2025-03-23 04:55:11'),
(6, 153, '::1', '2025-03-23 08:55:52'),
(7, 154, '::1', '2025-03-23 09:09:40'),
(8, 155, '::1', '2025-03-23 09:11:08'),
(9, 156, '::1', '2025-03-23 09:19:31'),
(10, 157, '::1', '2025-03-23 09:21:18'),
(11, 158, '::1', '2025-03-23 09:28:03'),
(12, 159, '::1', '2025-03-24 10:41:12'),
(13, 160, '::1', '2025-03-24 10:42:57'),
(14, 161, '::1', '2025-03-24 10:43:58'),
(15, 162, '::1', '2025-03-24 10:45:14'),
(16, 163, '::1', '2025-03-24 10:51:34'),
(17, 164, '::1', '2025-03-24 10:53:17'),
(18, 165, '::1', '2025-03-24 10:56:19'),
(19, 166, '::1', '2025-03-24 10:57:25'),
(20, 167, '::1', '2025-03-24 11:00:10'),
(21, 168, '::1', '2025-03-24 11:05:08'),
(22, 169, '::1', '2025-03-24 11:06:05'),
(23, 170, '::1', '2025-03-24 11:07:07'),
(24, 171, '::1', '2025-03-24 11:18:12'),
(25, 172, '::1', '2025-03-24 11:19:13'),
(26, 173, '::1', '2025-03-24 11:23:29'),
(27, 174, '::1', '2025-03-24 11:26:41'),
(28, 175, '::1', '2025-03-24 11:28:02'),
(29, 176, '::1', '2025-03-24 13:07:18'),
(30, 177, '::1', '2025-03-25 06:43:42'),
(31, 178, '::1', '2025-03-25 06:55:33'),
(32, 179, '::1', '2025-03-25 07:20:05'),
(33, 180, '::1', '2025-03-25 07:29:50'),
(34, 181, '::1', '2025-03-25 07:46:03'),
(35, 182, '::1', '2025-03-26 13:59:24'),
(36, 183, '::1', '2025-03-26 14:10:36'),
(37, 184, '::1', '2025-03-26 14:27:55'),
(38, 185, '::1', '2025-03-26 14:43:27'),
(39, 186, '::1', '2025-03-26 14:50:58'),
(40, 187, '::1', '2025-03-26 14:53:49'),
(41, 188, '::1', '2025-03-26 14:55:40'),
(43, 190, '::1', '2025-03-27 14:40:00'),
(44, 191, '::1', '2025-03-27 14:43:35'),
(45, 192, '::1', '2025-03-27 14:49:05'),
(46, 193, '::1', '2025-03-29 06:09:04'),
(47, 194, '::1', '2025-04-05 10:00:39'),
(52, 199, '::1', '2025-04-18 14:06:17'),
(53, 200, '::1', '2025-04-18 14:11:31'),
(54, 201, '::1', '2025-04-18 14:19:09'),
(55, 202, '::1', '2025-04-23 01:51:47'),
(56, 203, '::1', '2025-04-23 01:54:26'),
(57, 204, '::1', '2025-04-23 01:56:19'),
(58, 205, '::1', '2025-04-23 02:07:49'),
(59, 206, '::1', '2025-04-23 02:11:47'),
(60, 207, '::1', '2025-04-23 02:14:59'),
(62, 209, '::1', '2025-05-03 15:45:51'),
(64, 211, '::1', '2025-05-03 16:01:27'),
(65, 212, '::1', '2025-05-08 17:23:21'),
(66, 213, '::1', '2025-05-08 17:26:16'),
(67, 214, '::1', '2025-05-08 17:27:37'),
(68, 215, '::1', '2025-05-08 17:35:24'),
(69, 216, '::1', '2025-05-09 06:03:43'),
(70, 217, '::1', '2025-05-09 06:07:21'),
(71, 218, '::1', '2025-05-09 06:11:55'),
(72, 219, '::1', '2025-05-09 06:22:51'),
(73, 220, '::1', '2025-05-09 06:33:08'),
(74, 221, '::1', '2025-05-09 06:39:39'),
(75, 222, '::1', '2025-05-23 15:38:43'),
(76, 226, '::1', '2025-05-24 15:06:49');

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `ratingId` int(11) NOT NULL,
  `propertyId` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `comment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ratings`
--

INSERT INTO `ratings` (`ratingId`, `propertyId`, `id`, `rating`, `comment`) VALUES
(154, 200, 45, 4, 'Great property, very spacious!'),
(155, 220, 45, 5, ''),
(156, 220, 45, 4, ''),
(157, 220, 45, 5, 'Great place!'),
(158, 221, 45, 5, 'Great place!'),
(159, 221, 45, 5, ''),
(160, 218, 45, 5, 'wonderful house!'),
(162, 222, 45, 4, 'Hello'),
(163, 222, 45, 5, 'Hello'),
(164, 221, 76, 5, 'HBeautiful');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(20) DEFAULT NULL,
  `userType` enum('tenant','landlord','admin') NOT NULL DEFAULT 'tenant',
  `verify_code` varchar(255) NOT NULL DEFAULT '0',
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `resettoken` varchar(255) DEFAULT NULL,
  `resettokenexpire` datetime DEFAULT NULL,
  `address` text DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `status` enum('unblock','block') NOT NULL DEFAULT 'unblock'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `google_id`, `name`, `email`, `password`, `phoneNumber`, `userType`, `verify_code`, `is_verified`, `created_at`, `resettoken`, `resettokenexpire`, `address`, `gender`, `status`) VALUES
(45, NULL, 'Varat thapa', 'varat.thapa21@gmail.com', '$2y$10$e5uHACnuIewofYWL26MmYu35363aWgdKL1RlFgIJQnCeAAonxoz92', '9827484127', 'landlord', '1', 1, '2025-03-16 15:59:40', '93a6f0f67b4c22c8714a925b9e29d90b', '2025-05-24 00:00:00', 'Pokhara', 'Male', 'unblock'),
(61, NULL, 'Rent Easy', 'renteasye@gmail.com', '$2y$10$NHkTsldjsZcrPOOnFMKYC.V7Erv6HKAO9e1pII2fGIdp/H82yuD7C', '9827484166', 'admin', '1', 1, '2025-04-21 09:59:55', NULL, NULL, 'Pokhara', 'Male', 'unblock'),
(65, NULL, 'Bob', 'tiktok.video2078@gmail.com', '$2y$10$vGxFqEdQeMJ6nzV7Bn37H.SCj4fiW9QKoBpzVtNh/Qky4ZXxFgivi', '9827484112', 'tenant', '55ff35ba15403d4b15b8447b00ade0c3', 1, '2025-04-22 15:05:16', NULL, NULL, 'Pokhara', 'Male', 'unblock'),
(68, '112791799815501577697', 'varat thapa', 'thapavarat635@gmail.com', NULL, NULL, 'tenant', '1', 1, '2025-04-28 07:55:14', NULL, NULL, NULL, NULL, 'unblock'),
(71, NULL, 'Varat thapa', 'varatthapa174@gmail.com', '$2y$10$RFr9cu95jsCyPlMIO2HEK.f044qj3LOef3XTSI8V8lncfmK/AGc0q', '9827484189', 'landlord', '1', 1, '2025-05-03 14:49:51', NULL, NULL, 'Pokhara', 'Male', 'unblock'),
(72, NULL, 'Varat thapa', 'njnj@gmail.com', '$2y$10$muhu8sEPys2bN3UadVZVf.zdA2w15CpSVnaQmAHKHT66TYaAIR9yG', '982748411111111', 'landlord', '045a6760dbf324581b7540eb4516ce1b', 0, '2025-05-05 16:58:50', NULL, NULL, 'Pokhara', 'Female', 'unblock'),
(73, NULL, 'Ram', 'varat21@gmail.com', '$2y$10$EYQT86VlaZhLyOmIgB5bC.zHkV./HH71kgTTcQI5wBnvklJQGkyH.', '9827484133', 'landlord', '75e6f14633bd7f39e2170eb03753a255', 0, '2025-05-06 15:29:10', NULL, NULL, 'Pokhara', 'Male', 'unblock'),
(74, NULL, 'Seejan Chhetri', 'seejanbaruwal13@gmail.com', '$2y$10$umg5a8eqi4ZvDQtYHrFG1OMcG3aHGa5E1F0tjG7DiWC0ezE78kP56', '9844906660', 'landlord', '209d1dd70df644bcf1087d4486d5e63b', 1, '2025-05-07 01:53:07', NULL, NULL, 'Pokhara', 'Male', 'unblock'),
(75, NULL, 'Varat Chhetri', 'renteasy@gmail.com', '$2y$10$sX2U7QURkMtTasjA981SWuvtLcXF3d/lIKPegQazJov/XM36le8sm', '9999999999999', 'landlord', '166412436532e70cb7bc9b0102b8fd3d', 0, '2025-05-23 15:48:01', NULL, NULL, 'Pokhara', 'Male', 'unblock'),
(76, NULL, 'Lokesh  Magar', 'hari.thapa.s23@icp.edu.np', '$2y$10$sGSjkdq9Nqz7K1XSLyhvXeMgA1HVvCklxkZKNZQs9n.Jmg0cOQjn6', '9827484333', 'landlord', '1', 1, '2025-05-23 15:50:00', NULL, NULL, 'Pokhara', 'Male', 'unblock'),
(77, NULL, 'varat thapa', 'hhh@icp.edu.np', '$2y$10$KILclz93Rfg/fx9lSWEg.eMcgFuS15IjZm9K9zd4dHLtVildgSO0O', '65555555555', 'landlord', 'c2f9acfc3371c8139fdc32edcfa26c44', 0, '2025-05-23 15:51:36', NULL, NULL, 'wdDW', 'Male', 'unblock');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`),
  ADD KEY `id` (`id`),
  ADD KEY `propertyId` (`propertyId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categories_id`),
  ADD KEY `fk_propertyId` (`propertyId`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`contactId`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`documentId`),
  ADD KEY `propertyId` (`propertyId`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`imageId`),
  ADD KEY `propertyId` (`propertyId`),
  ADD KEY `users` (`id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`),
  ADD KEY `messages_ibfk_3` (`property_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `id` (`id`),
  ADD KEY `payment_ibfk_1` (`propertyId`);

--
-- Indexes for table `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`propertyId`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `fk_property_users` (`id`);

--
-- Indexes for table `property_views`
--
ALTER TABLE `property_views`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_view` (`propertyId`,`ip_address`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`ratingId`),
  ADD KEY `property_id` (`propertyId`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_unique` (`email`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD UNIQUE KEY `google_id` (`google_id`),
  ADD UNIQUE KEY `google_id_2` (`google_id`),
  ADD UNIQUE KEY `google_id_unique` (`google_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=736;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categories_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `contactId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `documentId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `imageId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=395;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `property`
--
ALTER TABLE `property`
  MODIFY `propertyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=227;

--
-- AUTO_INCREMENT for table `property_views`
--
ALTER TABLE `property_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `ratingId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyId`);

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `fk_propertyId` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyId`) ON DELETE CASCADE,
  ADD CONSTRAINT `documents_ibfk_2` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyId`) ON DELETE CASCADE,
  ADD CONSTRAINT `users` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_3` FOREIGN KEY (`property_id`) REFERENCES `property` (`propertyId`);

--
-- Constraints for table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `fk_property_users` FOREIGN KEY (`id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `property_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON DELETE CASCADE;

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`propertyId`) REFERENCES `property` (`propertyId`),
  ADD CONSTRAINT `ratings_ibfk_2` FOREIGN KEY (`id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
