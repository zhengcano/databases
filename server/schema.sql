CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  text varchar(140),
  messageid INT AUTO_INCREMENT PRIMARY KEY,
  userid INT(3),
  roomname varchar(20)
);

/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  username varchar(20),
  userid INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE rooms (
  roomname varchar(20),
  userid INT AUTO_INCREMENT PRIMARY KEY
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

