const mySql = require("mysql2");
const inquirer = require("inquirer");
const initialQuestions = require("../server").initialQuestions;
const cTable = require("console.table");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "0272090304184_Sequel",
  database: "workplace_db",
});

const viewRoles = () => {
  connection.query(
    `SELECT roles.id, roles.title as Title, roles.salary as Salary, department.name as Department
      FROM roles
      LEFT JOIN department
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

const addRole = () => {
  let depArray = [];
  connection.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    results.forEach((item) => {
      depArray.push(item.name);
    });
    console.log(depArray);
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
        connection.query(
          `INSERT INTO roles (title, salary, department_id)
          VALUES(?,?,?)`,
          function (err, results) {
            if (err) {
              console.log(err.message);
              return;
            }

            console.table("Role added!");
            initialQuestions();
          }
        );
      });
  });
};

module.exports = { viewRoles, addRole };
