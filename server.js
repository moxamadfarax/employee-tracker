const inquirer = require("inquirer");
const { viewDep, addDep } = require("./lib/Departments");
const { viewRoles } = require("./lib/Roles");
const { viewEmp } = require("./lib/Employees");

// Prompting the user with the initial questions.
const initialQuestions = () => {
  inquirer
    .prompt({
      type: "list",
      name: "initial choices",
      message: "What would you like to do? (Select on of the following)",
      choices: [
        "View All Employees",
        "Add New Employee",
        "Update Employee Role",
        "View All Roles",
        "Add New Role",
        "View All Departments",
        "Add New Department",
        "All finished!",
      ],
    })
    // Using swtich case (which I have never used before btw) to determine what function to run depending on the choice selected.
    .then((data) => {
      switch (data["initial choices"]) {
        case "View All Employees":
          viewEmp().then(() => {
            initialQuestions();
          });
          break;
        case "Add New Employee":
          break;
        case "Update Employee Role":
          break;
        case "View All Roles":
          viewRoles().then(() => {
            initialQuestions();
          });
          break;
        case "Add Role":
          break;
        case "View All Departments":
          viewDep().then(() => {
            initialQuestions();
          });
          break;
        case "Add Department":
          break;
        case "All finished!":
          break;
      }
    });
};

module.exports = initialQuestions;

// Calling the function.
initialQuestions();
