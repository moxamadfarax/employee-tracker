DROP DATABASE IF EXISTS workplace_db;
CREATE DATABASE workplace_db;
USE workplace_db;

DROP TABLE IF EXISTS manager;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE managers (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments(id)
);
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    is_manager BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES roles(id)
    ON DELETE SET NULL
);

