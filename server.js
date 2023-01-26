// Requiring requirer.
const inquirer = require("inquirer");

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
          viewEmp();
          break;
        case "Add New Employee":
          addEmp();
          break;
        case "Update Employee Role":
          updateEmp();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add New Role":
          addRole();
          break;
        case "View All Departments":
          viewDep();
          break;
        case "Add New Department":
          addDep();
          break;
        case "All finished!":
          process.exit();
      }
    });
};

// Requirements that need to be required afterwards the main questions.
module.exports = { initialQuestions };
const { viewDep, addDep } = require("./lib/Departments");
const { viewRoles, addRole } = require("./lib/Roles");
const { viewEmp, addEmp, updateEmp } = require("./lib/Employees");

// Calling the function.
initialQuestions();
