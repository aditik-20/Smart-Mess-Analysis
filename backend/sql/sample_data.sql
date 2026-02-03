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
