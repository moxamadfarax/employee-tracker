const mySql = require("mysql2");
const cTable = require("console.table");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "0272090304184_Sequel",
  database: "employees",
});

const viewDep = () => {
  console.log("choice 4");
  connection.query(`SELECT * FROM department`, function (err, results) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
  });
};

viewDep();
// console.table([
//   { a: 1, b: "Y" },
//   { a: "Z", b: 2 },
// ]);
