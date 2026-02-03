create database  hostelmessanalysis;
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

