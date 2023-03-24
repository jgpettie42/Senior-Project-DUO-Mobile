CREATE DATABASE `DuoDatabase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `tblUsers` (
  `UserID` varchar(50) NOT NULL,
  `FirstName` varchar(60) DEFAULT NULL,
  `MiddleName` varchar(60) DEFAULT NULL,
  `LastName` varchar(60) DEFAULT NULL,
  `PreferredName` varchar(60) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Sex` varchar(10) DEFAULT NULL,
  `Gender` varchar(60) DEFAULT NULL,
  `Pronouns` varchar(60) DEFAULT NULL,
  `CreateDateTime` datetime DEFAULT NULL,
  `LastUsedDateTime` datetime DEFAULT NULL,
  `Password` varchar(50) DEFAULT NULL,
  `OpenEMRID` varchar(50) DEFAULT NULL,
  `MFAInfo` varchar(50) DEFAULT NULL,
  `PreferredLanguage` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblAddressTypes` (
  `AddressTypeID` varchar(50) NOT NULL,
  `Description` longblob,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`AddressTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblPhoneTypes` (
  `PhoneTypeID` varchar(50) NOT NULL,
  `Description` longblob,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`PhoneTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblServices` (
  `ServiceID` varchar(50) NOT NULL,
  `Description` longblob,
  `ExpMinutes` int DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ServiceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblEmailTypes` (
  `EmailTypeID` varchar(50) NOT NULL,
  `Description` longblob,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`EmailTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblEmails` (
  `EmailID` varchar(50) NOT NULL,
  `EmailTypeID` varchar(50) DEFAULT NULL,
  `EmailAddress` varchar(250) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`EmailID`),
  KEY `EmailTypeID_idx` (`EmailTypeID`),
  CONSTRAINT `EmailTypeID` FOREIGN KEY (`EmailTypeID`) REFERENCES `tblEmailTypes` (`EmailTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblShifts` (
  `ShiftID` varchar(50) NOT NULL,
  `Description` longblob,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `Minutes` int DEFAULT NULL,
  PRIMARY KEY (`ShiftID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblRoles` (
  `RoleID` varchar(50) NOT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `Description` longblob,
  `Permissions` longblob,
  PRIMARY KEY (`RoleID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblSkillCategory` (
  `CategoryID` varchar(50) NOT NULL,
  `Description` longblob,
  `Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblPhone` (
  `PhoneID` varchar(50) NOT NULL,
  `PhoneTypeID` varchar(50) DEFAULT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `NationCode` varchar(2) DEFAULT NULL,
  `AreaCode` varchar(3) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`PhoneID`),
  KEY `PhoneTypeID_idx` (`PhoneTypeID`),
  CONSTRAINT `PhoneTypeID` FOREIGN KEY (`PhoneTypeID`) REFERENCES `tblPhoneTypes` (`PhoneTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblEventLocations` (
  `LocationID` varchar(50) NOT NULL,
  `LocationName` longblob,
  `Street1` varchar(100) DEFAULT NULL,
  `Street2` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `ZIP` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`LocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblAddresses` (
  `AddressID` varchar(50) NOT NULL,
  `UserID` varchar(250) DEFAULT NULL,
  `Street1` varchar(100) DEFAULT NULL,
  `Street2` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `ZIP` varchar(10) DEFAULT NULL,
  `Country` varchar(3) DEFAULT NULL,
  `AddressTypeID` varchar(50) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`AddressID`),
  KEY `UserID_idx` (`UserID`),
  KEY `AddressTypeID_idx` (`AddressTypeID`),
  CONSTRAINT `AddressTypeID` FOREIGN KEY (`AddressTypeID`) REFERENCES `tblAddressTypes` (`AddressTypeID`),
  CONSTRAINT `UserID` FOREIGN KEY (`UserID`) REFERENCES `tblUsers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblEvents` (
  `EventID` varchar(50) NOT NULL,
  `Description` longblob,
  `LocationID` varchar(50) DEFAULT NULL,
  `StartDateTime` datetime DEFAULT NULL,
  `EndDateTime` datetime DEFAULT NULL,
  `Notes` longblob,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`EventID`),
  KEY `LocationID_idx` (`LocationID`),
  CONSTRAINT `LocationID` FOREIGN KEY (`LocationID`) REFERENCES `tblEventLocations` (`LocationID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblEventVolunteers` (
  `EventVolunteersID` varchar(50) NOT NULL,
  `EventID` varchar(50) DEFAULT NULL,
  `UserID` varchar(250) DEFAULT NULL,
  `ShiftID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`EventVolunteersID`),
  KEY `ShiftID_idx` (`ShiftID`),
  KEY `UserID_idx` (`UserID`),
  KEY `EventID_3` (`EventID`),
  CONSTRAINT `EventID_3` FOREIGN KEY (`EventID`) REFERENCES `tblEvents` (`EventID`),
  CONSTRAINT `ShiftID` FOREIGN KEY (`ShiftID`) REFERENCES `tblShifts` (`ShiftID`),
  CONSTRAINT `UserID_6` FOREIGN KEY (`UserID`) REFERENCES `tblUsers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblSkills` (
  `SkillID` varchar(50) NOT NULL,
  `Description` longblob,
  `CategoryID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`SkillID`),
  KEY `CategoryID_idx` (`CategoryID`),
  CONSTRAINT `CategoryID` FOREIGN KEY (`CategoryID`) REFERENCES `tblSkillCategory` (`CategoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblStationAppointment` (
  `StationAppointmentID` varchar(50) NOT NULL,
  `ServiceID` varchar(50) DEFAULT NULL,
  `UserID` varchar(250) DEFAULT NULL,
  `Date&Time` datetime DEFAULT NULL,
  PRIMARY KEY (`StationAppointmentID`),
  KEY `UserID_7_idx` (`UserID`),
  KEY `ServiceID_4_idx` (`ServiceID`),
  CONSTRAINT `ServiceID_4` FOREIGN KEY (`ServiceID`) REFERENCES `tblServices` (`ServiceID`),
  CONSTRAINT `UserID_7` FOREIGN KEY (`UserID`) REFERENCES `tblUsers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblUserSkills` (
  `UserSkillID` varchar(50) NOT NULL,
  `SkillID` varchar(50) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `Experience` longblob,
  `Licensed` longblob,
  `UserID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserSkillID`),
  KEY `SkillID_idx` (`SkillID`),
  KEY `UserID_idx` (`UserID`),
  CONSTRAINT `SkillID` FOREIGN KEY (`SkillID`) REFERENCES `tblSkills` (`SkillID`),
  CONSTRAINT `UserID_5` FOREIGN KEY (`UserID`) REFERENCES `tblUsers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblRegistrations` (
  `RegistrationID` varchar(50) NOT NULL,
  `UserID` varchar(250) DEFAULT NULL,
  `EventID` varchar(50) NOT NULL,
  `DateTimeRegistered` datetime DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`RegistrationID`),
  KEY `UserID_4_idx` (`UserID`),
  KEY `EventID_2_idx` (`EventID`),
  CONSTRAINT `EventID_2` FOREIGN KEY (`EventID`) REFERENCES `tblEvents` (`EventID`),
  CONSTRAINT `UserID_4` FOREIGN KEY (`UserID`) REFERENCES `tblUsers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblRegistrationServices` (
  `RegServiceID` varchar(50) NOT NULL,
  `RegistrationID` varchar(50) DEFAULT NULL,
  `ServiceID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`RegServiceID`),
  KEY `RegistrationID_idx` (`RegtblEventServicesistrationID`),
  KEY `ServiceID_idx` (`ServiceID`),
  CONSTRAINT `RegistrationID` FOREIGN KEY (`RegistrationID`) REFERENCES `tblRegistrations` (`RegistrationID`),
  CONSTRAINT `ServiceID` FOREIGN KEY (`ServiceID`) REFERENCES `tblServices` (`ServiceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblEventServices` (
  `EventServiceID` varchar(50) NOT NULL,
  `EventID` varchar(50) DEFAULT NULL,
  `ServiceID` varchar(50) DEFAULT NULL,
  `AvailableMinutes` int DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`EventServiceID`),
  KEY `EventID_idx` (`EventID`),
  KEY `ServiceID_idx` (`ServiceID`),
  CONSTRAINT `EventID_4` FOREIGN KEY (`EventID`) REFERENCES `tblEvents` (`EventID`),
  CONSTRAINT `ServiceID_3` FOREIGN KEY (`ServiceID`) REFERENCES `tblServices` (`ServiceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblEmergencyContacts` (
  `ContactID` varchar(50) NOT NULL,
  `FirstName` varchar(60) DEFAULT NULL,
  `LastName` varchar(60) DEFAULT NULL,
  `Phone` varchar(10) DEFAULT NULL,
  `UserID` varchar(250) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `RelationshipID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ContactID`),
  KEY `UserID_idx` (`UserID`),
  KEY `RelationshipID_idx` (`RelationshipID`),
  CONSTRAINT `RelationshipID` FOREIGN KEY (`RelationshipID`) REFERENCES `tblRelationships` (`RelationshipID`),
  CONSTRAINT `UserID_3` FOREIGN KEY (`UserID`) REFERENCES `tblUsers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblContactInfo` (
  `UserID` varchar(250) NOT NULL,
  `EmailID` varchar(50) DEFAULT NULL,
  `PhoneID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  KEY `EmailID_idx` (`EmailID`),
  KEY `PhoneID_idx` (`PhoneID`),
  CONSTRAINT `EmailID` FOREIGN KEY (`EmailID`) REFERENCES `tblEmails` (`EmailID`),
  CONSTRAINT `PhoneID` FOREIGN KEY (`PhoneID`) REFERENCES `tblPhone` (`PhoneID`),
  CONSTRAINT `UserID_8` FOREIGN KEY (`UserID`) REFERENCES `tblUsers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `tblUserRoles` (
  `UserRoleID` varchar(50) NOT NULL,
  `UserID` varchar(250) DEFAULT NULL,
  `RoleID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserRoleID`),
  KEY `RoleID_idx` (`RoleID`),
  KEY `UserID_idx` (`UserID`),
  CONSTRAINT `RoleID` FOREIGN KEY (`RoleID`) REFERENCES `tblRoles` (`RoleID`),
  CONSTRAINT `UserID_2` FOREIGN KEY (`UserID`) REFERENCES `tblUsers` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
