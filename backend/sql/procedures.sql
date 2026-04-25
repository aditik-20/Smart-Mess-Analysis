DELIMITER $$
CREATE PROCEDURE add_student(
IN p_first_name VARCHAR(30),
IN p_middle_name VARCHAR(30),
IN p_last_name VARCHAR(30),
IN p_dob DATE,
IN p_age INT,
IN p_phone VARCHAR(15),
IN p_email VARCHAR(50),
IN p_hostel_id INT
)
BEGIN
INSERT INTO Student(first_name,middle_name,last_name,dob,age,phone,email,hostel_id)
VALUES(p_first_name,p_middle_name,p_last_name,p_dob,p_age,p_phone,p_email,p_hostel_id);
END $$

CREATE PROCEDURE register_student_meal(
IN p_student_id INT,
IN p_meal_id INT
)
BEGIN
INSERT INTO Student_Meal(student_id,meal_id)
VALUES(p_student_id,p_meal_id);
END $$

CREATE PROCEDURE record_attendance(
IN p_student_id INT,
IN p_date DATE,
IN p_status VARCHAR(10)
)
BEGIN
INSERT INTO Attendance(student_id,date,status)
VALUES(p_student_id,p_date,p_status);
END $$

CREATE PROCEDURE log_meal_consumption(
IN p_meal_id INT,
IN p_quantity INT,
IN p_record_date DATE
)
BEGIN
INSERT INTO Meal_Log(meal_id,quantity_consumed,record_date)
VALUES(p_meal_id,p_quantity,p_record_date);
END $$

CREATE PROCEDURE add_wastage(
IN p_meal_id INT,
IN p_waste DECIMAL(6,2),
IN p_reason VARCHAR(100),
IN p_date DATE
)
BEGIN
INSERT INTO Wastage(meal_id,waste_kg,reason,date)
VALUES(p_meal_id,p_waste,p_reason,p_date);
END $$

CREATE PROCEDURE add_cost(
IN p_date DATE,
IN p_total_cost DECIMAL(10,2)
)
BEGIN
INSERT INTO Cost(date,total_cost)
VALUES(p_date,p_total_cost);
END $$

CREATE PROCEDURE add_food_cost(
IN p_cost_id INT,
IN p_food_amount DECIMAL(10,2)
)
BEGIN
INSERT INTO Food_Cost(cost_id,food_amount)
VALUES(p_cost_id,p_food_amount);
END $$

CREATE PROCEDURE add_utility_cost(
IN p_cost_id INT,
IN p_electricity DECIMAL(10,2),
IN p_water DECIMAL(10,2)
)
BEGIN
INSERT INTO Utility_Cost(cost_id,electricity_cost,water_cost)
VALUES(p_cost_id,p_electricity,p_water);
END $$

CREATE PROCEDURE add_meal_cost(
IN p_meal_id INT,
IN p_cost_id INT
)
BEGIN
INSERT INTO Meal_Cost(meal_id,cost_id)
VALUES(p_meal_id,p_cost_id);
END $$

CREATE PROCEDURE get_meal_cost(
IN p_meal_id INT
)
BEGIN
SELECT m.meal_id,m.meal_type,m.date,c.total_cost
FROM Meal m
JOIN Meal_Cost mc ON m.meal_id=mc.meal_id
JOIN Cost c ON mc.cost_id=c.cost_id
WHERE m.meal_id=p_meal_id;
END $$

CREATE FUNCTION get_total_wastage(m_id INT)
RETURNS DECIMAL(10,2)
DETERMINISTIC
BEGIN
DECLARE total DECIMAL(10,2);
SELECT SUM(waste_kg) INTO total
FROM Wastage
WHERE meal_id=m_id;
RETURN IFNULL(total,0);
END $$

CREATE TRIGGER calculate_age
BEFORE INSERT ON Student
FOR EACH ROW
BEGIN
SET NEW.age=TIMESTAMPDIFF(YEAR,NEW.dob,CURDATE());
END $$

CREATE TRIGGER check_student_age
BEFORE INSERT ON Student
FOR EACH ROW
BEGIN
IF NEW.age<16 THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT='Age must be >= 16';
END IF;
END $$

CREATE TRIGGER prevent_duplicate_meal
BEFORE INSERT ON Student_Meal
FOR EACH ROW
BEGIN
IF EXISTS(
SELECT 1
FROM Student_Meal
WHERE student_id=NEW.student_id AND meal_id=NEW.meal_id
) THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT='Student already registered for this meal';
END IF;
END $$

CREATE TRIGGER check_meal_exists
BEFORE INSERT ON Wastage
FOR EACH ROW
BEGIN
IF NOT EXISTS(
SELECT 1
FROM Meal
WHERE meal_id=NEW.meal_id
) THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT='Meal does not exist';
END IF;
END $$

