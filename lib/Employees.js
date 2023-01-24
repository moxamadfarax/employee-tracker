// Necessary requirements and dependencies.
const mySql = require("mysql2");
const inquirer = require("inquirer");
const initialQuestions = require("../server").initialQuestions;
const cTable = require("console.table");

// Establishing sql connecton.
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "0272090304184_Sequel",
  database: "workplace_db",
});

// Function to view employees.
const viewEmp = () => {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS Role, roles.salary AS Salary,
      department.name AS Department FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department
      ON roles.department_id = department.id`,
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

const addEmp = () => {};
const updateEmp = () => {};

// Exporting necessary functions.
module.exports = { viewEmp, addEmp, updateEmp };
