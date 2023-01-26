// Necessary requirements and dependencies.
const mySql = require("mysql2");
const inquirer = require("inquirer");
const initialQuestions = require("../server").initialQuestions;
const cTable = require("console.table");

// Establishing sql connecton.
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "fruit",
  database: "workplace_db",
});

// Function to view employees.
const viewEmp = () => {
  connection.query(
    `SELECT employees.id, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', managers.first_name AS 'Manager First Name', 
    managers.last_name AS 'Manager Last Name', roles.title AS 'Employee Role' FROM employees
    INNER JOIN managers ON employees.manager_id = managers.id 
    INNER JOIN roles ON employees.role_id = roles.id;`,
    (err, results) => {
      if (err) {
        console.log(err.message);
        return;
      }
      if (results.length === 0) {
        console.log(
          "There are currently no employees in the database. Please add employees to the databse in order to view them."
        );
        process.exit();
      }
      console.table(results);
      initialQuestions();
    }
  );
};

// Function to add employee.
const addEmp = () => {
  let rolesArray = [];
  let managersArray = [];

  // Getting data from roles tables and storing it in roles array.
  connection.query(`SELECT * FROM roles;`, (err, results) => {
    for (let i = 0; i < results.length; i++) {
      rolesArray.push(results[i].title);
    }
  });

  // Getting data from managers table and storing it in managers array with key value pairs.
  connection.query(`SELECT * FROM managers;`, (err, results) => {
    results.forEach((result) => {
      managersArray.push(`${result.first_name} ${result.last_name}`);
    });
  });

  // Questions for adding new employee.
  inquirer
    .prompt([
      {
        type: "text",
        name: "first_name",
        message: "Enter employees first name:",
      },
      {
        type: "text",
        name: "last_name",
        message: "Enter employees last name:",
      },
      {
        type: "list",
        name: "manager_confirm",
        message: "Is this employee a manager?",
        choices: ["Yes", "No"],
      },
      {
        type: "list",
        name: "role",
        message: "Which role does this employee belong to?",
        choices: rolesArray,
      },
      {
        type: "list",
        name: "manager",
        message: "Who is this employees manager?",
        choices: managersArray,
      },
    ])
    .then((data) => {
      let role_id;
      let manager_id;
      let isManager;

      for (let i = 0; i < rolesArray.length; i++) {
        if (rolesArray[i] === data.role) {
          role_id = i + 1;
        }
      }
      for (let i = 0; i < managersArray.length; i++) {
        if (managersArray[i] === data.manager) {
          manager_id = i + 1;
        }
      }
      if (data.manager_confirm === "Yes") {
        isManager = true;
      } else {
        isManager = false;
      }
      connection.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id, is_manager) VALUES(?,?,?,?,?)`,
        [data.first_name, data.last_name, role_id, manager_id, isManager],
        (err) => {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log("Employee successfuly added!");
          initialQuestions();
        }
      );
    });
};

// Function to update employee.
const updateEmp = () => {
  let empArray = [];
  let rolesArray = [];
  connection.query(
    `SELECT employees.first_name, employees.last_name FROM employees`,
    (err, results) => {
      if (err) {
        console.log(err.message);
      }
      results.forEach((result) => {
        empArray.push(`${result.first_name} ${result.last_name}`);
      });
    }
  );
  connection.query(`SELECT * FROM roles;`, (err, results) => {
    for (let i = 0; i < results.length; i++) {
      rolesArray.push(results[i].title);
    }
  });
  inquirer.prompt([
    {
      type: "list",
      name: "role",
      message: "Which employees role would you like to update?",
      choices: empArray,
    },
    {
      type: "list",
      name: "manager",
      message: "Which role would you like to give this employee?",
      choices: rolesArray,
    },
  ]);
};

// Exporting necessary functions.
module.exports = { viewEmp, addEmp, updateEmp };
