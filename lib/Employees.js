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

const addEmp = () => {
  inquirer
    .prompt([
      {
        type: "text",
        name: "title",
        message: "What is the name of this role?",
      },
      {
        type: "number",
        name: "salary",
        message:
          "What wil be this roles salary? (Please only enter numbers and no commas)",
      },
      {
        type: "list",
        name: "dep",
        message: "What would be this roles department?",
        choices: depArray,
      },
    ])
    .then((data) => {
      let department_id;

      // Setting up a for loop that basically turns what department was picked back to it's id.
      for (let i = 0; i < depArray.length; i++) {
        if (depArray[i] === data.dep) {
          department_id = i + 1;
        }
      }
      connection.query(
        `INSERT INTO roles (title, salary, department_id) VALUES(?,?,?)`,
        [data.title, data.salary, department_id],
        function (err) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log("Role added!");
          initialQuestions();
        }
      );
    });
};
const updateEmp = () => {};

// Exporting necessary functions.
module.exports = { viewEmp, addEmp, updateEmp };
