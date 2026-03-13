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