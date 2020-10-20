-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 20, 2020 at 02:22 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `genesis_care`
--

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int(11) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `patient_dob` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `patient_name`, `patient_dob`) VALUES
(1, 'boblooba', '1966-11-05'),
(5, 'steve', '1976-11-05'),
(6, 'kevin', '1993-05-21'),
(7, 'BOBO1', '1967-11-05'),
(8, 'yty', '0000-00-00'),
(9, 'kevinl', '1969-11-05');

-- --------------------------------------------------------

--
-- Table structure for table `patient_uploads`
--

CREATE TABLE `patient_uploads` (
  `upload_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `message` varchar(500) NOT NULL,
  `timestamp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient_uploads`
--

INSERT INTO `patient_uploads` (`upload_id`, `patient_id`, `message`, `timestamp`) VALUES
(1, 1, 'dasdsad', 1601692254),
(2, 1, 'dasdasdasdasd', 1601692489),
(3, 1, 'dsadasd', 1601692588),
(4, 1, 'fxcvzczxczx', 1601693801),
(5, 1, 'janice test', 1601693845),
(6, 1, 'janice test2 ', 1601693901),
(7, 1, 'dasdasdadadad', 1601694308),
(8, 1, 'czxczxczczczc', 1601694440),
(9, 1, 'dasdasdasdasd', 1601694631),
(10, 1, 'fsdfdsfsdfsdfsdfdsfdsfsdfdfdsfsdf', 1601695930),
(18, 5, 'im steve', 1602676992),
(19, 6, '3-one', 1602810008),
(20, 1, '123421412', 1603082792),
(21, 7, '151231', 1603082841),
(22, 8, '21421341231', 1603083003),
(23, 9, 'test', 1603141318);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(18) NOT NULL,
  `password` varchar(100) NOT NULL,
  `roles` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `roles`) VALUES
(1, 'bob', 'bob123', 'patient');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `patient_uploads`
--
ALTER TABLE `patient_uploads`
  ADD PRIMARY KEY (`upload_id`),
  ADD KEY `patient_id` (`patient_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `patient_uploads`
--
ALTER TABLE `patient_uploads`
  MODIFY `upload_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `patient_uploads`
--
ALTER TABLE `patient_uploads`
  ADD CONSTRAINT `patient_uploads_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
