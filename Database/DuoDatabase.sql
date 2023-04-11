CREATE DATABASE `DuoDatabase` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `tblAddresses` (
  `AddressID` varchar(50) NOT NULL,
  `UserID` varchar(100) NOT NULL,
  `Street1` varchar(100) DEFAULT NULL,
  `Street2` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `ZIP` varchar(10) DEFAULT NULL,
  `Country` varchar(3) DEFAULT NULL,
  `AddressTypeID` varchar(50) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`AddressID`)
);
CREATE TABLE `tblAddressTypes` (
  `AddressTypeID` varchar(50) NOT NULL,
  `Description` longblob,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`AddressTypeID`)
);
CREATE TABLE `tblContactInfo` (
  `UserID` varchar(100) NOT NULL,
  `EmailID` varchar(50) DEFAULT NULL,
  `PhoneID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
);
CREATE TABLE `tblDashboardNotes` (
  `NotesID` varchar(50) NOT NULL,
  `UserID` varchar(100) DEFAULT NULL,
  `Note` longblob,
  `CreateDateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`NotesID`)
);
CREATE TABLE `tblEmails` (
  `EmailID` varchar(50) NOT NULL,
  `EmailTypeID` varchar(50) DEFAULT NULL,
  `EmailAddress` varchar(100) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`EmailID`)
);
CREATE TABLE `tblEmailTypes` (
  `EmailTypeID` varchar(50) NOT NULL,
  `Description` longblob,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`EmailTypeID`)
);
CREATE TABLE `tblEmergencyContacts` (
  `ContactID` varchar(50) NOT NULL,
  `FirstName` varchar(60) DEFAULT NULL,
  `LastName` varchar(60) DEFAULT NULL,
  `Description` longblob,
  `Phone` varchar(10) DEFAULT NULL,
  `UserID` varchar(100) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ContactID`)
);
CREATE TABLE `tblEventLocations` (
  `LocationID` varchar(50) NOT NULL,
  `LocationName` longblob,
  `Street1` varchar(100) DEFAULT NULL,
  `Street2` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(50) DEFAULT NULL,
  `ZIP` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`LocationID`)
);
CREATE TABLE `tblEvents` (
  `EventID` varchar(50) NOT NULL,
  `Description` longblob,
  `LocationID` varchar(50) DEFAULT NULL,
  `StartDateTime` datetime DEFAULT NULL,
  `EndDateTime` datetime DEFAULT NULL,
  `Notes` longblob,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`EventID`)
);
CREATE TABLE `tblEventServices` (
  `EventServiceID` varchar(50) NOT NULL,
  `EventID` varchar(50) DEFAULT NULL,
  `ServiceID` varchar(50) DEFAULT NULL,
  `AvailableMinutes` int DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`EventServiceID`)
);
CREATE TABLE `tblEventVolunteers` (
  `EventVolunteersID` varchar(50) NOT NULL,
  `EventID` varchar(50) DEFAULT NULL,
  `UserID` varchar(100) DEFAULT NULL,
  `ShiftID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`EventVolunteersID`)
);
CREATE TABLE `tblPhone` (
  `PhoneID` varchar(50) NOT NULL,
  `PhoneTypeID` varchar(50) DEFAULT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `NationCode` varchar(2) DEFAULT NULL,
  `AreaCode` varchar(3) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`PhoneID`)
);
CREATE TABLE `tblPhoneTypes` (
  `PhoneTypeID` varchar(50) NOT NULL,
  `Description` longblob,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`PhoneTypeID`)
);
CREATE TABLE `tblPreRegistration` (
  `RegistrationID` varchar(50) NOT NULL,
  `FirstName` varchar(60) DEFAULT NULL,
  `MiddleName` varchar(60) DEFAULT NULL,
  `LastName` varchar(60) DEFAULT NULL,
  `PreferredName` varchar(50) DEFAULT NULL,
  `Phone` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DOB` varchar(50) DEFAULT NULL,
  `Sex` varchar(30) DEFAULT NULL,
  `PreferredLanguage` varchar(50) DEFAULT NULL,
  `RegistrationDateTIme` datetime DEFAULT NULL,
  `Services` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`RegistrationID`)
);
CREATE TABLE `tblRegistrations` (
  `RegistrationID` varchar(50) NOT NULL,
  `UserID` varchar(100) DEFAULT NULL,
  `EventID` varchar(50) NOT NULL,
  `DateTimeRegistered` datetime DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`RegistrationID`)
);
CREATE TABLE `tblRegistrationServices` (
  `RegServiceID` varchar(50) NOT NULL,
  `RegistrationID` varchar(50) DEFAULT NULL,
  `ServiceID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`RegServiceID`)
);
CREATE TABLE `tblRelationships` (
  `RelationshipID` varchar(50) NOT NULL,
  `Description` longblob,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`RelationshipID`)
);
CREATE TABLE `tblRoles` (
  `RoleID` varchar(50) NOT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `Description` longblob,
  `Permissions` longblob,
  PRIMARY KEY (`RoleID`)
);
CREATE TABLE `tblServices` (
  `ServiceID` varchar(50) NOT NULL,
  `Description` longblob,
  `ExpMinutes` int DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`ServiceID`)
);
CREATE TABLE `tblSession` (
  `SessionID` varchar(50) NOT NULL,
  `UserID` varchar(100) DEFAULT NULL,
  `StartDateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`SessionID`)
);
CREATE TABLE `tblShifts` (
  `ShiftID` varchar(50) NOT NULL,
  `Description` longblob,
  `StartTime` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `Minutes` int DEFAULT NULL,
  PRIMARY KEY (`ShiftID`)
);
CREATE TABLE `tblSkillCategory` (
  `CategoryID` varchar(50) NOT NULL,
  `Description` longblob,
  `Status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`)
);
CREATE TABLE `tblSkills` (
  `SkillID` varchar(50) NOT NULL,
  `Description` longblob,
  `CategoryID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`SkillID`)
);
CREATE TABLE `tblStationAppointment` (
  `StationAppointmentID` varchar(50) NOT NULL,
  `ServiceID` varchar(50) DEFAULT NULL,
  `UserID` varchar(100) DEFAULT NULL,
  `Date&Time` datetime DEFAULT NULL,
  PRIMARY KEY (`StationAppointmentID`)
);
CREATE TABLE `tblUserHealthInfo` (
  `HealthID` varchar(50) NOT NULL,
  `Height` varchar(50) DEFAULT NULL,
  `Weight` varchar(50) DEFAULT NULL,
  `BMI` varchar(50) DEFAULT NULL,
  `BloodType` varchar(50) DEFAULT NULL,
  `O2` varchar(50) DEFAULT NULL,
  `ExtraInfo` varchar(250) DEFAULT NULL,
  `UserID` varchar(100) DEFAULT NULL,
  `HeartRate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`HealthID`)
);
CREATE TABLE `tblUserRoles` (
  `UserRoleID` varchar(50) NOT NULL,
  `UserID` varchar(100) DEFAULT NULL,
  `RoleID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`UserRoleID`)
);
CREATE TABLE `tblUsers` (
  `UserID` varchar(100) NOT NULL,
  `FirstName` varchar(60) NOT NULL,
  `MiddleName` varchar(60) NOT NULL,
  `LastName` varchar(60) NOT NULL,
  `PreferredName` varchar(60) DEFAULT NULL,
  `DOB` date NOT NULL,
  `Sex` varchar(30) NOT NULL,
  `Gender` varchar(60) DEFAULT NULL,
  `Pronouns` varchar(60) DEFAULT NULL,
  `CreateDateTime` datetime DEFAULT NULL,
  `LastUsedDateTime` datetime DEFAULT NULL,
  `Password` varchar(100) NOT NULL,
  `OpenEMRID` varchar(50) DEFAULT NULL,
  `MFAInfo` varchar(50) DEFAULT NULL,
  `PreferredLanguage` varchar(50) DEFAULT NULL,
  `BadgeNum` int NOT NULL,
  PRIMARY KEY (`UserID`)
);
CREATE TABLE `tblUserSkills` (
  `UserSkillID` varchar(50) NOT NULL,
  `SkillID` varchar(50) DEFAULT NULL,
  `Status` varchar(10) DEFAULT NULL,
  `Experience` longblob,
  `Licensed` longblob,
  `UserID` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`UserSkillID`)
);