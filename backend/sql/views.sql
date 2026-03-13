CREATE VIEW hostel_student_count AS
SELECT
    h.hostel_name,
    COUNT(s.student_id) AS total_students
FROM Hostel h
LEFT JOIN Student s ON h.hostel_id = s.hostel_id
GROUP BY h.hostel_name;


CREATE VIEW meal_attendance_summary AS
SELECT
    m.meal_id,
    m.meal_type,
    m.date,
    COUNT(sm.student_id) AS students_registered
FROM Meal m
LEFT JOIN Student_Meal sm ON m.meal_id = sm.meal_id
GROUP BY m.meal_id, m.meal_type, m.date;

CREATE VIEW daily_wastage_report AS
SELECT
    m.date,
    SUM(w.waste_kg) AS total_wastage
FROM Wastage w
JOIN Meal m ON w.meal_id = m.meal_id
GROUP BY m.date;


CREATE VIEW ingredient_usage AS
SELECT
    mn.menu_date,
    i.ingredient_name
FROM Menu mn
JOIN Menu_Ingredient mi ON mn.menu_id = mi.menu_id
JOIN Ingredient i ON mi.ingredient_id = i.ingredient_id;

CREATE VIEW meal_cost_summary AS
SELECT
    m.meal_id,
    m.meal_type,
    m.date,
    c.total_cost
FROM Meal m
JOIN Meal_Cost mc ON m.meal_id = mc.meal_id
JOIN Cost c ON mc.cost_id = c.cost_id;


CREATE VIEW mess_meal_count AS
SELECT
    me.mess_name,
    COUNT(m.meal_id) AS total_meals
FROM Mess me
LEFT JOIN Meal m ON me.mess_id = m.mess_id
GROUP BY me.mess_name;