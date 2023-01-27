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
    LEFT JOIN managers ON employees.manager_id = managers.id 
    LEFT JOIN roles ON employees.role_id = roles.id;`,
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
  let rolesArray = ["None"];
  let managersArray = ["None"];

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
    // Then getting the information and converting it back into numerals for sql use.
    .then((data) => {
      let role_id;
      let manager_id;
      let isManager;

      if (data.role === "None") {
        role_id = undefined;
      } else {
        for (let i = 0; i < rolesArray.length; i++) {
          if (rolesArray[i] === data.role) {
            role_id = i;
          }
        }
      }

      if (data.manager === "None") {
        manager_id = undefined;
      } else {
        for (let i = 0; i < managersArray.length; i++) {
          if (managersArray[i] === data.manager) {
            manager_id = i;
          }
        }
      }

      if (data.manager_confirm === "Yes") {
        isManager = true;
      } else {
        isManager = false;
      }
      // Establishing connection and inputting new data.
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

// Function to update employee, making this function async because I was having trouble getting data from the arrays when I needed them.
const updateEmp = async () => {
  let empArray = [];
  let rolesArray = [];
  await Promise.all([
    new Promise((resolve, reject) => {
      // Establishing connection to get employee name data and push it into empArray.
      connection.query(
        `SELECT employees.first_name, employees.last_name FROM employees`,
        (err, results) => {
          if (err) {
            console.log(err.message);
            reject(err);
          }
          if (results.length === 0) {
            console.log(
              "There are no employees in the database currently. Create an employee in order to update their role."
            );
            process.exit();
          } else {
            results.forEach((result) => {
              empArray.push(`${result.first_name} ${result.last_name}`);
            });
            resolve();
          }
        }
      );
    }),
    new Promise((resolve, reject) => {
      // Establishing connection to get roles data and push it into rolesArray.
      connection.query(`SELECT * FROM roles;`, (err, results) => {
        if (err) {
          console.log(err.message);
          reject(err);
        }
        for (let i = 0; i < results.length; i++) {
          rolesArray.push(results[i].title);
        }
        resolve();
      });
    }),
  ]);
  // Questions for updating employee.
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee",
        message: "Which employees role would you like to update?",
        choices: empArray,
      },
      {
        type: "list",
        name: "role",
        message: "Which role would you like to give this employee?",
        choices: rolesArray,
      },
    ])
    // Converting data back into what I can use for sql.
    .then((data) => {
      let sep = [data.employee];
      let fullName = sep[0].split(" ");
      let first_name = fullName[0];
      let last_name = fullName[1];

      let role_id;

      for (let i = 0; i < rolesArray.length; i++) {
        if (rolesArray[i] === data.role) {
          role_id = i + 1;
        }
      }
      // Updating the employees roles here.
      connection.query(
        `UPDATE employees SET role_id = ? WHERE first_name = ? AND last_name = ? `,
        [role_id, first_name, last_name],
        (err) => {
          if (err) {
            console.log(err.message);
          }
          console.log("Employee role successfuly updated!");
          initialQuestions();
        }
      );
    });
};

// Exporting necessary functions.
module.exports = { viewEmp, addEmp, updateEmp };
