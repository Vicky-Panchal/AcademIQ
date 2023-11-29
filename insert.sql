-- Insert departments
INSERT INTO department (name, capacity) VALUES ('CSE', 50);
INSERT INTO department (name, capacity) VALUES ('ESE', 30);

-- Insert users
INSERT INTO user (firstname, lastname, email, password, role) VALUES ('Vicky', 'Panchal', 'vicky@gmail.com', '1234', 'EMPLOYEE');
INSERT INTO user (firstname, lastname, email, password, role) VALUES ('Darshak', 'Devani', 'darsha@gmail.com', '1234', 'EMPLOYEE');

-- Insert employees
INSERT INTO employee (title, photograph_path, user_id, department_id) VALUES ('Professor', '/path/to/photo1.jpg', 1, 1);
INSERT INTO employee (title, photograph_path, user_id, department_id) VALUES ('Assistant Professor', '/path/to/photo2.jpg', 2, 2);

-- Insert employee salaries
INSERT INTO employee_salary (payment_date, amount, description, salary_slip, employee_id) VALUES ('2023-11-01', 15000, 'Monthly salary', '/home/vicky/AcademIQ/Backend/src/main/resources/pdfs/salary_slip.pdf', 1);
INSERT INTO employee_salary (payment_date, amount, description, salary_slip, employee_id) VALUES ('2023-10-01', 10000, 'Monthly salary', '/home/vicky/AcademIQ/Backend/src/main/resources/pdfs/salary_slip.pdf', 1);
INSERT INTO employee_salary (payment_date, amount, description, salary_slip, employee_id) VALUES ('2023-09-01', 5000, 'Monthly salary', '/home/vicky/AcademIQ/Backend/src/main/resources/pdfs/salary_slip.pdf', 1);
INSERT INTO employee_salary (payment_date, amount, description, salary_slip, employee_id) VALUES (CURRENT_DATE, 6000, 'Monthly salary', '/home/vicky/AcademIQ/Backend/src/main/resources/pdfs/salary_slip.pdf', 2);

-- Insert tokens
INSERT INTO token (token, tokenType, revoked, expired, user_id) VALUES ('token_value_1', 'BEARER', false, false, 1);
INSERT INTO token (token, tokenType, revoked, expired, user_id) VALUES ('token_value_2', 'BEARER', false, false, 2);
