CREATE VIEW hostel_student_count AS
SELECT     h.hostel_name,    COUNT(s.student_id) AS total_students FROM Hostel h
LEFT JOIN Student s ON h.hostel_id = s.hostel_id GROUP BY h.hostel_name;


CREATE VIEW meal_attendance_summary AS SELECT m.meal_id, m.meal_type, m.date,    COUNT(sm.student_id) AS students_registered FROM Meal m LEFT JOIN Student_Meal sm ON m.meal_id = sm.meal_id GROUP BY m.meal_id, m.meal_type, m.date;

CREATE VIEW daily_wastage_report AS SELECT    m.date,    SUM(w.waste_kg) AS total_wastage
FROM Wastage w JOIN Meal m ON w.meal_id = m.meal_id GROUP BY m.date;


CREATE VIEW ingredient_usage AS SELECT
    mn.menu_date,    i.ingredient_name FROM Menu mn
JOIN Menu_Ingredient mi ON mn.menu_id = mi.menu_id JOIN Ingredient i ON mi.ingredient_id = i.ingredient_id;

CREATE VIEW meal_cost_summary AS
SELECT    m.meal_id,
    m.meal_type,     m.date,    c.total_cost
FROM Meal m JOIN Meal_Cost mc ON m.meal_id = mc.meal_id JOIN Cost c ON mc.cost_id = c.cost_id;


CREATE VIEW mess_meal_count AS SELECT   me.mess_name,
    COUNT(m.meal_id) AS total_meals
FROM Mess me LEFT JOIN Meal m ON me.mess_id = m.mess_id GROUP BY me.mess_name;

CREATE VIEW avg_meal_consumption AS
SELECT     m.date,    AVG(ml.quantity_consumed) AS avg_consumption FROM Meal m JOIN Meal_Log ml ON m.meal_id = ml.meal_id GROUP BY m.date;

CREATE VIEW wastage_extremes AS SELECT m.meal_type, MAX(w.waste_kg) AS max_wastage,    MIN(w.waste_kg) AS min_wastage FROM Wastage w JOIN Meal m ON w.meal_id = m.meal_id GROUP BY m.meal_type;

CREATE VIEW avg_cost_per_meal AS SELECT m.meal_type, AVG(c.total_cost) AS avg_cost FROM Meal m JOIN Meal_Cost mc ON m.meal_id = mc.meal_id JOIN Cost c ON mc.cost_id = c.cost_id GROUP BY m.meal_type;

CREATE VIEW wastage_stats AS
SELECT    m.date,    SUM(w.waste_kg) AS total_wastage,    AVG(w.waste_kg) AS avg_wastage
FROM Wastage w JOIN Meal m ON w.meal_id = m.meal_id GROUP BY m.date;

CREATE VIEW ingredient_cost_stats AS
SELECT     AVG(cost_per_unit) AS avg_cost,    MAX(cost_per_unit) AS max_cost,    MIN(cost_per_unit) AS min_cost FROM Ingredient;