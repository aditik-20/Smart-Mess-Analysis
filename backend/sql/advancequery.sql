
SELECT first_name,last_name
FROM Student
WHERE hostel_id =
(
SELECT hostel_id
FROM Hostel
WHERE hostel_name='Hostel A'
);


SELECT s.first_name, m.meal_type
FROM Student s
JOIN Student_Meal sm ON s.student_id = sm.student_id
JOIN Meal m ON sm.meal_id = m.meal_id;


SELECT date FROM Meal
UNION
SELECT date FROM Cost;

SELECT 
m.meal_id,
m.meal_type,
m.date,
me.mess_name,
COUNT(sm.student_id) AS students_ate
FROM Meal m
JOIN Mess me ON m.mess_id = me.mess_id
LEFT JOIN Student_Meal sm ON m.meal_id = sm.meal_id
GROUP BY m.meal_id;

SELECT 
mn.menu_date,
i.ingredient_name,
i.cost_per_unit
FROM Menu mn
JOIN Menu_Ingredient mi ON mn.menu_id = mi.menu_id
JOIN Ingredient i ON mi.ingredient_id = i.ingredient_id;


SELECT first_name,last_name
FROM Student
WHERE student_id IN
(
SELECT sm.student_id
FROM Student_Meal sm
JOIN Meal m ON sm.meal_id = m.meal_id
WHERE m.meal_type = 'Lunch'
);

SELECT meal_id
FROM Wastage
WHERE waste_kg =
(
SELECT MAX(waste_kg)
FROM Wastage
);

SELECT mess_name
FROM Mess
WHERE mess_id =
(
SELECT mess_id
FROM Meal
GROUP BY mess_id
ORDER BY COUNT(meal_id) DESC
LIMIT 1
);


SELECT 
m.date,
me.mess_name,
COUNT(sm.student_id) AS students_served,
SUM(w.waste_kg) AS wastage
FROM Meal m
JOIN Mess me ON m.mess_id = me.mess_id
LEFT JOIN Student_Meal sm ON m.meal_id = sm.meal_id
LEFT JOIN Wastage w ON m.meal_id = w.meal_id
GROUP BY m.date, me.mess_name;