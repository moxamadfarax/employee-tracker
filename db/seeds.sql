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
    ("Mohamed", "Farah", 3, 3 ),
    ('Khabib', 'Nurmagomedov', 2, 2 ),
    ('Harvey', 'Specter', 2, 1 ),
    ('Bo', 'Jackson', 3, 4 ),
    ('Lionel', 'Messi', 4, 2 ),
    ('Achraf', 'Hakimi', 4, 2 ),
    ('Marty', 'McFly', 4, 4 ),
    ('Pete', 'Castiglione', 5 ,3 ),
    ('Augustus', 'Gloop', 6, 3 ),
    ('Hans', 'Landa', 6, 4 );

INSERT INTO manager (first_name, last_name)
VALUES 
    ('Mike', "Ross"),
    ('Jose', "Romero"),
    ('Elijah', "Roufs"),
    ('Kylian', "Mbappe");

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM manager;