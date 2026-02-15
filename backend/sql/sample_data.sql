INSERT INTO Hostel (hostel_name, location, capacity) VALUES
('M Block', 'KTR', 300),
('Sannasi A', 'KTR', 250),
('Sannasi C', 'KTR', 200),
('Nelson Mandela', 'KTR', 180),
('Kalpana', 'KTR', 350);

INSERT INTO Mess (mess_name, capacity, hostel_id) VALUES
('M Mess', 280, 1),
('Sannasi A Mess', 230, 2),
('Sannasi C Mess', 190, 3),
('Nelson Mandela Mess', 160, 4),
('Kalpana Mess', 320, 5);

INSERT INTO Ingredient (ingredient_name, unit, cost_per_unit) VALUES
('Rice', 'kg', 40.00),
('Dal', 'kg', 90.00),
('Milk', 'litre', 50.00),
('Chicken', 'kg', 220.00),
('Potato', 'kg', 25.00);

INSERT INTO Menu (menu_date, mess_id) VALUES
('2026-02-15', 1),
('2026-02-15', 2),
('2026-02-15', 3),
('2026-02-15', 4),
('2026-02-15', 5);

INSERT INTO Menu_Ingredient (menu_id, ingredient_id) VALUES
(1,1),(1,2),(1,5),
(2,1),(2,2),(2,5),
(3,1),(3,2),(3,5),
(4,1),(4,2),(4,4),
(5,1),(5,2),(5,5);

INSERT INTO Student 
(first_name, middle_name, last_name, dob, age, phone, email, hostel_id) VALUES
('Rahul', NULL, 'Sharma', '2004-05-12', 21, '9876543210', 'rahul@example.com', 1),
('Priya', 'A', 'Verma', '2003-08-22', 22, '9876543211', 'priya@example.com', 2),
('Arjun', NULL, 'Singh', '2005-01-10', 20, '9876543212', 'arjun@example.com', 3),
('Sneha', 'K', 'Rao', '2004-11-03', 21, '9876543213', 'sneha@example.com', 4),
('Vikram', NULL, 'Mehta', '2003-03-18', 22, '9876543214', 'vikram@example.com', 5);

INSERT INTO Meal (meal_type, date, serving_time, mess_id) VALUES
('Breakfast','2026-02-15','08:00:00',1),
('Breakfast','2026-02-15','08:00:00',2),
('Breakfast','2026-02-15','08:00:00',3),
('Breakfast','2026-02-15','08:00:00',4),
('Breakfast','2026-02-15','08:00:00',5);

INSERT INTO Student_Meal (student_id, meal_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);