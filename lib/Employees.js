const mySql = require("mysql2");
const inquirer = require("inquirer");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "0272090304184_Sequel",
  database: "workplace_db",
});

const viewEmp = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT employee.id, employee.first_name, employee.last_name, roles.title AS role, roles.salary AS salary, manager.first_name AS manager,
    department.name AS department 
    FROM employee
    LEFT JOIN roles
    ON employee.role_id = roles.id
    LEFT JOIN department
    ON roles.department_id = department.id
    LEFT JOIN manager
    ON employee.manager_id = manager.id`,
      function (err, results) {
        if (err) {
          reject(err.message);
        } else {
          console.table(results);
          resolve(results);
        }
      }
    );
  });
};

module.exports = { viewEmp };
