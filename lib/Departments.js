// Necessary requirements and dependencies.
const mySql = require("mysql2");
const inquirer = require("inquirer");
const initialQuestions = require("../server").initialQuestions;
const cTable = require("console.table");

// Establishing sql connection.
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "fruit",
  database: "workplace_db",
});

// Function to view departments.
const viewDep = () => {
  connection.query(
    `SELECT id, name as Name FROM departments`,
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

// Function to add departments.
const addDep = () => {
  inquirer
    .prompt({
      type: "text",
      name: "new_dep",
      message: "What is the name of this department?",
    })
    .then((data) => {
      connection.query(
        `INSERT INTO departments (name) VALUES(?)`,
        [data.new_dep],
        function (err) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log("Department Added!");
          initialQuestions();
        }
      );
    });
};

module.exports = { viewDep, addDep };
