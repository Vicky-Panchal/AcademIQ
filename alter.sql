ALTER TABLE employee
ADD FOREIGN KEY (user_id) REFERENCES user(id),
ADD FOREIGN KEY (department_id) REFERENCES department(id);

ALTER TABLE employee_salary
ADD FOREIGN KEY (employee_id) REFERENCES employee(id);

ALTER TABLE token
ADD FOREIGN KEY (user_id) REFERENCES user(id);
