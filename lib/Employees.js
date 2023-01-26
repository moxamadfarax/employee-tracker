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
    `SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', managers.first_name AS 'Manager First Name', 
    managers.last_name AS 'Manager Last Name', roles.title AS 'Employee Role' FROM employees
    INNER JOIN managers ON employees.manager_id = managers.id 
    INNER JOIN roles ON employees.role_id = roles.id;`,
    (err, results) => {
      if (err) {
        console.log(err.message);
        return;
      }
      if (results.length === 0) {
        console.log(
          "There are currently no employees in the database. Please add employees to the databse in order to view them."
        );
        process.exit();
      }
      console.table(results);
      initialQuestions();
    }
  );
};

// Function to add employee.
const addEmp = () => {
  let rolesArray = [];
  let managersArray = [];
  connection.query(`SELECT * FROM roles;`, (err, results) => {
    for (let i = 0; i < results.length; i++) {
      rolesArray.push(results[i].title);
    }
    console.log(rolesArray);
  });
  connection.query(`SELECT * FROM managers;`, (err, results) => {
    let managersArray = [];
    results.forEach((result) => {
      managersArray.push({
        firstName: result.first_name,
        lastName: result.last_name,
      });
    });
    console.log(managersArray);
  });
};

// Function to update employee.
const updateEmp = () => {};

// Exporting necessary functions.
module.exports = { viewEmp, addEmp, updateEmp };
