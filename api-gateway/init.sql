CREATE DATABASE IF NOT EXISTS `micro-mars-general-db`;
SELECT * FROM user_role WHERE name = 'default';
INSERT INTO user_role (name) VALUES ('default');
