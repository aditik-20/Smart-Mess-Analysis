CREATE DATABASE hostel_Management;

use hostel_Management;

CREATE TABLE hostels(
hostel_id INT PRIMARY KEY,
hostel_name VARCHAR(50) UNIQUE
);

create table students(
student_id INT AUTO_INCREMENT PRIMARY KEY,
student_name varchar(50) NOT NULL,
hostel_id INT,
FOREIGN KEY (hostel_id) REFERENCES hostels(hostel_id)
);

create table attendance (
attendance_id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
FOREIGN KEY(student_id) REFERENCES students(student_id),
date DATE NOT NULL,
status BOOLEAN
);

create table costs (
cost_id INT AUTO_INCREMENT PRIMARY KEY,
date DATE NOT NULL,
hostel_id INT,
FOREIGN KEY (hostel_id) REFERENCES hostels(hostel_id),
total_cost DECIMAL
);

create table meals_log (
meal_id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
FOREIGN KEY(student_id) REFERENCES students(student_id),
type ENUM("lunch","breakfast","dinner"),
wastage_kg DECIMAL,
date DATE NOT NULL,
hour INT
);

create table Wastage (
waste_id INT AUTO_INCREMENT PRIMARY KEY,
hostel_id INT,
FOREIGN KEY (hostel_id) REFERENCES hostels(hostel_id),
type ENUM("lunch","breakfast","dinner"),
date DATE NOT NULL,
wastage_kg DECIMAL
);

