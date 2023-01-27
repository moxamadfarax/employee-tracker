USE workplace_db;
    
INSERT INTO departments (name)
VALUES 
    ('Legal'),
    ('Sales'),
    ('Engineering');

INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Legal Team Lead', 250000, 1),
    ('Lawyer', 170000, 1),
    ('Sales Lead', 100000, 2),
    ('Salesperson', 70000, 2),
    ('Lead Engineer', 150000, 3),
    ('Engineer', 120000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id, is_manager)
VALUES 
    ("Mohamed", "Farah", 3, NULL, true),
    ('Khabib', 'Nurmagomedov', 2, 2, false),
    ('Harvey', 'Specter', 2, 1, false);

INSERT INTO managers (first_name, last_name)
SELECT first_name, last_name
FROM employees
WHERE is_manager = true;

SELECT * FROM managers;
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;
