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
    connection.query(`SELECT * FROM roles`, function (err, results) {
      if (err) {
        reject(err.message);
      } else {
        console.table(results);
        resolve(results);
      }
    });
  });
};

module.exports = { viewRoles };
