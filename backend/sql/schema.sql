create database if not exists hostelmessanalysis;
use hostelmessanalysis;
create table hostels(
	hostel_id int primary key auto_increment,
    hostel_name varchar(100) not null unique
    );

show tables;
create table students(
student_id int primary key auto_increment,
student_name varchar(60) not null ,
hostel_id int not null,
foreign key(hostel_id) references hostels(hostel_id)
);

show tables;
create table attendance(
	attendance_id int primary key not null auto_increment ,
    student_id int not null,
    date DATE not null , 
    status boolean not null , 
    unique(student_id , date),
    foreign key(student_id) references students(student_id)
    );
    
create table meal_log(
	meal_id int primary key not null auto_increment,
    student_id int not null,
    meal_type enum('Breakfast' , 'Lunch' , 'Dinner') not null , 
    date DATE not null,
    unique(student_id , date , meal_type),
    foreign key(student_id) references students(student_id)
    );
    
    create table wastage(
    waste_id int primary key not null auto_increment,
    hostel_id int not null,
    meal_type enum('Breakfast' , 'Lunch' , 'Dinner') not null , 
    date DATE not null,
    waste_kg decimal(6,2) not null check (waste_kg >= 0),
    foreign key(hostel_id) references hostels(hostel_id));
    
    create table costs(
		costs_id int primary key not null auto_increment,
        hostel_id int not null ,
        date DATE not null,
        total_cost decimal(12,2) not null check(total_cost >= 0),
         foreign key(hostel_id) references hostels(hostel_id));

insert into hostels (hostel_name) 
values
('A Block'),('B Block');

insert into students(student_name , hostel_id) values
('Aditi',1),
('Shreya',1),
('Sanya',1),
('Prachi',2),
('Arpita',2);


insert into attendance(student_id, date, status) values
(1, '2026-01-15', TRUE),
(2, '2026-01-15', TRUE),
(3, '2026-01-15', FALSE),
(4, '2026-01-15', TRUE),
(5, '2026-01-15', TRUE);


INSERT INTO meal_log (student_id, meal_type, date) VALUES
(1, 'Breakfast', '2026-01-15'),
(1, 'Lunch', '2026-01-15'),
(2, 'Lunch', '2026-01-15'),
(4, 'Dinner', '2026-01-15'),
(5, 'Breakfast', '2026-01-15');



INSERT INTO wastage (hostel_id, meal_type, date, waste_kg) VALUES
(1, 'Breakfast', '2026-01-15', 12.5),
(1, 'Lunch', '2026-01-15', 18.0),
(2, 'Dinner', '2026-01-15', 10.2);


INSERT INTO costs (hostel_id, date, total_cost) VALUES
(1, '2026-01-15', 25000.00),
(2, '2026-01-15', 22000.00);
