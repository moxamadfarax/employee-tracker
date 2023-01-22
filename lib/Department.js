const mySql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "0272090304184_Sequel",
  database: "employees",
});

const viewDep = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM department`, function (err, results) {
      if (err) {
        reject(err.message);
      } else {
        console.table(results);
        resolve(results);
      }
    });
  });
};
const addDep = () => {
  inquirer
    .prompt({
      type: "text",
      name: "new_dep",
      message: "What is the name of this new department?",
    })
    .then((data) => {
      connection.query(
        `INSERT INTO department (name)
              VALUES(?)`,
        [data.new_dep],
        function (err) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log("Added department!");
        }
      );
    });
};

module.exports = { viewDep, addDep };
