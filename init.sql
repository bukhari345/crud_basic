-- Runs automatically the first time the MySQL container starts
-- (files in /docker-entrypoint-initdb.d are executed on an empty data dir).
CREATE DATABASE IF NOT EXISTS crud;
USE crud;

CREATE TABLE IF NOT EXISTS users (
  id    INT PRIMARY KEY,
  name  VARCHAR(255),
  email VARCHAR(255),
  age   INT,
  city  VARCHAR(255)
);
