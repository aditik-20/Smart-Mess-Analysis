
-- SUBQUERY
SELECT first_name,last_name
FROM Student
WHERE hostel_id =
(
SELECT hostel_id
FROM Hostel
WHERE hostel_name='Hostel A'
);-- SUBQUERY


-- JOIN QUERY
SELECT s.first_name, m.meal_type
FROM Student s
JOIN Student_Meal sm ON s.student_id = sm.student_id
JOIN Meal m ON sm.meal_id = m.meal_id;

-- SET OPERATION
SELECT date FROM Meal
UNION
SELECT date FROM Cost;