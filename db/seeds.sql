USE workplace_db;
INSERT INTO department (name)
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

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("Mohamed", "Farah", 3, 1 ),
    ('Khabib', 'Nurmagomedov', 2, 1 ),
    ('Harvey', 'Specter', 2, 1 ),
    ('Bo', 'Jackson', 3, NULL ),
    ('Lionel', 'Messi', 4, 2 ),
    ('Achraf', 'Hakimi', 4, 2 ),
    ('Marty', 'McFly', 4, 2 ),
    ('Pete', 'Castiglione', 5 ,3 ),
    ('Augustus', 'Gloop', 6, 3 ),
    ('Hans', 'Landa', 6, 3 );

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM roles;