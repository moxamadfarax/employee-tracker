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
    `SELECT employee.id, employee.first_name AS 'First Name', employee.last_name AS 'Last Name',
    manager.first_name AS 'Manager First Name', 
    manager.last_name AS 'Manager Last Name', roles.title as 'Title'
    FROM employee
    INNER JOIN manager ON employee.manager_id = manager.id 
    INNER JOIN roles ON employee.role_id = roles.id;`,
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
        choices: depArray,
      },
      {
        type: "list",
        name: "manager",
        message: "Enter this employees manager:",
        choices: depArray,
      },
    ])
    .then((data) => {
      connection.query(``);
    });
};

// Function to update employee.
const updateEmp = () => {};

// Exporting necessary functions.
module.exports = { viewEmp, addEmp, updateEmp };
