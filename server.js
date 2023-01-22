const inquirer = require("inquirer");
const { viewDep, addDep } = require("./lib/Department");
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
          break;
        case "Add New Employee":
          break;
        case "Update Employee Role":
          break;
        case "View All Roles":
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

// Calling the function.
module.exports = initialQuestions;
initialQuestions();