CREATE PROCEDURE total_consumption()
BEGIN
DECLARE done INT DEFAULT 0;
DECLARE qty INT;
DECLARE total INT DEFAULT 0;

DECLARE cur CURSOR FOR
SELECT quantity_consumed FROM Meal_Log;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;

OPEN cur;

read_loop: LOOP
FETCH cur INTO qty;
IF done THEN
LEAVE read_loop;
END IF;
SET total=total+qty;
END LOOP;

CLOSE cur;

SELECT total AS total_meal_consumption;
END $$

CREATE PROCEDURE total_wastage_all_meals()
BEGIN
DECLARE done INT DEFAULT 0;
DECLARE w DECIMAL(6,2);
DECLARE total DECIMAL(10,2) DEFAULT 0;

DECLARE cur CURSOR FOR
SELECT waste_kg FROM Wastage;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;

OPEN cur;

read_loop: LOOP
FETCH cur INTO w;
IF done THEN
LEAVE read_loop;
END IF;
SET total=total+w;
END LOOP;

CLOSE cur;

SELECT total AS total_wastage;
END $$

CREATE PROCEDURE hostel_student_summary()
BEGIN
DECLARE done INT DEFAULT 0;
DECLARE hname VARCHAR(50);
DECLARE total_students INT;

DECLARE cur CURSOR FOR
SELECT h.hostel_name,COUNT(s.student_id)
FROM Hostel h
LEFT JOIN Student s ON h.hostel_id=s.hostel_id
GROUP BY h.hostel_name;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;

OPEN cur;

read_loop: LOOP
FETCH cur INTO hname,total_students;
IF done THEN
LEAVE read_loop;
END IF;
SELECT hname AS hostel,total_students AS total_students;
END LOOP;

CLOSE cur;
END $$

DELIMITER $$

CREATE PROCEDURE student_meal_count()
BEGIN
DECLARE done INT DEFAULT 0;
DECLARE sid INT;
DECLARE total INT;

DECLARE cur CURSOR FOR
SELECT student_id,COUNT(meal_id)
FROM Student_Meal
GROUP BY student_id;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;

OPEN cur;

read_loop: LOOP
FETCH cur INTO sid,total;
IF done THEN
LEAVE read_loop;
END IF;

SELECT sid AS student_id,total AS meals_taken;

END LOOP;

CLOSE cur;

END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE meal_wastage_summary()
BEGIN
DECLARE done INT DEFAULT 0;
DECLARE mid INT;
DECLARE waste DECIMAL(6,2);

DECLARE cur CURSOR FOR
SELECT meal_id,waste_kg FROM Wastage;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;

OPEN cur;

read_loop: LOOP
FETCH cur INTO mid,waste;
IF done THEN
LEAVE read_loop;
END IF;
SELECT mid AS meal_id,waste AS wastage;
END LOOP;
CLOSE cur;
END $$
DELIMITER ;

CREATE PROCEDURE safe_insert_cost(
IN p_date DATE,
IN p_cost DECIMAL(10,2)
)
BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION
BEGIN
SELECT 'Error inserting cost' AS message;
END;

INSERT INTO Cost(date,total_cost)
VALUES(p_date,p_cost);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE safe_add_student(
IN p_first_name VARCHAR(30),
IN p_last_name VARCHAR(30),
IN p_phone VARCHAR(15),
IN p_email VARCHAR(50),
IN p_hostel_id INT
)
BEGIN

DECLARE EXIT HANDLER FOR 1062
BEGIN
SELECT 'Duplicate phone or email' AS message;
END;

INSERT INTO Student(first_name,last_name,phone,email,hostel_id,dob,age)
VALUES(p_first_name,p_last_name,p_phone,p_email,p_hostel_id,CURDATE(),18);

END $$

DELIMITER ;
DELIMITER $$

CREATE PROCEDURE safe_register_meal(
IN p_student_id INT,
IN p_meal_id INT
)
BEGIN

DECLARE EXIT HANDLER FOR 1452
BEGIN
SELECT 'Invalid student or meal ID' AS message;
END;

INSERT INTO Student_Meal(student_id,meal_id)
VALUES(p_student_id,p_meal_id);

END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE safe_add_wastage(
IN p_meal_id INT,
IN p_waste DECIMAL(6,2)
)
BEGIN

IF p_waste < 0 THEN
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT='Wastage cannot be negative';
ELSE
INSERT INTO Wastage(meal_id,waste_kg,date)
VALUES(p_meal_id,p_waste,CURDATE());
END IF;

END $$

DELIMITER ;