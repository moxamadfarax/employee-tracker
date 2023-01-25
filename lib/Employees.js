// Necessary requirements and dependencies.
const mySql = require("mysql2");
const inquirer = require("inquirer");
const initialQuestions = require("../server").initialQuestions;
const cTable = require("console.table");

// Establishing sql connecton.
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "fruit",
  database: "workplace_db",
});

// Function to view employees.
const viewEmp = () => {
  connection.query(
    `SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name',
    managers.first_name AS 'Manager First Name', 
    managers.last_name AS 'Manager Last Name', roles.title AS 'Employee Role' FROM employees
    INNER JOIN managers ON employees.manager_id = managers.id 
    INNER JOIN roles ON employees.role_id = roles.id;`,
    function (err, results) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.table(results);
      initialQuestions();
    }
  );
};

// Function to add employee.
const addEmp = () => {
  connection.query(
    `SELECT roles.id, roles.title, roles.salary, departments.name
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id
    `,
    (err, results) => {
      if (err) {
        console.log(err.message);
        return;
      }

      console.table(results);
      inquirer
        .prompt([
          {
            type: "text",
            name: "first_name",
            message: "Enter employees first name:",
          },
          {
            type: "number",
            name: "last_name",
            message: "Enter employees last name:",
          },
          {
            type: "list",
            name: "role",
            message: "Enter this employees role:",
            choices: "poo",
          },
          {
            type: "list",
            name: "manager",
            message: "Enter this employees manager:",
            choices: "depArray",
          },
        ])
        .then((data) => {
          connection.query(``);
        });
    }
  );
};

// Function to update employee.
const updateEmp = () => {};

// Exporting necessary functions.
module.exports = { viewEmp, addEmp, updateEmp };
