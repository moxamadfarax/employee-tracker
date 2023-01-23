const mySql = require("mysql2");
const inquirer = require("inquirer");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "0272090304184_Sequel",
  database: "workplace_db",
});

const viewRoles = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT roles.id, roles.title as Title, roles.salary as Salary, department.name as Department
    FROM roles
    LEFT JOIN department
    ON roles.department_id = department.id`,
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

module.exports = { viewRoles };
