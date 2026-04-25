CREATE DATABASE mess_analysis;
USE mess_analysis;
CREATE TABLE Hostel (
    hostel_id INT PRIMARY KEY AUTO_INCREMENT,
    hostel_name VARCHAR(50) NOT NULL UNIQUE,
    location VARCHAR(100) NOT NULL,
    capacity INT NOT NULL CHECK (capacity > 0)
);
CREATE TABLE Mess (
    mess_id INT PRIMARY KEY AUTO_INCREMENT,
    mess_name VARCHAR(50) NOT NULL UNIQUE,
    capacity INT NOT NULL CHECK (capacity > 0),
    hostel_id INT NOT NULL ,
    FOREIGN KEY (hostel_id) REFERENCES Hostel(hostel_id)
);
CREATE TABLE Menu (
    menu_id INT PRIMARY KEY AUTO_INCREMENT,
    menu_date DATE NOT NULL,
    mess_id INT NOT NULL,
    UNIQUE (menu_date, mess_id),
    FOREIGN KEY (mess_id) REFERENCES Mess(mess_id)
);
CREATE TABLE Ingredient (
    ingredient_id INT PRIMARY KEY AUTO_INCREMENT,
    ingredient_name VARCHAR(50) NOT NULL UNIQUE,
    unit VARCHAR(20) NOT NULL,
    cost_per_unit DECIMAL(10,2) NOT NULL CHECK (cost_per_unit >= 0)
);
CREATE TABLE Menu_Ingredient (
    menu_id INT NOT NULL,
    ingredient_id INT NOT NULL,
    PRIMARY KEY (menu_id, ingredient_id),
    FOREIGN KEY (menu_id) REFERENCES Menu(menu_id),
    FOREIGN KEY (ingredient_id) REFERENCES Ingredient(ingredient_id)
);
CREATE TABLE Student (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    registration_number VARCHAR(20) UNIQUE,
    first_name VARCHAR(30) NOT NULL,
    middle_name VARCHAR(30),
    last_name VARCHAR(30) NOT NULL,
    dob DATE NOT NULL,
    age INT NOT NULL CHECK (age >= 16),
    phone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    hostel_id INT NOT NULL,
    FOREIGN KEY (hostel_id) REFERENCES Hostel(hostel_id)
);
CREATE TABLE Meal (
    meal_id INT PRIMARY KEY AUTO_INCREMENT,
    meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN ('Breakfast','Lunch','Dinner')),
    date DATE NOT NULL,
    serving_time TIME NOT NULL,
    mess_id INT NOT NULL,
    FOREIGN KEY (mess_id) REFERENCES Mess(mess_id)
);
CREATE TABLE Student_Meal (
    student_id INT NOT NULL,
    meal_id INT NOT NULL,
    PRIMARY KEY (student_id, meal_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (meal_id) REFERENCES Meal(meal_id)
);
CREATE TABLE Attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT NOT NULL,
    date DATE NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('Present','Absent')),
    UNIQUE (student_id, date),
    FOREIGN KEY (student_id) REFERENCES Student(student_id)
);
CREATE TABLE Meal_Log (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    meal_id INT NOT NULL,
    quantity_consumed INT NOT NULL CHECK (quantity_consumed >= 0),
    record_date DATE NOT NULL,
    FOREIGN KEY (meal_id) REFERENCES Meal(meal_id)
);
CREATE TABLE Wastage (
    wastage_id INT PRIMARY KEY AUTO_INCREMENT,
    meal_id INT NOT NULL,
    waste_kg DECIMAL(6,2) NOT NULL CHECK (waste_kg >= 0),
    reason VARCHAR(100),
    date DATE NOT NULL,
    FOREIGN KEY (meal_id) REFERENCES Meal(meal_id)
);
CREATE TABLE Cost (
    cost_id INT PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    total_cost DECIMAL(10,2) NOT NULL CHECK (total_cost >= 0)
);
CREATE TABLE Food_Cost (
    cost_id INT PRIMARY KEY,
    food_amount DECIMAL(10,2) NOT NULL CHECK (food_amount >= 0),
    FOREIGN KEY (cost_id) REFERENCES Cost(cost_id)
);
CREATE TABLE Utility_Cost (
    cost_id INT PRIMARY KEY,
    electricity_cost DECIMAL(10,2) NOT NULL CHECK (electricity_cost >= 0),
    water_cost DECIMAL(10,2) NOT NULL CHECK (water_cost >= 0),
    FOREIGN KEY (cost_id) REFERENCES Cost(cost_id)
);
CREATE TABLE Meal_Cost (
    meal_id INT NOT NULL,
    cost_id INT NOT NULL,
    PRIMARY KEY (meal_id, cost_id),
    FOREIGN KEY (meal_id) REFERENCES Meal(meal_id),
    FOREIGN KEY (cost_id) REFERENCES Cost(cost_id)
);
