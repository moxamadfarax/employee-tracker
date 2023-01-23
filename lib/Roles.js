const mySql = require("mysql2");
const inquirer = require("inquirer");
const initialQuestions = require("../server").initialQuestions;

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
  connection.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err);
      return;
    }

    let depArr = [];
    results.forEach((item) => {
      depArr.push(item.name);
    });

    inquirer
      .prompt([
        {
          type: "text",
          name: "role_title",
          message: "Please enter the name of this new role",
        },
        {
          type: "number",
          name: "salary",
          message:
            "Please enter the salary of this new role. Note: Please do not use commas or periods",
        },
        {
          type: "list",
          name: "department",
          message: "Please select the department you role will be a part of: ",
          choices: depArr,
        },
      ])
      .then((data) => {
        let department_id;

        for (let i = 0; i < depArr.length; i++) {
          if (depArr[i] === data.department) {
            department_id = i + 1;
          }
        }

        connection.query(
          `INSERT INTO roles (title, salary, department_id)
                          VALUES(?,?,?)`,
          [data.role_title, data.salary, department_id],
          function (err, results, fields) {
            if (err) {
              console.log(err.message);
              return;
            }

            console.log("Role added!");
            promptUser();
          }
        );
      });
  });
};

module.exports = { viewRoles, addRole };
