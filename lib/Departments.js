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

const viewDep = () => {
  connection.query(`SELECT * FROM department`, function (err, results, fields) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    initialQuestions();
  });
};
const addDep = () => {
  inquirer
    .prompt({
      type: "text",
      name: "new_dep",
      message: "What is the name of this department?",
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
          console.log("Department Added!");
          initialQuestions();
        }
      );
    });
};

module.exports = { viewDep, addDep };
