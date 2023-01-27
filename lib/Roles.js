// Necessary requirements and dependencies.
const mySql = require("mysql2");
const inquirer = require("inquirer");
const initialQuestions = require("../server").initialQuestions;
const cTable = require("console.table");

let depArray = [];
// Establishing sql connection.
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "fruit",
  database: "workplace_db",
});

// Function to view roles.
const viewRoles = () => {
  connection.query(
    `SELECT roles.id, roles.title as Title, roles.salary as Salary, departments.name as Department FROM roles
      LEFT JOIN departments
      ON roles.department_id = departments.id`,
    function (err, results) {
      if (err) {
        console.log(err.message);
        return;
      }
      if (results.length === 0) {
        console.log(
          "No roles currently in database. Create a role, and add it to the database in order to view it."
        );
        process.exit();
      } else {
        console.table(results);
        initialQuestions();
      }
    }
  );
};

// Function to add roles.
const addRole = () => {
  connection.query(`SELECT * FROM departments`, (err, results) => {
    if (err) {
      console.log(err.message);
      return;
    }
    // Pushing data to depArray
    results.forEach((item) => {
      depArray.push(item.name);
    });
    if (depArray.length === 0) {
      console.log(
        "In order to create a new role, their must be a department to add the role to. Please create a department before creating a role."
      );
      process.exit();
    }
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
            console.log("Role successfuly added!");
            initialQuestions();
          }
        );
      });
  });
};
module.exports = { viewRoles, addRole };
