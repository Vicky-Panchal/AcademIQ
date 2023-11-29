DROP DATABASE IF EXISTS academiq;
CREATE DATABASE IF NOT EXISTS academiq;
USE academiq;

DROP TABLE IF EXISTS department,
user,
employee,
employee_salary,
token;


CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100),
    photograph_path VARCHAR(255),
    user_id INT,
    department_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee_salary (
    id INT AUTO_INCREMENT PRIMARY KEY,
    payment_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    description VARCHAR(255),
    salary_slip VARCHAR(255),
    employee_id INT,
    FOREIGN KEY (employee_id) REFERENCES employee(id)
);

CREATE TABLE token (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) UNIQUE,
    tokenType VARCHAR(255),
    revoked BOOLEAN,
    expired BOOLEAN,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(id)
);
