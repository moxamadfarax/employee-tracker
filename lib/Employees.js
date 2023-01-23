const mySql = require("mysql2");
const inquirer = require("inquirer");
const initialQuestions = require("../server").initialQuestions;

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "0272090304184_Sequel",
  database: "workplace_db",
});

const viewEmp = () => {
  connection.query(
    `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, roles.salary AS salary,
      department.name AS department 
      FROM employee
      LEFT JOIN roles
      ON employee.role_id = roles.id
      LEFT JOIN department
      ON roles.department_id = department.id`,
    function (err, results, fields) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.table(results);
      initialQuestions();
    }
  );
};

module.exports = { viewEmp };
