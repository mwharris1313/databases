CREATE DATABASE IF NOT EXISTS chat;

USE chat;

CREATE TABLE users (
  user_id int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  PRIMARY KEY (user_id)

) ENGINE = MyISAM;

CREATE TABLE rooms (
  room_id int NOT NULL AUTO_INCREMENT,
  roomname varchar(255),
  PRIMARY KEY (room_id)
) ENGINE = MyISAM;

CREATE TABLE messages (
  user_id int NOT NULL,
  room_id int NOT NULL,
  msg_text varchar(255),
  time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (room_id) REFERENCES rooms(room_id)
) ENGINE = MyISAM;


/* Create other tables and define schemas for them here! */



--
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

